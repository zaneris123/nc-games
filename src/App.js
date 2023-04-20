import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx'
import { useState } from 'react';
import Login from './components/Login';
import AllReviews from './components/AllReviews';
import SingleReview from './components/SingleReview';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUserName] = useState("A USER")

  return !isLoggedIn ? (<Login/>):(
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/reviews" element={<AllReviews/>}/>
        <Route path="/reviews/id/:reviewID" element={<SingleReview/>}/>
      </Routes>
    </div>
  );
}

export default App;
