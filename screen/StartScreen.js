import {
  ScrollView,
  Text,
  Pressable,
  Modal,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme";
import { vipLevelUpURL } from "../api/moviedbs";
import { getUserID, saveVipLevel } from '../server/userName';


export default function StartScreen() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const handleUpgrade = () => {
    setShowModal(false);
    Alert.alert("Confirm upgrade premium", "Are you sure to upgrade?", [
      { text: "Cancle", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          updateVipLevel();
        }
      },
    ]);
  };
  const updateVipLevel = async () => {
    try {
      const userID = await getUserID();
      if (userID) {
        const response = await fetch(`${vipLevelUpURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user: userID
          })
        });
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
          // updateVipLevel(result.vipLevel);
          saveVipLevel(result.vipLevel);
          Alert.alert('Success', 'VIP level updated to silver successfully');
        } else {
          Alert.alert('Error', result.message);
          // updateVipLevel('silver');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while updating VIP level');
    }
  };
  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <Pressable
        title="Upgrade to premium"
        className="mt-10"
        style={{
          backgroundColor: COLORS.yellow,
        }}
        onPress={() => setShowModal(true)}
      >
        <Text className="text-white p-2 text-center">
          Upgrade to premium
        </Text>
      </Pressable>
      {/* <Pressable
        className=" mt-10"
        style={{ backgroundColor: COLORS.yellow }}
        onPress={() => navigation.navigate('Comment')}>
        <Text className="text-white p-2 text-center">Comment</Text>
      </Pressable> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View className="bg-slate-800 p-5 flex m-auto w-96 rounded-lg">
          <Text style={{ color: COLORS.yellow }} className=" font-bold text-xl mb-5 text-center">Upgrade to Premium</Text>
          <View className="mx-auto">
            <Text className="text-white text-base px-5 py-2">
              • Unlimited access to all movies.
            </Text>
            <Text className="text-white text-base px-5 py-2">• No ads.</Text>
            <Text className="text-white text-base px-5 py-2">• Highest video quality.</Text>
            <Text className="text-white text-base px-5 py-2">• 24/7 customer support.</Text>

          </View>
          <View className="flex flex-row space-x-16 mt-5 text-center mx-auto">
            <TouchableOpacity
              onPress={() => setShowModal(!showModal)}
              className="bg-gray-500 px-4 py-2 rounded-md border-white border"
            >
              <Text className="text-white text-base">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpgrade}
              className=" px-4 py-2 rounded-md border-white border"
              style={{ backgroundColor: COLORS.yellow }}
            >
              <Text className="text-white text-base">Upgrade Now</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 text-sm px-5 py-2 mt-5 text-center">
            If the purchase fails, please contact the us admin@gmail.com
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
}
