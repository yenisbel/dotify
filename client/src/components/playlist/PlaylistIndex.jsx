import React from "react";
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import Queries from "../../graphql/queries";
import "../../assets/stylesheets/playlistIndex.css";
const { FETCH_PLAYLISTS } = Queries;

const PlaylistIndex = ({props}) => {
  return (
    <Query query={FETCH_PLAYLISTS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        return (
          <div className="user-playlists">
            {data.playlists.map(playlist => 
              props.history.location.pathname.slice(10, 34) === playlist._id ? (
                <li key={playlist._id} className="user-playlist-li-selected">
                  <Link to={`/playlist/${playlist._id}`}>
                    <p>{playlist.name}</p>
                  </Link>
                </li>
              ) : (
                <li key={playlist._id} className="user-playlist-li">
                  <Link to={`/playlist/${playlist._id}`}>
                    <p>{playlist.name}</p>
                  </Link>
                </li>
              )
            )}
          </div>
        )
      }}
    </Query>
  );
}

export default PlaylistIndex;