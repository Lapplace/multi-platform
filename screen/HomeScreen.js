import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon,MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {styles} from '../theme';
import trendingMovies from "../components/trendingMovies";

const android = Platform.OS == 'android';
export default function HomeScreen() {
     const {trending, setTranding} = useState((1,2,3))
     return (
          <View className="flex-1 bg-neutral-800">
               <SafeAreaView className={android ? "-mb-2" : 'mb-3'}>
                    <StatusBar style="light" />
                    <View className='flex-row justify-between items-center mx-4'>
                         <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                         <Text className="text-white text-3xl font-bold">
                              <Text style={styles.text}>M</Text>ovie
                         </Text>
                         <TouchableOpacity>
                              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                         </TouchableOpacity>
                    </View>
               </SafeAreaView>

               <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle = {{paddingBottom:10}}
               >
                    <TrendingMovies/>

               </ScrollView>
          </View>
     )
}