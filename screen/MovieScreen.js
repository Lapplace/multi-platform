import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { favouriteURL, movieURL, isFavouriteURL, imageURL, addWatchHistoryURL } from '../api/moviedbs';
import { getUserID, getVipLevel } from '../server/userName';

const { width, height } = Dimensions.get('window');
const android = Platform.OS === 'android';
const topMargin = android ? '' : 'mt-3';
const getFullImageLink = (imageLink) => `${imageURL}/${imageLink}`;



export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [userid, setUserID] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vipLevel, setVipLevel] = useState(null);
  const [isvipLevel, setIsVipLevel] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const movie_id = item.id_movie;

  const updateFavourite = async (userId, movieId, isFavourite) => {
    setIsFavourite(!isFavourite);
    try {
      const response = await fetch(`${favouriteURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: userId,
          id_movie: movieId,
          isFavourite: isFavourite
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (vipLevel !== null) {
      checkVipLevel();
    }
  }, [vipLevel]);

  const fetchData = async () => {
    await getSimilarMovies();
    const userID = await getUserID();
    setUserID(userID);
    await fetchVipLevel();
    await checkFavourite(userID, movie_id);
  };

  const fetchVipLevel = async () => {
    const vipLv = await getVipLevel();
    setVipLevel(vipLv);
  };

  const checkVipLevel = () => {
    if (vipLevel === item.viewer_level || vipLevel !== 'none') {
      setIsVipLevel(true);
      setShowAlert(false);
    } else {
      setIsVipLevel(false);
      setShowAlert(true);
    }
  };

  const getSimilarMovies = async () => {
    fetch(`${movieURL}`)
      .then(response => response.json())
      .then(data => {
        setSimilarMovies(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  const checkFavourite = async (userId, movieId) => {
    try {
      const response = await fetch(`${isFavouriteURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: userId,
          id_movie: movieId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIsFavourite(data.isFavourite);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        "Copyright issues",
        "VIP registration required to continue",
        [
          {
            text: "Cancel",
            onPress: () => { navigation.goBack(); },
          },
          {
            text: "Ok",
            onPress: () => navigation.navigate("Start"),
          }
        ]
      );
    }
  }, [showAlert]);

  const handlePlayButtonClick = async (userId, movieId) => {
    try {
      const response = await fetch(`${addWatchHistoryURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: userId,
          id_movie: movieId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data);

      navigation.push('ViewVideo', item);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  if (isvipLevel) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        <View className="w-full">
          <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateFavourite(userid, movie_id, isFavourite)}>
              <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
          {
            loading ? (
              <Loading />
            ) : (
              <View>
                <Image
                  source={{ uri: getFullImageLink(item.image_link) }}
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
            {item.title}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            year {item?.release_date?.split('-')[0]} • {item?.duration} min
          </Text>
          <Text className="text-neutral-400 mx-4 tracking-wider">
            {item?.summary}
          </Text>
          <View style={{ backgroundColor: 'black', padding: 10 }}>
            <Text style={{ color: 'white' }}>
              Author: {item.author}
            </Text>
            <Text style={{ color: 'white' }}>
              Actor: {item.actors}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.background}
            onPress={() => handlePlayButtonClick(userid, movie_id)}
            className="font-bold py-2 px-4 rounded-full"
          >
            <Text className="text-white text-center text-2xl">Play</Text>
          </TouchableOpacity>
        </View>
        <MovieList title="Another Movies" hideSeeAll={true} data={similarMovies} />
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 bg-neutral-900"></View>
  );
}
