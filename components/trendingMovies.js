import React from 'react';
import { TouchableWithoutFeedback, Text, View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { imageURL } from '../api/moviedbs';

var { width, height } = Dimensions.get('window');
const getFullImageLink = (imageLink) => `${imageURL}/${imageLink}`;

export default function TrendingMovies({ data }) {
  // console.log(data);
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('Movie', item); 
  }
  
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 4, marginBottom: 5 }}>Trending</Text>
      <Carousel 
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View>
        <Image
          source={{ uri: getFullImageLink(item.image_link)}}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20 
          }}
        />
        {/* <Text style={{ color: 'white', textAlign: 'center', marginTop: 5 }}>{item.title}</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
