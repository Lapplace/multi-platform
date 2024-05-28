import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { FONTS, COLORS } from '../theme';
import { useNavigation } from '@react-navigation/native'
import { removeUserIDVIP } from '../server/userName';


export default function Setting() {
     const navigation = useNavigation();

     const navigateToEditProfile = () => {
          navigation.navigate("Account");

     }
     const navigateToSecurity = () => {
          navigation.navigate("Start");
     }
     const navigateToNotifications = () => {
          navigation.navigate("History");
     }
     // const navigateToPrivacy = () => {
     //      navigation.navigate("Start");
     // }

     const logout = () => {
          Alert.alert("Successful logout");
          navigation.navigate("Login");
          removeUserIDVIP();

     }
     const accountItem = [
          { icon: "person-outline", text: "Edit Profile", action: navigateToEditProfile },
          { icon: "security", text: "Upgrade to Premium", action: navigateToSecurity },
          { icon: "notifications-none", text: "History", action: navigateToNotifications },
          // { icon: "lock-outline", text: "Privacy", action: navigateToPrivacy },
          { item: "logout", text: "Log out", action: logout }
     ];
     
     const renderSettingsItem = ({ icon, text, action }) => (
          <TouchableOpacity
               onPress={action}
               style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingLeft: 12
               }}>
               <MaterialIcons name={icon} size={24} color="white" />
               <Text style={{
                    marginLeft: 36,
                    ...FONTS.semiBold,
                    fontWeight: 600,
                    fontSize: 16,
                    color: COLORS.white,
               }}>
                    {text}
               </Text>
          </TouchableOpacity>
     )
     return (
          <SafeAreaView style={{
               flex: 1,
               backgroundColor: '#121212'
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
                              color={'#0f0f0f'}
                         />
                    </TouchableOpacity>

                    <Text style={{ ...FONTS.h3,color: COLORS.white }} >Setting</Text>
               </View>
               <ScrollView style={{ marginBottom: 12 }}>
                    {/* AccountSetting */}
                    <View style={{ marginBottom: 12 }}>
                         <Text style={{ ...FONTS.h4, marginVertical: 10, color: COLORS.white }}>Account</Text>
                         <View style={{
                              borderRadius: 12,
                              backgroundColor: COLORS.gray,
                         }}>
                              {
                                   accountItem.map((item, index) => (
                                        <React.Fragment key={index}>
                                             {renderSettingsItem(item)}
                                        </React.Fragment>
                                   ))
                              }
                         </View>
                    </View>
                    
               </ScrollView>
          </SafeAreaView>
     )
}