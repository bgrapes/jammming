import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      searchTerm: '',
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    // Check if the track is in the array. If -1 is returned, then it's not in the array.
    if (playlist.indexOf(track) === -1) {
      this.setState({
        playlistTracks: playlist.concat(track) // Add track to the playlist.
      });
    }
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    let isInPlaylist = playlist.findIndex(is => is.id === track.id);
    if (isInPlaylist >= 0) {
      playlist.splice(isInPlaylist, 1); // Remove track from the playlist.
      this.setState({
        playlistTracks: playlist
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    let playlistName = this.state.playlistName;
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;