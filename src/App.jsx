
import Home from './components/home/Home';
import Login from './components/login/Login';
import { useEffect } from 'react';
import { getTokenFromURL } from './components/spotifyLogic/spotifyLogic';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from './features/userSlice';
import SpotifyWebApi from 'spotify-web-api-js';
import { selectToken, SET_TOKEN } from './features/tokenSlice';
import { SET_PLAYLIST } from './features/playlistSlice';
import { SET_TOP_ARTIST } from './features/topArtistSlice';
import { SET_TOP_TRACKS } from './features/topTracksSlice';
import { SET_RECENTLY_PLAYED } from './features/recentlyPlayedSlice';
import { SET_PLAYER_STATE } from './features/playerStateSlice';
import { SET_TRACK } from './features/getTrackSlice';

const spotify = new SpotifyWebApi();

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const hash = getTokenFromURL();
    const _token = hash.access_token;

    if(_token !== undefined) {
      dispatch(SET_TOKEN(_token));
      spotify.setAccessToken(_token)
      spotify.getMe().then(user => dispatch(SET_USER(user)))
      spotify.getUserPlaylists({ limit: 10 }).then(playlists => {
        dispatch(SET_PLAYLIST(playlists));
      }).catch(error => {
        console.error('Error fetching playlists:', error);
      });
      spotify.getMyTopArtists({limit:8}).then(topArtist => {
        dispatch(SET_TOP_ARTIST(topArtist))
      }).catch(error => {
        console.error('Error fetching top artist:', error);
      });
      spotify.getMyTopTracks({ limit: 10 }).then(topTracks => {
        dispatch(SET_TOP_TRACKS(topTracks));
      }).catch(error => {
        console.error('Error fetching top tracks:', error);
      });

      spotify.getMyRecentlyPlayedTracks({ limit: 10 }).then(recentlyPlayed => {
        dispatch(SET_RECENTLY_PLAYED(recentlyPlayed));
      }).catch(error => {
        console.error('Error fetching recently played tracks:', error);
      });

      spotify.getMyCurrentPlaybackState().then(playerState => {
        dispatch(SET_PLAYER_STATE(playerState));
      }).catch(error => {
        console.error('Error fetching player state:', error);
      });
      spotify.getTrack('3AJwUDP919kvQ9QcozQPxg').then(track => {
        dispatch(SET_TRACK(track));
      }).catch(error => {
        console.error('Error fetching player state:', error);
      });

    }

  }, [dispatch]);

  return (
    <>
    {token ? <Home /> : <Login />}
   
    </>
  )
}

export default App
