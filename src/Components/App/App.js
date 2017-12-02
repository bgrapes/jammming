import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{
        name: 'Song',
        artist: 'Artist',
        album: 'Album'
        }],
      playlistName: 'My Playlist',
      playlistTracks: [{
        name: 'Song',
        artist: 'Artist',
        album: 'Album'
      }]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    // Check if the track is in the array. If -1 is returned, then it's not in the array.
    if (this.state.playlistTracks.indexOf(track) === -1) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat(track) // Add track to the playlist.
      });
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.indexOf(track) === 1) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(track) // Remove track from the playlist.
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;