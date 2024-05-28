import { apiKey } from "../constants";

const baseURL = `api_App/customer`
const baseURL_video =`api_App/videos`

const loginURL = `${apiKey}/${baseURL}/login.php`;
const movieURL = `${apiKey}/${baseURL}/movie.php`;
const favouriteURL = `${apiKey}/${baseURL}/favourite.php`;
const isFavouriteURL = `${apiKey}/${baseURL}/isFavourite.php`;
const getFavouriteURL = `${apiKey}/${baseURL}/getfavourite.php`;
const searchURL = `${apiKey}/${baseURL}/search.php`;
const registerURL=`${apiKey}/${baseURL}/register.php`;
const getDataUserURL=`${apiKey}/${baseURL}/getDataUser.php`;
const updateUserURL=`${apiKey}/${baseURL}/profile.php`;
const vipLevelUpURL=`${apiKey}/${baseURL}/vipLevelUp.php`;
const commentsURL=`${apiKey}/${baseURL}/comments.php`;
const postcommentsURL = `${apiKey}/${baseURL}/postComments.php`;
const addWatchHistoryURL = `${apiKey}/${baseURL}/addWatchHistory.php`;
const getHistoryURL = `${apiKey}/${baseURL}/getHistory.php`;

const videoURL = `${apiKey}/${baseURL_video}/upload`;
const imageURL = `${apiKey}/${baseURL_video}/images`;

export {vipLevelUpURL,getHistoryURL,addWatchHistoryURL,postcommentsURL,commentsURL,loginURL,updateUserURL,getDataUserURL,registerURL,movieURL,favouriteURL,isFavouriteURL,getFavouriteURL,searchURL,videoURL,imageURL};