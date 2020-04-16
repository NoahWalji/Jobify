import React from 'react';
import BigName from './components/BigName'
import JobPosts from './components/JobPosts'

function App() {
  return (
    <div className="App">
      <div className="container">
        <BigName/>
        <JobPosts/>
      </div>
    </div>
  );
}

export default App;
