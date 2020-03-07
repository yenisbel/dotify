import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Player from "./Player";
import gql from "graphql-tag";
import "../assets/stylesheets/albumShow.css";
// import { ApolloClient } from 'apollo-client';



const { FETCH_ALBUM, FETCH_ARTISTS } = Queries;

class AlbumShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentSong: ''
    }
  }

  // handlePlay(client, data){
  //   client.writeData({
  //     data: {
  //       currentAlbum: 
  //     }
  //   })
  // }

  updateCache(client, data){
    // debugger;
    // console.log(album);
    // localStorage.setItem("albumName", album.name);
    // localStorage.setItem("albumUrl", album.url);
    // localStorage.setItem("artistName", album.artist.name);
    // console.log(data);
    // let album;
    // console.log(_APOLLO_CLIENT_.cache.InMemoryCache.data.data)
    
    // try{
    //   const album = client.readQuery({ query: FETCH_ALBUM });
    // } catch (err){
    //   return;
    // }

    // if (album){
    //   const newAlbum = data.data.newAlbum;
    //   cache.writeQuery({ query: FETCH_ALBUM})
    // }
  }

  // readCache(cache){
  //   let potato;
  //   try {
  //       potato = cache.readQuery({
  //       query: FETCH_ALBUM,
  //       variables: { id: this.props.match.params.id }
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   if (potato){
  //     console.log(potato)
  //   }
  // }

  render(){
    return (

      <Query query={FETCH_ALBUM}
      variables={{id: this.props.match.params.id}} 
      >
      
        {({ loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          // console.log("hello")
          //data.album
          return <div className="albumShow">
              <ul>
                {/* return <ApolloConsumer> */}
                  {/* { */}
                    {/* // (client) => { */}
                      {/* // debugger
                      // this.readCache(client.cache); */}
                      {data.album.songs.map((song) => (
                        <li key={song._id}>
                          <p onClick={e => this.setState({ currentSong: song })}>{song.title}</p>
                          {/* <p onClick={this.handlePlay(client, data)}>PLay</p> */}
                        </li>
                      ))}
                    {/* } */}
                  {/* } */}
                {/* </ApolloConsumer> */}
                  {/* // if (loading) return <p>Loading...</p>;
                  // if (error) return <p>Error</p>;
                  // this.updateCache(data.album) */}

                </ul>
            <Player currentSong={this.state.currentSong} albumTitle={data.album} artistName={data.album.artist.name}/>
          </div>
        }}
    </Query>

    )
  }
};

export default AlbumShow;

//data.album.songs.url