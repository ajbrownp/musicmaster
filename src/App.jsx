import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: [],
    }
  }


  search() {
    if(this.state.query === ""){
      console.log('Please enter a value');
    }
    else{
      // console.log('this.state', this.state);
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      // const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';  ***ES5 *****
      let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;  {/* ES6 templating */}
      // console.log('FETCH_URL', FETCH_URL);
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
      let accessToken = 'BQCIv4GjAWfMbvxdfMa6YpmNbTRN__Wv1eRBXbU2UenflfUL08JWlNIC4v3oo6SrIksk6RqKeOeKMQXdZbYs3Kw0llJGeTFiEaQ6MpS74diC-s7KxhGEQyZAJR_neMQ1b_PMrn9SHorPE94X6qpwHugTaHS3HyeZbYVS58Us1qfQMJLGpA';

      // let myHeaders = new Headers();

      {/* handle the web request in js code */}
      fetch(FETCH_URL, {
        method: 'GET',
        headers:  {
          'Authorization': 'Bearer ' + accessToken
       },
        mode: 'cors',
        cache: 'default'
      })
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(json => {
          const artist = json.artists.items[0];
          // console.log('artist', artist);
          this.setState({artist});
         {/* fetch url to get artist top tracks base on API documentation*/}
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
          fetch(FETCH_URL, {
            method: 'GET',
            headers:  {
              'Authorization': 'Bearer ' + accessToken
           },
            mode: 'cors',
            cache: 'default'
          })
          .then(response => response.json())
          .then(json => {
            // console.log('artist\'s top tracks:', json);
            // const tracks = json.tracks;
            {/* we can do it with ES6 like this */}
            const { tracks } = json;
            this.setState({tracks});
          })
       });
      }
  }

  render(){
    return (
      <div className="app">
         <div className="app-tittle"> Music Master</div>

         <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search an artist ..."
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress= {event => {
                  if (event.key === 'Enter') {
                    this.search();
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
         </FormGroup>

       {/*show profile only when we have an artists*/}
         {
           this.state.artist !== null
           //if
           ?
            <div>
              <Profile
                 artist={this.state.artist}
              />
              <div className='profile-name'>Overview of {this.state.artist.name}'s music </div>
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
            //else
            : <div></div>
         }
      </div>
    )
  }
}

export default App;
