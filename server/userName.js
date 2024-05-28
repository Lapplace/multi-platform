import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'userID';
const VIP_LEVEL_KEY = 'vipLevel';
const USER_NAME_KEY = 'userName';

const saveUserName = async (userName) => {
  try {
    if (userName !== null && userName !== undefined) {
      await AsyncStorage.setItem(USER_NAME_KEY, userName);
      console.log('Tên người dùng đã được lưu.');
    } else {
      console.error('Giá trị userName không hợp lệ:', userName);
    }
  } catch (error) {
    console.error('Lỗi khi lưu tên người dùng:', error);
  }
};

const getUserName = async () => {
  try {
    const userName = await AsyncStorage.getItem(USER_NAME_KEY);
    if (userName !== null) {
      return userName;
    } else {
      console.log('Không có tên người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy tên người dùng:', error);
    return null;
  }
};
const saveUserID = async (userID) => {
  try {
    if (userID !== null && userID !== undefined) {
      await AsyncStorage.setItem(USER_ID_KEY, userID);
      console.log('ID của người dùng đã được lưu.');
    } else {
      console.error('Giá trị userID không hợp lệ:', userID);
    }
  } catch (error) {
    console.error('Lỗi khi lưu ID của người dùng:', error);
  }
};

const getUserID = async () => {
  try {
    const userID = await AsyncStorage.getItem(USER_ID_KEY);
    if (userID !== null) {
      // console.log('da luu id nguoi dung',userID)
      return userID;
    } else {
      console.log('Không có ID của người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy ID của người dùng:', error);
    return null;
  }
};

const removeUserIDVIP = async () => {
  try {
    await AsyncStorage.multiRemove([USER_ID_KEY, VIP_LEVEL_KEY,USER_NAME_KEY]);
    console.log('dữ liệu của người dùng đã được xóa.');
  } catch (error) {
    console.error('Lỗi khi xóa data của người dùng:', error);
  }
};

const saveVipLevel = async (vipLevel) => {
  try {
    if (vipLevel !== null && vipLevel !== undefined) {
      await AsyncStorage.setItem(VIP_LEVEL_KEY, vipLevel);
      console.log("viplel update: ",vipLevel);
      
    } else {
      console.error('Giá trị vipLevel không hợp lệ:', vipLevel);
    }
  } catch (error) {
    console.error('Lỗi khi lưu VIP của người dùng:', error);
  }
};

const getVipLevel = async () => {
  try {
    const vipLevel = await AsyncStorage.getItem(VIP_LEVEL_KEY);
    if (vipLevel !== null) {
      return vipLevel;
      
    } else {
      console.log('Không có VIP của người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy VIP của người dùng:', error);
    return null;
  }
};


export { saveUserName, getUserName,saveUserID, getUserID, removeUserIDVIP, getVipLevel, saveVipLevel };
