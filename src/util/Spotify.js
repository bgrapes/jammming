const clientId = 'd2d8945c94ca42439529d8fcd5696ae8';
const redirectUri = 'http://localhost:3000/';
let accessToken;

class Spotify {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
    const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
      window.location(accessUrl);
    }
  }

  search(term) {
    accessToken = Spotify.getAccessToken();
    const fetchURL = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = {headers: {Authorization: `Bearer ${accessToken}`}};

    return (
      fetch(fetchURL, headers).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }).then(jsonResponse => {
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        } else return [];
      })
    )
  }

}

export default Spotify;