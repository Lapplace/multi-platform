import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window')
const android = Platform.OS == 'android';
const topMargin = android ? '' : 'mt-3';



export default function MovieScreen() {
     const { params: item } = useRoute();
     const [isFavourite, toggleFavourite] = useState(false);
     const navigation = useNavigation();
     const [cast, setCast] = useState([1, 2, 3, 4, 5]);
     const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
     const [loading, setLoading] = useState(false);
     let movieName = 'sexy-Girl: vadjeijidlk aldadhhehudhuahshdu';

     useEffect(() => {
          //call the API
     }, [item])

     return (
          <ScrollView
               contentContainerStyle={{ paddingBottom: 20 }}
               className="flex-1 bg-neutral-900"
          >
               <View className="w-full">
                    {/* <Text className="text-white">hello</Text>
                    <Text className="text-white">hello</Text> */}
                    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                              <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                         </TouchableOpacity>
                    </SafeAreaView>
                    {
                         loading ? (
                              <Loading />
                         ) : (
                              <View>
                                   <Image
                                        source={require('../assets/images/c12a0e60c4248792e81efde5f94cf944.jpg')}
                                        style={{ width, height: height * 0.55 }}
                                   />
                                   <LinearGradient
                                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                        style={{ width, height: height * 0.40 }}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        className="absolute bottom-0"
                                   />
                              </View>
                         )
                    }
               </View>
               <View style={{ marginTop: -(height * 0.0) }} className="space-y-3">
                    <Text className="text-white text-center text-3xl font-bold tracking-wider ">
                         {
                              movieName
                         }
                    </Text>
                    {/* status,relese,runtime */}
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                         Released * 2020 * 170 min
                    </Text>
                    <View className="flex-row justify-center mx-4 space-x-2">
                         <Text className="text-neutral-400 font-semibold text-base text-center">
                              Action *
                         </Text>
                         <Text className="text-neutral-400 font-semibold text-base text-center">
                              Thrill *
                         </Text>
                         <Text className="text-neutral-400 font-semibold text-base text-center">
                              comedy
                         </Text>
                    </View>
                    <Text className="text-neutral-400 mx-4 tracking-wider">
                         Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.
                    </Text>
               </View>

               <Cast navigation={navigation} cast={cast} />

               <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
          </ScrollView>
     )
}