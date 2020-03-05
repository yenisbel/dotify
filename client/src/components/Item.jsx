import React from 'react';
import { Link } from 'react-router-dom';
// import Queries from "../graphql/queries";
import "../assets/stylesheets/item.css";
import "../assets/stylesheets/feed.css";
 
class Item extends React.Component {
 constructor(props){
   super(props)
 }
 
 render(){
   const{ album, _id} = this.props.album;
   console.log(_id)
   console.log(this.props.album)
    
   return(
     <Link to={`/albums/${_id}`}>
       { album }
       <div className="music-card">
         <div className="music-card-details">
           <img className='tile' src={this.props.album.url} />
           <span className='mc-name'>{this.props.album.name}</span>
           <br/>
           <span className='mc-owner'>{this.props.album.artist.name}</span>
         </div>
         <div className="play-icon">
           <i className="fas fa-play"></i>
         </div>
       </div>
     </Link>
   )
 }
}
 
export default Item;