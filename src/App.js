import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/navbar';


function App() {

  return (
    <div className="App">
    	<BrowserRouter>    
      		<NavBar />
      	</BrowserRouter>	
    </div>
  );
}

export default App;
