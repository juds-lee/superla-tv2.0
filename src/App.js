// Styling
import './App.css';
// Modules
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
// Components
import TVResults from './Components/TVResults';
import Nav from './Components/Nav';
import Lists from './Components/Lists';

// Initial display on load of app
const Home = () => {
  // Setting states for the query, submit, and response from API
  const [showSearch, setShowSearch] = useState('');
  const [tvRes, setTVRes] = useState([]);
  const [handleSubmit, setHandleSubmit] = useState(false);
  const handleShowSearch = (e) => {
    e.preventDefault();
    setShowSearch(e.target[0].value);
    setHandleSubmit(true);
  }

// API call with the showSearch state as query
  useEffect(() => {
    axios({
      url: "https://api.tvmaze.com/search/shows",
      params: {
        q: showSearch
      }
    })
      .then((response) => {
        const tvResults = response.data
        setTVRes(tvResults);
        console.log(tvResults)
      })
      .catch(err => {
        alert(err, "Something went wrong!")
      });
  }, [showSearch])

  return (
    <>
      <h1>Superla-TV</h1>
      <form className="enterShow" onSubmit={handleShowSearch}>
        <label htmlFor='query'></label>
        <input
          type='text'
          id='query'
          className='query'
          placeholder='Search for a show!'
        />
        <button>Search</button>
      </form>
      <main className="tvResults">
        {handleSubmit ?
          <TVResults
            tvRes={tvRes}
            showSearch={showSearch}
          />
          :
          null
        }
      </main>
    </>
  )
}


const App = () => {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
      <footer>
        <p className='wrapper'>Built by <a href="https://www.rakesh-parmar.com/" target="_blank">Rakesh Parmar</a>, <a href="https://www.judslee.ca/" target="_blank">Judy Lee</a>, <a href="https://www.themeesh.ca/" target="_blank">Steve Mishos</a>, <a href="https://www.cristinacodes.com/" target="_blank">Cristina Grosser</a> at <a href='https://junocollege.com/' target='_blank'>Juno College</a></p>
      </footer>
    </div>
    </Router>
  );

}

export default App;