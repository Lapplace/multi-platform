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
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useForm, Controller } from "react-hook-form";
// import { saveUserID } from "../server/userName";
import { loginURL } from "../api/moviedbs";
import { saveUserID, saveUserName, saveVipLevel } from "../server/userName";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    fetch(`${loginURL}`, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === 'success') {
          saveUserID(result.user_id);
          saveVipLevel(result.vip_level);
          saveUserName(result.username);
          Alert.alert("Successful login");

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeTabs' }],
            })
          );
        } else if (result.status === 'failure') {
          Alert.alert('Wrong username or password');
        } else {
          Alert.alert('ITERNET network error');
        }
      })
      .catch(error => console.error('Error:', error));
  }

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <SafeAreaView>
      <ScrollView>

        <View className="relative">
          <Image className="" source={require("../assets/images/login.jpg")} />
          {/* <TouchableOpacity
          className="bg-orange-600 w-10 flex p-2 rounded-tr-2xl rounded-bl-2xl ml-4 absolute mt-10 border-2 border-white"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size="20" strokeWidth={2} color="white" />
        </TouchableOpacity> */}
        </View>

        <View className="pt-10 flex justify-around items-center text-base">
          <View className="w-screen flex-2 bg-white -mt-80 px-8 pt-8 rounded-t-3xl">
            <Text>Email</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email@gmail.com"
                  onChangeText={(value) => {
                    handleInputChange("email", value);
                    onChange(value);
                  }}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500">Email is required!</Text>
            )}
            <Text>Password</Text>
            <Controller
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onChange } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="password123"
                  onChangeText={(value) => {
                    handleInputChange("password", value);
                    onChange(value);
                  }}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500">
                Bạn chưa điền mật khẩu! Mật khẩu phải chứa ít nhất 6 ký tự.
              </Text>
            )}
            <Pressable className="flex items-end">
              <Text>Forgot password?</Text>
            </Pressable>
            <Pressable
              title="Đăng nhập"
              className="bg-orange-600 p-2 my-4 rounded-xl"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white text-center font-bold">Log in</Text>
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
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  title="Signup"
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text className="text-orange-600 font-bold">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
