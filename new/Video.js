import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { videoURL, commentsURL, postcommentsURL } from '../api/moviedbs';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { COLORS } from '../theme';
import { formatDistanceToNow } from 'date-fns';
import { getUserName } from '../server/userName';

const { width } = Dimensions.get('window');
const getFullVideosLink = (videosLink) => `${videoURL}/${videosLink}`;

const Item = ({ name, description, time }) => (
  <View style={styles.commentContainer}>
    <View style={styles.commentHeader}>
      <Text style={styles.commentAuthor}>{name}</Text>
      <Text style={styles.commentTime}>{formatDistanceToNow(new Date(time), { addSuffix: true })}</Text>
    </View>
    <Text style={styles.commentText}>{description}</Text>
  </View>
);

export default function VideoAndComments() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const video = useRef(null);
  const [isReplayVisible, setIsReplayVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  // console.log(item);
  const handlePlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.isLoaded && !playbackStatus.isPlaying && playbackStatus.didJustFinish) {
      setIsReplayVisible(true);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUserName();
  }, []);
  const fetchComments = async () => {
    try {
      // console.log(item.id_movie)
      if (item.id_movie) {
        const response = await fetch(`${commentsURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_movie: item.id_movie
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        // console.log(data);
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };
  const fetchUserName = async () => {
    const storedUserName = await getUserName();
    if (storedUserName) {
      setUserName(storedUserName);
    }
  };
  const handleReplay = async () => {
    setIsReplayVisible(false);
    if (video.current) {
      await video.current.replayAsync();
    }
  };
  const handleSubmitComment = async() => {
    if (description.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        name: userName,
        description: description,
        time: new Date().toISOString(),
        id_movie: item.id_movie,
      };
      try {
        const response = await fetch(`${postcommentsURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }
      setComments([...comments, newComment]);
      setDescription('');
      }catch (error) {
        console.error('Error posting comment:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.absoluteContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          // source={{ uri: "http://192.168.1.5//api_App/videos/upload/video-6653cb18836941.00421882.mp4" }}
          source={{ uri: getFullVideosLink(item.video_url) }}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {isReplayVisible && (
          <TouchableOpacity style={styles.replayButton} onPress={handleReplay}>
            <Text style={styles.replayButtonText}>Replay</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentTitle}>Comments ({comments.length})</Text>
        <FlatList
          data={comments}
          renderItem={({ item }) => <Item name={item.name} description={item.description} time={item.time} />}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment..."
            onChangeText={text => setDescription(text)}
            value={description}
            multiline
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleSubmitComment}>
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoContainer: {
    width: width,
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: 250,
    backgroundColor: '#000',
  },
  replayButton: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  replayButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  commentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
  },
  commentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentAuthor: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentTime: {
    color: 'gray',
  },
  commentText: {
    color: 'white',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 8,
    color: 'white',
    marginRight: 8,
    minHeight: 50,
  },
  commentButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
