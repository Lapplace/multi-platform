import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { getHistoryURL,imageURL } from '../api/moviedbs';
import { getUserID } from '../server/userName';

export default function HistoryScreen() {
     const [columns, setColumns] = useState(2);
     const [movies, setMovies] = useState([]);
     const [loading, setLoading] = useState(true);
     const [refreshing, setRefreshing] = useState(false); // State để xác định trạng thái làm mới
     const getFullImageLink = (imageLink) => `${imageURL}/${imageLink}`;
   
     const navigation = useNavigation();
   
     useEffect(() => {
       getFavoritemovies();
     }, [])
   
     const getFavoritemovies = async () => {
       try {
         const userID = await getUserID();
         if (userID) {
           fetch(`${getHistoryURL}`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               id_user: userID
             })
           })
           .then(response => response.json())
           .then(data => {
             setMovies(data);
             setRefreshing(false); 
           })
           .catch(error => {
             console.error('Fetch error:', error);
             setRefreshing(false); 
           });
         }
       } catch (error) {
         console.error('Error:', error);
         setRefreshing(false); 
       }
       setLoading(false);
     }
   
     const onRefresh = () => {
       setRefreshing(true);
       getFavoritemovies(); 
     };
   
     const renderItem = ({ item }) => (
       <TouchableWithoutFeedback
         onPress={() => navigation.navigate('Movie', item)}
         style={styles.movie} 
       >
         <View style={styles.movie}>
           <Image source={{ uri: getFullImageLink(item.image_link) }} style={styles.image} resizeMode="cover" />
           <Text style={styles.title}>{item.title}</Text>
         </View>
       </TouchableWithoutFeedback>
     );
   
     return (
       <View style={styles.container}>
         <FlatList
           data={movies}
           renderItem={renderItem}
           keyExtractor={item => item.title}
           numColumns={columns} 
           refreshControl={
             <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
               colors={['#9Bd35A', '#689F38']}
               tintColor="#fff"
             />
           }
         />
       </View>
     );
   };
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       paddingTop: 20,
       padding: 7,
       backgroundColor: '#121212', // Màu nền bg-neutral-800
     },
     movie: {
       flex: 1,
       margin: 8,
       padding: 8,
       borderWidth: 1,
       borderColor: '#4B5563',
       borderRadius: 10,
       alignItems: 'center', 
     },
     title: {
       fontWeight: 'bold',
       marginTop: 5,
       color: '#fff', 
     },
     image: {
       width: '100%', 
       height: 200,
       borderRadius: 5,
     },
     buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 10,
     },
   });
