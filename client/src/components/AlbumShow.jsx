import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Player from "./Player";
import gql from "graphql-tag";
// import { ApolloClient } from 'apollo-client';



const { FETCH_ALBUM, FETCH_ARTISTS } = Queries;

class AlbumShow extends Component {
  constructor(props){
    super(props)
  }

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
      <div>
        <ul>
      
            <Query query={FETCH_ALBUM}
              variables={{id: this.props.match.params.id}} 
            >
                {({ loading, error, data}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return <ApolloConsumer>
                  {
                    (client) => {
                      // debugger
                      // this.readCache(client.cache);
                      return data.album.songs.map((song) => (
                            <li key={song._id}>
                                <p>{song.title}</p>
                            </li>
                          ));
                    }
                  }
                </ApolloConsumer>
                  // if (loading) return <p>Loading...</p>;
                  // if (error) return <p>Error</p>;
                  // this.updateCache(data.album)

                }}
            </Query>
        </ul>
        <Player/>
      </div>
    )
  }
};

export default AlbumShow;

//data.album.songs.url