import React from 'react';
import './Artwork.css';

class Artwork extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.clickable) {
      this.props.viewAlbum(this.props.album, this.props.track.album, this.props.track.image);
    }
  }

  render() {
    return (
      <div className={"Artwork " + (this.props.clickable && 'clickable')}>
        <img src={this.props.track.image} alt={this.props.track.album} onClick={this.handleClick} />
      </div>
    )
  }
}

export default Artwork;