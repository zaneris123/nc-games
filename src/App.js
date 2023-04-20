import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx'
import Login from './components/Login';
import AllReviews from './components/AllReviews';
import SingleReview from './components/SingleReview';
import { useContext } from 'react';
import { UserContext } from './contexts/user';

function App() {
  const { username, setUsername } = useContext(UserContext)
  return (
    <div className="App">
      {username === null ? (<Login/>):(<div><Header/>
      <Routes>
        <Route path="/reviews" element={<AllReviews/>}/>
        <Route path="/reviews/id/:reviewID" element={<SingleReview/>}/>
      </Routes></div>)
      }
      
    </div>
  );
}

export default App;
