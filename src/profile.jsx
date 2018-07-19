import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render () {
    console.log('profile.props', this.props);
    let artist = {
      name: '',
      followers: {total: ''},
      genres: [],
      images: [{url: ''}]
    };

{/* if statement using ES5
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
*/}
{/* if statement using ES6 */}
    artist = this.props.artist !== null
                                ? this.props.artist
                                : artist;

      return (
        <div className="profile">
          <img
            alt="Profile"
            className="profile-img"
            src={artist.images[0].url}
          />
          <div className='profile-info'>
            <div className='profile-name'>{artist.name}</div>
            <div className='profile-followers'>{artist.followers.total}</div>
            <div className='profile-genres'>
              {
                artist.genres.map((genre, k) => {
                  genre = genre !== artist.genres[artist.genres.length-1]
                                ? `${genre},`
                                : `${genre} `
                  return (
                    <span key={k}> {genre}</span>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
  }
}

export default Profile;
