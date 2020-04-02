import React from "react";
import "../../assets/stylesheets/modal.css"
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { NEW_PLAYLIST } = Mutations;
const { GET_CURRENT_USER_ID, FETCH_PLAYLISTS } = Queries;

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    };
  }

  handleSubmit(e, newPlaylist, userId) {
    e.preventDefault();
    newPlaylist({
      variables: {
        name: this.state.name,
        creator: userId
      }
    });
  }

  updateCache(cache, { data }) {
    let playlists;
    try {
      playlists = cache.readQuery({ query: FETCH_PLAYLISTS });
    } catch (err) {
      console.log(err)
    }
  
    if (playlists) {
      let playlistsArray = playlists.playlists;
      let newPlaylist = data.newPlaylist;
      cache.writeQuery({
        query: FETCH_PLAYLISTS,
        data: { playlists: playlistsArray.concat(newPlaylist) }
      });
    }
  }

  render() {
    return (
      <Query query={GET_CURRENT_USER_ID}>
        {({data}) => {
          const userId = data.userId
          return(
            <Mutation mutation={NEW_PLAYLIST}
              update={(cache, data) => this.updateCache(cache, data)}
              onCompleted={this.props.closeModal}
            >
              {(newPlaylist, { data }) => {
                return (
                  <div className="modal-background">
                    <div className="modal-child create-playlist-center">
                      <form onSubmit={e => this.handleSubmit(e, newPlaylist, userId)} className="modal-child">
                        <div onClick={this.props.closeModal} 
                          className="playlist-form-center"
                        >
                          <i class="fas fa-times"></i>
                        </div>
                        <div className="playlist-form-center create-playlist-title">Create new playlist</div>
                        <div className="create-playlist-grey">
                          <div className="playlist-name">Playlist Name</div>
                          <input 
                            className="playlist-input"
                            placeholder="New Playlist" 
                            onChange={e => this.setState({name: e.target.value})}
                            value={this.state.name}  
                          />
                        </div>
                        <div className="create-playlist-buttons">
                          <div className="form-cancel" onClick={this.props.closeModal}>CANCEL</div>
                          <button type="submit" className="form-create">CREATE</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default PlaylistForm;