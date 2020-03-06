import React, { Component } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import Mutations from "../graphql/mutations";
import song from "../assets/music/test.mp3";
import PlayerCSS from "../assets/stylesheets/player.css";
import image from "../assets/images/album-cover.png";
import { withRouter } from "react-router-dom";

import Queries from "../graphql/queries";
const { FETCH_ALBUM, FETCH_ARTISTS } = Queries;


class Player extends Component {
  constructor(props) {
    super(props);
    // this.audio = new Audio(song)
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
      song: { songUrl: '', songTitle: ''}
    }
    this.tick = this.tick.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleTimeline = this.handleTimeline.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleHeart = this.toggleHeart.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.playNext = this.playNext.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  componentDidMount() {
    this.time = setInterval(this.tick, 1000);
    console.log(this.props);
    this.setState({
      queue: this.props.albumTitle.songs.map(song => {
        return { title: song.title, url: song.url }
      })
    });

    // this.setState({songs: result.album.songs})

    this.setState({
      song: {
        songUrl: this.props.albumTitle.songs[0].url,
        songTitle: this.props.albumTitle.songs[0].title,
      },
      albumCoverUrl: this.props.albumTitle.url,
      artistName: this.props.albumTitle.artist.name
    })
    // this.readCache()
  };

  componentDidUpdate(oldProps){
    if (oldProps.currentSong !== this.props.currentSong){
      this.setState({song: {songUrl: this.props.currentSong.url, songTitle: this.props.currentSong.title}})
    }
  }


