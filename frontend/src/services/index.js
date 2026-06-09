import api from "./api.js";

// Comments
export const getVideoComments = (videoId, params) => api.get(`/comments/${videoId}`, { params });
export const addComment = (videoId, data) => api.post(`/comments/${videoId}`, data);
export const updateComment = (commentId, data) => api.patch(`/comments/c/${commentId}`, data);
export const deleteComment = (commentId) => api.delete(`/comments/c/${commentId}`);

// Likes
export const toggleVideoLike = (videoId) => api.post(`/likes/toggle/v/${videoId}`);
export const toggleCommentLike = (commentId) => api.post(`/likes/toggle/c/${commentId}`);
export const toggleTweetLike = (tweetId) => api.post(`/likes/toggle/t/${tweetId}`);
export const getLikedVideos = () => api.get("/likes/videos");

// Subscriptions
export const toggleSubscription = (channelId) => api.post(`/subscriptions/c/${channelId}`);
export const getChannelSubscribers = (channelId) => api.get(`/subscriptions/c/${channelId}`);
export const getSubscribedChannels = (userId) => api.get(`/subscriptions/u/${userId}`);

// Playlists
export const createPlaylist = (data) => api.post("/playlists", data);
export const getUserPlaylists = (userId) => api.get(`/playlists/user/${userId}`);
export const getPlaylistById = (playlistId) => api.get(`/playlists/${playlistId}`);
export const addVideoToPlaylist = (videoId, playlistId) => api.patch(`/playlists/add/${videoId}/${playlistId}`);
export const removeVideoFromPlaylist = (videoId, playlistId) => api.patch(`/playlists/remove/${videoId}/${playlistId}`);
export const deletePlaylist = (playlistId) => api.delete(`/playlists/${playlistId}`);
export const updatePlaylist = (playlistId, data) => api.patch(`/playlists/${playlistId}`, data);

// Tweets
export const createTweet = (data) => api.post("/tweets", data);
export const getUserTweets = (userId) => api.get(`/tweets/user/${userId}`);
export const updateTweet = (tweetId, data) => api.patch(`/tweets/${tweetId}`, data);
export const deleteTweet = (tweetId) => api.delete(`/tweets/${tweetId}`);

// Dashboard
export const getChannelStats = () => api.get("/dashboard/stats");
export const getChannelVideos = () => api.get("/dashboard/videos");
