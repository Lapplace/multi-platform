import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/loading';
import { searchURL } from '../api/moviedbs';
import { imageURL } from '../api/moviedbs';

const { width, height } = Dimensions.get('window');
const getFullImageLink = (imageLink) => `${imageURL}/${imageLink}`;

export default function SearchScreen() {
     const navigation = useNavigation();
     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);

     const handleSearch = (value) => {
          if (value && value.length > 2) {
              setLoading(true);
              fetch(`${searchURL}?search=${value}`, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  }
              })
              .then(response => response.json())
              .then(data => {
                  setLoading(false);
                  if (data && Array.isArray(data)) setResults(data);
                  else setResults([]);
              })
              .catch(error => {
                  setLoading(false);
                  console.error('Error:', error);
              });
          } else {
              setLoading(false);
              setResults([]);
          }
      };
      
     return (
          <SafeAreaView className="bg-neutral-800 flex-1">
               <View
                    className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
               >
                    <TextInput
                         onChangeText={handleSearch}
                         placeholder='Search Movie'
                         placeholderTextColor={'lightgray'}
                         className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                    />
                    <TouchableOpacity
                         onPress={() => navigation.navigate('Home')}
                         className="rounded-full p-3 m-1 bg-neutral-500"
                    >
                         <XMarkIcon size="25" color="white" />
                    </TouchableOpacity>
               </View>
               {/* results */}
               {
                    loading ? (
                         <Loading />
                    ) :
                    results.length > 0 ? (
                         <ScrollView
                              showsVerticalScrollIndicator={false}
                              contentContainerStyle={{ paddingHorizontal: 15 }}
                              className="space-y-3">
                              <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                              <View className="flex-row justify-between flex-wrap">
                                   {
                                        results.map((item, index) => {
                                             return (
                                                  <TouchableWithoutFeedback
                                                       key={index}
                                                       onPress={() => navigation.push("Movie", item)}
                                                  >
                                                       <View className="space-y-2 mb-4">
                                                            <Image className="rounded-3xl"
                                                                 // source={require('../assets/images/carot.jpg')}
                                                                 source={{uri: getFullImageLink(item.image_link)}}
                                                                 style={{ width: width * 0.44, height: height * 0.3 }}
                                                            />
                                                            <Text className="text-neutral-300 ml-1">
                                                                 {item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title}
                                                            </Text>
                                                       </View>
                                                  </TouchableWithoutFeedback>
                                             )
                                        })
                                   }
                              </View>
                         </ScrollView>
                    ) : (
                         <View className="flex-row justify-center">
                              <Image source={require('../assets/images/nen-removebg.png')}
                                   className="h-96 w-96" />
                         </View>
                    )
               }
          </SafeAreaView>
     )
}