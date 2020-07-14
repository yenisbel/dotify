import React, { Component } from "react";
import { Mutation, ApolloConsumer, Query } from "react-apollo";
import Mutations from "../graphql/mutations";
import song from "../assets/music/test.mp3";
import PlayerCSS from "../assets/stylesheets/player.css";
import image from "../assets/images/album-cover.png";
import { withRouter } from "react-router-dom";

import Queries from "../graphql/queries";
const { FETCH_ALBUM, GET_CURRENT_ALBUM, GET_CURRENT_SONG } = Queries;


class Player extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      time: '',
      volume: '',
      muted: false,
      playing: false,
      filledHeart: false,
      loop: false,
      shuffle: false,
      albumCoverUrl: '',
      artistName: '',
      queue: [],
      song: { songUrl: '', songTitle: ''},
      album: null
    }
    this.tick = this.tick.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleTimeline = this.handleTimeline.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleHeart = this.toggleHeart.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.setAlbum = this.setAlbum.bind(this);
  }

  componentDidMount() {
    this.time = setInterval(this.tick, 1000);
    
  };

  handlePlay(e){
    this.setState({playing: true})
  };

  togglePlay() {
    if (this.state.playing) {
      this.audioRef.pause();
      this.setState({ playing: false });

    } else {
      this.audioRef.play();
      this.setState({ playing: true });
    }
  };

  toggleHeart() {
    const empty = document.getElementById("empty-heart");
    const filled = document.getElementById("fill-heart");
    if (!this.state.filledHeart) {
      this.setState({ filledHeart: true })
      empty.style.opacity = "1";
      filled.style.opacity = "0";
    } else {
      this.setState({ filledHeart: false })
      filled.style.opacity = "1";
      empty.style.opacity = "0";
    }
  }

  tick() {
    this.setState({ time: new Date() });
  }

  handleVolume(e, mute) {
    if (e) {
      let newVolume = (e.target.value < 1) ? 0 : e.target.value;
      this.setState({ volume: newVolume })
      this.audioRef.volume = newVolume / 100;

      if (newVolume < 1) {
        this.setState({ muted: true });
      } else if (this.state.muted) {
        this.setState({ muted: false })
      }
    } else if (mute) {
      this.setState({ volumeInitial: this.state.volume, volume: "0" })
      this.audioRef.volume = 0;
    }

  }

  handleTimeline(e) {

    this.setState({ time: e.target.value }) //input range based on state
    this.audioRef.currentTime = e.target.value;
  }

  getCurrentTime() {
    let totalSeconds = Math.floor(this.audioRef.currentTime)
    let minutes = Math.floor(totalSeconds / 60)
    let leftSeconds = totalSeconds - (60 * minutes)
    if (leftSeconds < 10) {
      return minutes + ":" + "0" + leftSeconds
    } else {
      return minutes + ":" + leftSeconds
    }
  }

  getSongDuration() {
    let totalSeconds = Math.floor(this.audioRef.duration)
    let minutes = Math.floor(totalSeconds / 60)
    let leftSeconds = totalSeconds - (60 * minutes)
    if (leftSeconds < 10) {
      return minutes + ":" + "0" + leftSeconds
    } else {
      return minutes + ":" + leftSeconds
    }
  }

  handleLoop() {
    const repeat = document.getElementById("repeat");
    if (!this.state.loop) {
      this.audioRef.loop = true
      this.setState({ loop: true })
      repeat.style.color = "#1FD75F";
    } else {
      this.audioRef.loop = false
      this.setState({ loop: false })
      repeat.style.color = "#707070";
    }
  };

  playNext(client){
   
    const randomSong = this.state.queue[Math.floor(Math.random() * this.state.queue.length)];
    const currentSongIndex = this.state.queue.findIndex(el => {
      return el.url === this.state.currentSong.url 
    });
    if (this.state.shuffle){
      client.writeData({
        data: {
          currentSong: randomSong
        }
      })
      this.setState({ currentSong: randomSong },() => {this.audioRef.play()})
    } else {
      client.writeData({
        data: {
          currentSong: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1] : this.state.queue[0]
        }
      })
      this.setState({
        currentSong: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1] : this.state.queue[0]},
        () => { this.audioRef.play() }
      )
    }
  }

  playPrev(client){
    const randomSong = this.state.queue[Math.floor(Math.random() * this.state.queue.length)];
    const currentSongIndex = this.state.queue.findIndex(el => {
      return el.url === this.state.currentSong.url
    });
    if (this.state.shuffle) {
      client.writeData({
        data: {
          currentSong: randomSong
        }
      })
      this.setState({ currentSong: randomSong }, () => { this.audioRef.play() })
    } else {
      client.writeData({
        data: {
          currentSong: this.state.queue[currentSongIndex - 1] ? this.state.queue[currentSongIndex - 1] : this.state.queue[this.state.queue.length-1]
        }
      })
      this.setState({
        currentSong: this.state.queue[currentSongIndex - 1] ? this.state.queue[currentSongIndex - 1] : this.state.queue[this.state.queue.length - 1]
      },
        () => { this.audioRef.play() }
      )
    }
  }

  handleShuffle(){
    const shuffle = document.getElementById("shuffle");
    if (!this.state.shuffle) {
      this.audioRef.shuffle = true
      this.setState({ shuffle: true })
      shuffle.style.color = "#1FD75F";
    } else {
      this.audioRef.shuffle = false
      this.setState({ shuffle: false })
      shuffle.style.color = "#707070";
    }
   
  };

  setAlbum(data){
    //map over songs and create que in state
    // when we set state, set key of album to something (name)
    this.setState({
      queue: data.currentAlbum.songs,
      album: data.currentAlbum
    })
  }

  render() {
    const playButton = <button onClick={this.togglePlay} id="play" className="play"><i className="fas fa-play"></i></button>;
    const pauseButton = <button onClick={this.togglePlay} id="pause" className="pause"><i className="fas fa-pause"></i></button>;
    return <Query query={GET_CURRENT_ALBUM}>
      {
        ({loading, data, error}) => {
          // check if key is set yet. use the data to set all the keys 
          if (!data) return null;
          if (loading) return "loading";
          if (error) return `${error}`;
          if ((!this.state.album && data) || (this.state.album !== data.currentAlbum)){
            this.setAlbum(data)
          }
         
          return (
            <ApolloConsumer>
              {(client) => {
                
  
          return <Query query={GET_CURRENT_SONG}>
            {
            ({loading, data, error}) => {
              if ((!this.state.currentSong && data.currentSong) || (this.state.currentSong.url !== data.currentSong.url)){
                this.setState({currentSong: data.currentSong})
              }
              if (loading || !this.state.currentSong) return null;
              if (error) return `${error}`;
              const albumCover = data ? data.currentSong.album.url : "";
              const artistName = data ? data.currentSong.artist.name : "";
              
              return(
            <div className="player-footer">
              <div className="footer-left">
                <img className="album-cover" src={albumCover} />
                <div className="song-info">
                  <span className="song-name">{this.state.currentSong.title}</span>
                  <span className="artist-name">{artistName}</span>
                </div>
                <button onClick={this.toggleHeart}><i id="empty-heart" className="far fa-heart"></i></button>
                <button onClick={this.toggleHeart}><i id="fill-heart" className="fas fa-heart"></i></button>
              </div>
              <div className="footer-center">
                <div className="play-pause-buttons">
                  <button onClick={this.handleShuffle}><i id="shuffle" className="fas fa-random"></i></button>
                  <button onClick={() => this.playPrev(client)}><i className="fas fa-step-backward"></i></button>
                  {this.state.playing ? pauseButton : playButton}
                 
                  <button onClick={() => this.playNext(client)}><i className="fas fa-step-forward"></i></button>
                  <button onClick={this.handleLoop}><i id="repeat" className="fas fa-sync"></i></button>
                </div>
                {/* method 2: */}
                {/* <p onClick={e => this.audio.play()} className="play">Play</p> */}
                <div className="timeline-time">
                  <span className="currentSongTime">{this.getCurrentTime()}</span>
                      <audio ref={audio => this.audioRef = audio} src={this.state.currentSong.url} id="song" preload="metadata" onEnded={() => this.playNext(client)} onPlay={e => this.handlePlay(e)} autoPlay></audio>
                  <input
                    type="range"
                    id="timeline"
                    name="timeline"
                    min="0"
                    max={this.audioRef.duration ? this.audioRef.duration : 0}
                    value={this.audioRef.currentTime ? this.audioRef.currentTime : 0}
                    onChange={this.handleTimeline}
                  />
                  <span className="songDuration">{this.getSongDuration()}</span>
                </div>
              </div>
              <div className="volume">
                <i className="fas fa-volume-up"></i>
                <input
                  type="range"
                  id="volume"
                  name="volume"
                  min="0"
                  max="100"
                  onChange={this.handleVolume}
                  style={{
                    backgroundImage: '-webkit-gradient(linear, left top, right top, '
                      + 'color-stop(' + (this.audioRef.volume) + ', #1FD75F), '
                      + 'color-stop(' + (this.audioRef.volume) + ', #666666)'
                      + ')'
                  }}
                />
              </div>
            </div>
              )
        }}
          </Query> 
           }}
            </ApolloConsumer>
          )
        }
      }
    </Query>

    
  }
};

export default withRouter(Player);

