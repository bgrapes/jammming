const clientId = 'd2d8945c94ca42439529d8fcd5696ae8';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  handleErrors(response) {
    if (!response.ok) {
      console.log(response);
      throw Error(response.statusText)
    }
    return response;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    const fetchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = {headers: {Authorization: `Bearer ${accessToken}`}};

    return fetch(fetchURL, headers).then(response => {
        Spotify.handleErrors(response);
        return response.json();
      })

      .then(jsonResponse => {
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
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    const createPlaylistHeaders = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: name})
    };
    const addTracksHeaders = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uris: trackUris})
    };
    let userId, playlistId;

    // Get user ID.
    fetch(`https://api.spotify.com/v1/me`, {headers: headers})

    .then(response => response.json())

    .then(jsonResponse => {
      if (jsonResponse.id) {
        userId = jsonResponse.id; // Save user ID.
        // Create playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, createPlaylistHeaders)

        .then(response => response.json())
      }
    })

    .then(jsonResponse => {
      if (jsonResponse.id) {
        playlistId = jsonResponse.id; // Save ID of new playlist.
        // Add tracks to new playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, addTracksHeaders)
      }
    })
  }
};

export default Spotify;