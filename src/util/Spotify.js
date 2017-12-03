const clientId = 'd2d8945c94ca42439529d8fcd5696ae8';
const redirectUri = 'http://localhost:3000/';
let accessToken;

class Spotify extends React.Component {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    const accessToken = window.location.href.match('/access_token=([^&]*)/');
    const expiresIn = window.location.href.match('/expires_in=([^&]*)/');

    if (accessToken && expiresIn) {
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const accessUrl = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
      window.location(accessUrl);
    }

  }
}

export default Spotify;