import React from 'react';
import BigName from './components/BigName'
import SearchBar from './components/SearchBar'
import JobPosts from './components/JobPosts'

function App() {
  return (
    <div className="App">
      <div className="container">
        <BigName/>
        <SearchBar/>
        <JobPosts/>
      </div>
    </div>
  );
}

export default App;
