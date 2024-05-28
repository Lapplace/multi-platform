import React, { useState } from "react";
import {
     View,
     Text,
     SafeAreaView,
     Image,
     TextInput,
     Pressable,
     StyleSheet,
     TouchableOpacity,
     ScrollView,
     Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useForm, Controller } from "react-hook-form";
import { registerURL } from "../api/moviedbs";

export default function SignupScreen() {
     const navigation = useNavigation();
     const [userName, setUserName] = useState('');
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const {
          control,
          // handleSubmit,
          formState: { errors },
     } = useForm({
          defaultValues: {
               userName: "",
               email: "",
               password: "",
          },
     });

     const handleSubmit = async () => {
          if (email && password) {
               try {
                    const response = await fetch(`${registerURL}`, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({
                              username: userName,
                              email: email,
                              password: password
                         })
                    });
                    const responseData = await response.json();
                    if (responseData.success) {
                         Alert.alert("Successful registration");
                         navigation.navigate("Login");
                    } else {
                         Alert.alert("Registration failure",responseData.message);
                         console.log(responseData.message);
                    }
               } catch (err) {
                    console.log('got error: ', err.message);
               }
          }
     }
     return (
          <SafeAreaView>
               <View className="relative">
                    <Image className="" source={require("../assets/images/login.jpg")} />
                    <TouchableOpacity
                         className="bg-orange-600 w-10 flex p-2 rounded-tr-2xl rounded-bl-2xl ml-4 absolute mt-10 border-2 border-white"
                         onPress={() => navigation.goBack()}
                    >
                         <ArrowLeftIcon size="20" strokeWidth={2} color="white" />
                    </TouchableOpacity>
               </View>

               <View className="pt-10 flex justify-around items-center text-base">
                    <View className="w-screen flex-2 bg-white -mt-96 px-8 pt-8 pb-2 rounded-t-3xl">
                         <Text>User Name</Text>
                         <Controller
                              control={control}
                              rules={{ required: true }}
                              render={() => (
                                   <TextInput
                                        style={styles.input}
                                        value={userName}
                                        placeholder="abc"
                                        onChangeText={(value) => setUserName(value)}
                                   />
                              )}
                              name="userName"
                         />

                         <Text>Email</Text>
                         <Controller
                              control={control}
                              rules={{ required: true }}
                              render={() => (
                                   <TextInput
                                        style={styles.input}
                                        value={email}
                                        placeholder="Email@gmail.com"
                                        onChangeText={(value) => setEmail(value)}
                                   />
                              )}
                              name="email"
                         />
                         {/* {errors.email && (
            <Text className="text-red-500">Email is required!</Text>
          )} */}
                         <Text>Password</Text>
                         <Controller
                              control={control}
                              rules={{ required: true, minLength: 6 }}
                              render={() => (
                                   <TextInput
                                        style={styles.input}
                                        value={password}
                                        placeholder="password123"
                                        onChangeText={(value) => setPassword(value)}
                                        secureTextEntry
                                   />
                              )}
                              name="password"
                         />
                         {/* {errors.password && (
            <Text className="text-red-500">
              Password is required. Password must have at least 8 character!
            </Text>
          )} */}
                         <Pressable
                              title="Signup"
                              className="bg-orange-600 p-2 my-4 rounded-xl"
                              onPress={handleSubmit}
                         >
                              <Text className="text-white text-center font-bold">Sign up</Text>
                         </Pressable>

                         <View className="items-center">
                              <Text>Or</Text>
                              <View className="flex-row space-x-4 py-3">
                                   <TouchableOpacity>
                                        <Image
                                             source={require("../assets/icons/gg.png")}
                                             className="w-10 h-10"
                                        />
                                   </TouchableOpacity>
                                   <TouchableOpacity>
                                        <Image
                                             source={require("../assets/icons/fb.png")}
                                             className="w-9 h-9"
                                        />
                                   </TouchableOpacity>
                              </View>
                              <View className="flex-row space-x-1">
                                   <Text>Already have an account?</Text>
                                   <Pressable
                                        title="Login"
                                        onPress={() => navigation.navigate("Login")}
                                   >
                                        <Text className="text-orange-600 font-bold">Log in</Text>
                                   </Pressable>
                              </View>
                         </View>
                    </View>
               </View>
          </SafeAreaView>
     );
};

const styles = StyleSheet.create({
     input: {
          height: 40,
          marginTop: 20,
          padding: 10,
          borderWidth: StyleSheet.hairlineWidth,
          marginBottom: 10,
          borderRadius: 12,
     },
});