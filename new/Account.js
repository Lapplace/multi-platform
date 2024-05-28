import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { imageDataURL } from '../constants/data';
import * as ImagePicker from "expo-image-picker";
import { getUserID } from '../server/userName';
import { getDataUserURL, updateUserURL } from '../api/moviedbs';
import Loading from '../components/loading';

export default function Account() {
     const navigation = useNavigation();
     const [selectedImage, setSelectedImage] = useState(imageDataURL[0]);
     const [name, setName] = useState("Melissa Peters");
     const [email, setEmail] = useState("met@gmail.com");
     const [password, setPassword] = useState("randompass");
     const [country, setCountry] = useState("Nigeria");
     const [dateOfBirth, setDateOfBirth] = useState("01/01/1990");
     const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const [loading,setLoading] = useState(false);

     // console.log(userID);
     useEffect(() => {
          getFavoritemovies();
     }, [])

     const getFavoritemovies = async () => {
          try {
               setLoading(true);
               const userID = await getUserID();
               //   console.log(userID)
               if (userID) {
                    const response = await fetch(`${getDataUserURL}`, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         body: JSON.stringify({ id_user: userID })
                    })
                    const data = await response.json();
                    // console.log(data);
                    setName(data.username);
                    setEmail(data.email);
                    setPassword(data.password);
                    setDateOfBirth(data.DateOfBirth);
                    setCountry(data.Country);
                    if (data.avatar) {
                         setSelectedImage(data.avatar);
                    }
                    setLoading(false);
               }
          } catch (error) {
               console.error('Error:', error);
               setLoading(false);

          }
     }
     //    console.log(userData);
     const handleImageSelection = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 4],
               quality: 1
          });
          console.log(result);
          if (!result.canceled) {
               setSelectedImage(result.assets[0].uri);
          }
     };

     const validateDate = (date) => {
          const regex = /^\d{2}\/\d{2}\/\d{4}$/;
          if (!regex.test(date)) {
               setErrorMessage("Please enter the date in DD/MM/YYYY format.");
               return false;
          }

          const [day, month, year] = date.split("/").map(Number);
          if (day < 1 || day > 31) {
               setErrorMessage("Day must be between 1 and 31.");
               return false;
          }
          if (month < 1 || month > 12) {
               setErrorMessage("Month must be between 1 and 12.");
               return false;
          }
          if (year > 2024) {
               setErrorMessage("Year must not exceed 2024.");
               return false;
          }

          return true;
     };
     const updateUser = async () => {
          try {
            const userID = await getUserID();
            if (userID) {
              // Đảm bảo rằng tất cả các biến đều có giá trị
              const userData = {
                id_user: userID,
                username: name || '',
                email: email || '',
                password: password || '',
                DateOfBirth: dateOfBirth || '',
                Country: country || '',
                avatar: selectedImage || ''
              };
        
              const response = await fetch(updateUserURL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log('Update successful:', data);
              } else {
                console.error('Error:', response.statusText);
              }
            } else {
              console.error('Error: User ID not found');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        
        
     const handleSave = () => {
          if (!validateDate(dateOfBirth)) {
               setIsErrorModalVisible(true);
          } else {
               updateUser();
               console.log("Save changes");
          }
     };

     const closeErrorModal = () => {
          setIsErrorModalVisible(false);
     };

     return (
          loading ?(
               <Loading/>
          ):(
               <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: '#121212',
                    paddingHorizontal: 22
               }}>
                    <View style={{
                         marginHorizontal: 12,
                         flexDirection: "row",
                         justifyContent: "center"
                    }}
                    >
                         <TouchableOpacity
                              onPress={() => navigation.goBack()}
                              style={{
                                   position: "absolute",
                                   left: 0
                              }}
                         >
                              <MaterialIcons
                                   name="keyboard-arrow-left"
                                   size={30}
                                   color={'#eab308'}
                              />
                         </TouchableOpacity>
                         <Text style={{ ...FONTS.h3, color: COLORS.white }}>Edit Profile</Text>
                    </View>
                    <ScrollView>
                         <View style={{
                              alignItems: "center",
                              marginVertical: 22
                         }}>
                              <TouchableOpacity
                                   onPress={handleImageSelection}
                              >
                                   <Image
                                        source={{ uri: selectedImage }}
                                        style={{
                                             height: 170,
                                             width: 170,
                                             borderRadius: 85,
                                             borderWidth: 2,
                                             borderColor: COLORS.yellow
                                        }}
                                   />
                                   <View style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 10,
                                        zIndex: 9999
                                   }}>
                                        <MaterialIcons
                                             name='photo-camera'
                                             size={32}
                                             color={COLORS.yellow}
                                        />
                                   </View>
                              </TouchableOpacity>
                         </View>
                         <View>
                              <View style={{
                                   flexDirection: 'column',
                                   marginBottom: 6
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Name</Text>
                                   <View style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                        <TextInput
                                             value={name}
                                             onChangeText={value => setName(value)}
                                             editable={true}
                                             placeholderTextColor={COLORS.secondaryGray}
                                             style={{ color: COLORS.white }}
                                        />
                                   </View>
                              </View>
                              <View style={{
                                   flexDirection: 'column',
                                   marginBottom: 6
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Email</Text>
                                   <View style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                        <TextInput
                                             value={email}
                                             onChangeText={value => setEmail(value)}
                                             editable={true}
                                             placeholderTextColor={COLORS.secondaryGray}
                                             style={{ color: COLORS.white }}
                                        />
                                   </View>
                              </View>
                              <View style={{
                                   flexDirection: 'column',
                                   marginBottom: 6
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Password</Text>
                                   <View style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                        <TextInput
                                             value={password}
                                             onChangeText={value => setPassword(value)}
                                             editable={true}
                                             secureTextEntry
                                             placeholderTextColor={COLORS.secondaryGray}
                                             style={{ color: COLORS.white }}
                                        />
                                   </View>
                              </View>
                              <View style={{
                                   flexDirection: 'column',
                                   marginBottom: 6
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Date of Birth (DD/MM/YYYY)</Text>
                                   <View style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                        <TextInput
                                             value={dateOfBirth}
                                             onChangeText={value => setDateOfBirth(value)}
                                             editable={true}
                                             placeholder="DD/MM/YYYY"
                                             placeholderTextColor={COLORS.secondaryGray}
                                             keyboardType="numeric"
                                             style={{ color: COLORS.white }}
                                        />
                                   </View>
                              </View>
                              <View style={{
                                   flexDirection: 'column',
                                   marginBottom: 6
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Country</Text>
                                   <View style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                        <TextInput
                                             value={country}
                                             onChangeText={value => setCountry(value)}
                                             editable={true}
                                             placeholderTextColor={COLORS.secondaryGray}
                                             style={{ color: COLORS.white }}
                                        />
                                   </View>
                              </View>
                              <TouchableOpacity
                                   onPress={handleSave}
                                   style={{
                                        backgroundColor: COLORS.yellow,
                                        height: 44,
                                        borderRadius: 6,
                                        alignItems: 'center',
                                        justifyContent: "center"
                                   }}>
                                   <Text style={{
                                        ...FONTS.body3,
                                        color: COLORS.white
                                   }}>
                                        Save Change
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </ScrollView>
                    <Modal
                         animationType="slide"
                         transparent={true}
                         visible={isErrorModalVisible}
                         onRequestClose={closeErrorModal}
                    >
                         <View style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)'
                         }}>
                              <View style={{
                                   width: 300,
                                   padding: 20,
                                   backgroundColor: '#333',
                                   borderRadius: 10,
                                   alignItems: 'center'
                              }}>
                                   <Text style={{ ...FONTS.h4, color: COLORS.white }}>Error</Text>
                                   <Text style={{ ...FONTS.body3, color: COLORS.white, marginVertical: 10 }}>{errorMessage}</Text>
                                   <TouchableOpacity onPress={closeErrorModal} style={{
                                        backgroundColor: COLORS.primary,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginTop: 10
                                   }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>OK</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </Modal>
               </SafeAreaView>
          )
          
     );
}