  togglePlay() {
    const pause = document.getElementById("pause");
    const play = document.getElementById("play");
    
    if (this.state.playing) {
      this.audioRef.pause();
      this.setState({ playing: false });
      play.style.zIndex = "1";
      pause.style.zIndex = "0";

    } else {
      this.audioRef.play();
      this.setState({ playing: true });
      pause.style.zIndex = "1";
      play.style.zIndex = "0";
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

  // play = () => {
  //   this.audioRef.play()
  // };

  // pause = () => {
  //   debugger;
  //   this.audioRef.pause()
  // }

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

  // checkCache(client) {
  //   const song = client.cache.data.data
  //   // console.log(song)
  // }

  readCache(cache) {
    let result;

    try {
      result = cache.readQuery({
        query: FETCH_ALBUM,
        variables: { id: this.props.match.params.id }
      })
    } catch (err) {
      console.log(err);
    }
    if (result) {
      console.log(result.album.songs)
      // let songs = result.albums.songs.url;

      // for (let i= 0; i < result.album.songs.length; i++){

      // }
      // Array.from(
      //   result.album.songs
      // ).forEach(song => {
      //   this.setState({queue: this.state.queue.concat(song.url)})
      // })
      // this.setState({queue: result.album.songs.map(song => {
      //   return {title: song.title, url: song.url}
      // })});

      // // this.setState({songs: result.album.songs})

      // this.setState({ song: {
      //   songUrl: result.album.songs[0].url, 
      //   songTitle: result.album.songs[0].title, 
      //   },
      // albumCoverUrl: result.album.url,
      // artistName: result.album.artist.name
      // })
     

      // return potato.album.songs[1].url
      // set the state for the other ones
      // on end event listener
    }
  }

  // playPrev(){
  //   const currentSongIndex = this.state.queue.findIndex(el => { return el.url === this.state.song.songUrl});
  //   this.setState({
  //     song: {
  //       songUrl: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1].url : this.state.queue[0].url,
  //       songTitle: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1].title : this.state.queue[0].title
  //     }
  //     },
  //     () => { this.audioRef.play() })
  // }

  playNext(){
    // for (let i= 0; i < result.album.songs.length; i++){

    // }
    // console.log(this.state.songs);
    const randomSong = this.state.queue[Math.floor(Math.random() * this.state.queue.length)];
    const currentSongIndex = this.state.queue.findIndex(el => {
      console.log(el, this.state.song);
      return el.url === this.state.song.songUrl 
      // this.state.song
    });
    if (this.state.shuffle){
      this.setState({ song: { songUrl: randomSong.url,songTitle: randomSong.title}},() => {this.audioRef.play()})
    } else {
      this.setState({
        song: {
          songUrl: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1].url : this.state.queue[0].url,
          songTitle: this.state.queue[currentSongIndex + 1] ? this.state.queue[currentSongIndex + 1].title : this.state.queue[0].title
        }
      },
        () => { this.audioRef.play() })
    }
    
    // this.setState({song: {songUrl: this.state.queue[currentSongIndex+1].url || this.state.queue[0].url, songTitle: this.state.queue[currentSongIndex+1].title || this.state.queue[0].title }})
    // console.log(this.state.songs[currentSongIndex]);
    //set the state.currentSong.url to whiever comes next
    console.log(currentSongIndex);
    console.log(this.state.queue[currentSongIndex+1]);

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
    // const randomSong = this.state.queue[Math.floor(Math.random() * this.state.queue.length)];
    // console.log(randomSong);
    // this.audioRef.play(randomSong.url)
  };

  render() {
    // console.log(this.props.artistName);
    // console.log(this.state.queue);
    if (!this.state.song.songUrl) {
      // this.readCache(client.cache);
      return null;
    }
    return <ApolloConsumer>
      {
        (client, data) => {
          // this.checkCache(client);
          // debugger;
          return (
            <div className="player-footer">
              <div className="footer-left">
                <img className="album-cover" src={this.props.albumTitle.url || this.state.albumCoverUrl} />
                <div className="song-info">
                  <span className="song-name">{this.state.song.songTitle}</span>
                  <span className="artist-name">{this.props.artistName || this.state.artistName}</span>
                </div>
                <button onClick={this.toggleHeart}><i id="empty-heart" className="far fa-heart"></i></button>
                <button onClick={this.toggleHeart}><i id="fill-heart" className="fas fa-heart"></i></button>
              </div>
              <div className="footer-center">
                <div className="play-pause-buttons">
                  <button onClick={this.handleShuffle}><i id="shuffle" className="fas fa-random"></i></button>
                  <button><i className="fas fa-step-backward"></i></button>
                  <button onClick={this.togglePlay} id="play" className="play"><i className="fas fa-play"></i></button>
                  <button onClick={this.togglePlay} id="pause" className="pause"><i className="fas fa-pause"></i></button>
                  <button onClick={this.playNext}><i className="fas fa-step-forward"></i></button>
                  <button onClick={this.handleLoop}><i id="repeat" className="fas fa-sync"></i></button>
                </div>
                {/* method 2: */}
                {/* <p onClick={e => this.audio.play()} className="play">Play</p> */}
                <div className="timeline-time">
                  <span className="currentSongTime">{this.getCurrentTime()}</span>
                  <audio ref={audio => this.audioRef = audio} src={this.state.song.songUrl} id="song" preload="metadata" onEnded={this.togglePlay}></audio>
                  <input
                    type="range"
                    id="timeline"
                    name="timeline"
                    min="0"
                    max={this.audioRef.duration ? this.audioRef.duration : 0}
                    value={this.audioRef.currentTime ? this.audioRef.currentTime : 0}
                    onChange={this.handleTimeline}
                  // style={{
                  //   backgroundImage: '-webkit-gradient(linear, left top, right top, '
                  //     + 'color-stop(' + (this.audioRef.currentTime) + ', #666666), '
                  //     + 'color-stop(' + (this.audioRef.currrentTime) + ', #666666)'
                  //     + ')'
                  // }}
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
        }
      }

    </ApolloConsumer>

    // return (
    //   <div className="player-footer">
    //     <div className="footer-left">
    //       <img className="album-cover" src={image}/>
    //       <div className="song-info">
    //         <span className="song-name">Saw You In A Dream</span>
    //         <span className="artist-name">The Japanese House</span>
    //       </div>
    //       <button onClick={this.toggleHeart}><i id="empty-heart" className="far fa-heart"></i></button>
    //       <button onClick={this.toggleHeart}><i id="fill-heart" className="fas fa-heart"></i></button>
    //     </div>
    //     <div className="footer-center">
    //       <div className="play-pause-buttons">
    //         <button><i className="fas fa-random"></i></button>
    //         <button><i className="fas fa-step-backward"></i></button>
    //         <button onClick={this.togglePlay} id="play"  className="play"><i className="fas fa-play"></i></button>
    //         <button onClick={this.togglePlay} id="pause" className="pause"><i className="fas fa-pause"></i></button>
    //         <button><i className="fas fa-step-forward"></i></button>
    //         <button onClick={this.handleLoop}><i id="repeat" className="fas fa-sync"></i></button>
    //       </div>
    //       {/* method 2: */}
    //       {/* <p onClick={e => this.audio.play()} className="play">Play</p> */}
    //       <div className="timeline-time">
    //         <span className="currentSongTime">{this.getCurrentTime()}</span>
    //         <audio ref={audio => this.audioRef = audio} src={song} id="song" preload="metadata"></audio>
    //         <input 
    //           type="range" 
    //           id="timeline" 
    //           name="timeline" 
    //           min="0" 
    //           max={this.audioRef.duration}
    //           value={this.audioRef.currentTime} 
    //           onChange={this.handleTimeline}
    //           // style={{
    //           //   backgroundImage: '-webkit-gradient(linear, left top, right top, '
    //           //     + 'color-stop(' + (this.audioRef.currentTime) + ', #666666), '
    //           //     + 'color-stop(' + (this.audioRef.currrentTime) + ', #666666)'
    //           //     + ')'
    //           // }}
    //           />
    //         <span className="songDuration">{this.getSongDuration()}</span>
    //       </div>
    //     </div>
    //     <div className="volume">
    //       <i className="fas fa-volume-up"></i>
    //       <input 
    //         type="range" 
    //         id="volume" 
    //         name="volume" 
    //         min="0" 
    //         max="100" 
    //         onChange={this.handleVolume} 
    //         style={{
    //         backgroundImage: '-webkit-gradient(linear, left top, right top, '
    //           + 'color-stop(' + (this.audioRef.volume) + ', #1FD75F), '
    //           + 'color-stop(' + (this.audioRef.volume) + ', #666666)'
    //           + ')'
    //         }}
    //         />
    //     </div>
    //   </div>
    // )
  }
};

export default withRouter(Player);

// on click button for each button. this.audio.play, .pause, first approach
// second appraoch: using react refs
// a02 que
// line 22 sets reference to be audio. using callback because you want it as instance. everytime you trigger rerender you want a different instance(songs)
// this.audioRef will become the new song
// next steps: timeline, left sidee current time, right side length of the song
// volume bar slider