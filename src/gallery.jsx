import React, { Component } from 'react';
import './App.css'

class Gallery extends Component {
  // adding a constructor since we need the "state" within the gallery
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
      {/* here we can make use of the js Audio object */}
      let audio = new Audio(previewUrl);
      if (!this.state.playing) {
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
      else{
        if (this.state.playingUrl === previewUrl) {
            this.state.audio.pause();
            this.setState({
            playing: false
          });
        }
        else{
          this.state.audio.pause();
          audio.play();
          this.setState({
            playing: true,
            playingUrl: previewUrl,
            audio
          });
      }
    }
  }

  render() {
    console.log('gallery props', this.props);
    const {tracks} = this.props;
    return(
      <div className="gallery">

         {tracks.map((track, k) => {
           console.log('single track', track);
           const trackImg = track.album.images[0].url;
           if (track.preview_url != null) {
             return(
               <div key={k} className='track'

                    /* here we call an anonimus function to play de audio when the user click on the track */
                    onClick={() => this.playAudio(track.preview_url)}>

                <img src={trackImg} className='track-img' alt='track'  />
                <div className="track-play">
                  <div className="track-play-inner">
                    {
                      this.state.playing && track.preview_url === this.state.playingUrl ? <span>| |</span> : <span>&#9654;</span>
                    }
                  </div>
                </div>
                <p className='track-text'>{track.name}</p>
               </div>
             )
           }

         })}
      </div>
    )
  }
}

export default Gallery;
