import React, { Component } from 'react';
import GifCard from './components/GIfCard';
import SearchField from './components/SearchField';
import { API_KEY } from './components/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [] // State to hold the GIFs
    };
  }

  // API call to fetch GIFs based on search term
  fetchGifs = async (searchTerm) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        this.setState({ gifs: data.data });
      } else {
        console.error('Invalid response:', data);
      }
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  render() {
    return (
      <div>
        <SearchField onSearch={this.fetchGifs} />
        {this.state.gifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>
    );
  }
}

export default App;