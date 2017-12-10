import React from 'react';
import Artwork from '../Artwork/Artwork';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.onRemove) {
      return <span onClick={this.removeTrack}>-</span>;
    } else {
      return <span onClick={this.addTrack}>+</span>;
    }
  }

  addTrack(event) {
    event.preventDefault();
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track); 
  }

  render() {
    return (
      <div className="Track">
        <Artwork track={this.props.track} album={this.props.track.albumId} viewAlbum={this.props.viewAlbum} clickable={this.props.clickable} />
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    )
  }
}

export default Track;