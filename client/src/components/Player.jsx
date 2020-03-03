import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
import song from "../assets/music/test.mp3";
import PlayerCSS from "../assets/stylesheets/player.css";

class Player extends Component {
  constructor(props){
    super(props);

    // this.audio = new Audio(song)
    this.audioRef = React.createRef();
    this.state = {
      time: '',
      volume: '',
      muted: false
    }
    this.tick = this.tick.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {
    this.audioRef.addEventListener("timeupdate", () => {
      let songRatio = this.audioRef.currentTime / this.audioRef.duration;
      let position = (this.timeline.offsetWidth * songRatio) + this.timeline.offsetLeft;
      this.positionHandle(position);
    });
    this.time = setInterval(this.tick, 1000);
  };

  tick(){
    this.setState({ time: new Date()});
  }

  handleVolume(e, mute){
    debugger;
    if (e){
      let newVolume = (e.target.value < 1) ? 0 : e.target.value;
      this.setState({volume: newVolume})
      this.audioRef.volume = newVolume / 100;

      if (newVolume < 1){
        this.setState({muted: true});
      } else if (this.state.muted) {
        this.setState({muted: false})
      }
    } else if (mute) {
      this.setState({volumeInitial: this.state.volume, volume: "0"})
      this.audioRef.volume = 0;
    }
    // } else {
    //   this.setState({volume: this.state.volumeInitial})
    //   this.audioRef.volume = this.state.volumeInitial / 100;
    // }
  }
  //offsetLeft returns number of pixels that top left corner is off to the parent.
  //offsetWidth returns the width of the visible area for an object, in pixels
  positionHandle = (position) => {
    console.log(position);
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    let handleLeft = position - this.timeline.offsetLeft;
    console.log("handleLeft:" + handleLeft);
    if (handleLeft >= 0 && handleLeft <= timelineWidth) {
      this.handle.style.marginLeft = handleLeft + "px";
    }

    if (handleLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + "px";
    }

    if (handleLeft < 0) {
      this.handle.style.marginLeft = "0px";
    }
  };

  mouseMove = (e) => {
    console.log(e.pageX);
    this.positionHandle(e.pageX);
    this.audioRef.currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.audioRef.duration;
  }; // dragging the handle

  mouseDown = (e) => {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  };

  getCurrentTime(){
    let totalSeconds = Math.floor(this.audioRef.currentTime)
    let minutes = Math.floor(totalSeconds / 60)
    let leftSeconds = totalSeconds - (60 * minutes)
    if (leftSeconds < 10){
      return minutes + ":" + "0" + leftSeconds
    } else {
      return minutes + ":" + leftSeconds
    }
  }

  getSongDuration(){
    let totalSeconds = Math.floor(this.audioRef.duration)
    let minutes = Math.floor(totalSeconds/60)
    let leftSeconds = totalSeconds - (60*minutes)
    if (leftSeconds < 10) {
      return minutes + ":" + "0" + leftSeconds
    } else {
      return minutes + ":" + leftSeconds
    }
  }

  play = () => {
    this.audioRef.play()
  };

  pause = () => {
    debugger;
    this.audioRef.pause()
  }

  render () {
    return (
      <div className="player-footer">
        <div className="footer-left">
          <div className="song-info">
            <span className="song-name">Saw You In A Dream</span>
            <span className="artist-name">The Japanese House</span>
          </div>
          <i className="far fa-heart"></i>
        </div>
        <div className="footer-center">
          <div className="play-pause-buttons">
            <button onClick={this.play} className="play"><i className="fas fa-play"></i></button>
            <button onClick={this.pause} className="pause"><i className="fas fa-pause"></i></button>
          </div>
          {/* method 2: */}
          {/* <p onClick={e => this.audio.play()} className="play">Play</p> */}
          <div className="timeline-time">
            <span className="currentSongTime">{this.getCurrentTime()}</span>
            <audio ref={audio => this.audioRef = audio} src={song} id="song" preload="metadata"></audio>
            <div id="timeline" onClick={this.mouseMove} ref={(timeline) => {this.timeline = timeline}}>
              <div id="handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }}/>
            </div>
            <span className="songDuration">{this.getSongDuration()}</span>
          </div>
        </div>
        <div className="volume">
          <i className="fas fa-volume-up"></i>
          <input type="range" id="volume" name="volume" min="0" max="100" step="1" onChange={this.handleVolume}/>
        </div>
      </div>
    )
  }
};

export default Player; 

// on click button for each button. this.audio.play, .pause, first approach
// second appraoch: using react refs
// a02 que
// line 22 sets reference to be audio. using callback because you want it as instance. everytime you trigger rerender you want a different instance(songs)
// this.audioRef will become the new song
// next steps: timeline, left sidee current time, right side length of the song
// volume bar slider