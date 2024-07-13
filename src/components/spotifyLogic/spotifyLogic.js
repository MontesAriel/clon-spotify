
const clientId = 'ef871b4f69644dd4ac55cdf1d02e136a';
const redirectUri = 'http://127.0.0.1:5173/';

const scope = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative'
  ];
  
const authUrl = new URL("https://accounts.spotify.com/authorize");

export const loginURL= `${authUrl}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope.join("%20")}&show_dialog=true`;


export const getTokenFromURL = () => {
    return window.location.hash.substring(1).split("&")
    .reduce((initial,item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        
        return initial;
    }, {})
}