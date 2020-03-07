import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_PLAYLISTS } = Queries;

const PlaylistIndex = () => {
  return (
    <Query query={FETCH_PLAYLISTS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        console.log(data)
        return (
          <div>
            {data.playlists.map(playlist => (
              <li key={playlist._id}>
                <p>{playlist.name}</p>
              </li>
            ))}
          </div>
        )
      }}
    </Query>
  );
}

export default PlaylistIndex;