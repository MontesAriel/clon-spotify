import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import tokenReducer from '../features/tokenSlice'
import playlistReducer from '../features/playlistSlice'
import topArtistReducer from '../features/topArtistSlice'
import topStracksReducer  from '../features/topTracksSlice'
import recentlyPlayedReducer from '../features/recentlyPlayedSlice'
import playerStateReducer from '../features/playerStateSlice'
import getTrackReducer from '../features/getTrackSlice'
import getTraksPlaylistReducer from "../features/getTraksPlaylist";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    playlist: playlistReducer,
    topArtist: topArtistReducer,
    topStrack: topStracksReducer,
    recentlyPlayed: recentlyPlayedReducer,
    playerState: playerStateReducer,
    track: getTrackReducer,
    traksPlaylist: getTraksPlaylistReducer,
  }
})
