import React from "react";
import "../../assets/stylesheets/modal.css"
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { NEW_PLAYLIST } = Mutations;
const { GET_CURRENT_USER_ID } = Queries;

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

  render() {
    return (
      <Query query={GET_CURRENT_USER_ID}>
        {({data}) => {
          const userId = data.userId
          return(
            <Mutation mutation={NEW_PLAYLIST}>
              {(newPlaylist, { data }) => {
                return (
                  <div className="modal-background">
                    <div className="modal-child create-playlist-center">
                      <form onSubmit={e => this.handleSubmit(e, newPlaylist, userId)} className="modal-child">
                        <div>X</div>
                        <div className="modal-no-close">Create New Playlist</div>
                        <div className="modal-no-close create-playlist-grey">
                          <div className="modal-no-close">Playlist Name</div>
                          <input placeholder="New Playlist" className="modal-no-close" />
                        </div>
                        <div className="modal-no-close create-playlist-buttons">
                          <div>CANCEL</div>
                          <button type="submit">CREATE</button>
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