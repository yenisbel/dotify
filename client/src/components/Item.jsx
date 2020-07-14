import React from 'react';
import { Link } from 'react-router-dom';
// import Queries from "../graphql/queries";
import "../assets/stylesheets/item.css";
import "../assets/stylesheets/feed.css";
import { ApolloConsumer } from 'react-apollo';
 
class Item extends React.Component {
 constructor(props){
   super(props)
 }

 handlePlay(client){
   client.writeData({
     data: {
       currentAlbum: this.props.album,
       currentSong: this.props.album.songs[0]
       }
   });
   
 }
 
 render(){
   const{ album, _id} = this.props.album;
  //  console.log(_id)
  //  console.log(this.props.album)
   return(
    <ApolloConsumer>
      {(client) => {
         return (
          <div>
            <div className="music-card">
              {/* <div className="music-card-details"></div> */}
                <Link to={`/album/${_id}`}>
                  {album}
                {/* <div className="music-card">
                  <div className="music-card-details"> */}
                      <img className='tile' src={this.props.album.url} />
                      <span className='mc-name'>{this.props.album.name}</span>
                      <br />
                      <span className='mc-owner'>{this.props.album.artist.name}</span>
                    {/* </div>
                  </div> */}
                </Link>
              {/* </div> */}
              <div onClick={() => this.handlePlay(client)} className="play-icon">
                <i className="fas fa-play"></i>
              </div>
            </div>
            
          </div>
          )
      }}
     
     </ApolloConsumer>
   )
 }
}
 
export default Item;