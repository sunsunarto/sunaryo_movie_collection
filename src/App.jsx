import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './App.css'

function App() {
  const[movies, setMovies] = useState([])
  const[search, setSearch] = useState('')
  const[filter, setFilter] = useState([])
  const getfilm = async () => {
    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the movies.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      const responses = await axios.get('https://imdb.iamidiotareyoutoo.com/search?q=Detective_Conan')
      setMovies(responses.data.description)
      setFilter(responses.data.description)
      Swal.close();
      Swal.fire('Success', 'Movies loaded successfully', 'success');
    } catch (error) {
      Swal.close();
      Swal.fire('Error', 'Failed to fetch movies. Please try again later.', 'error');
      console.log(error)
    }
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const filterFilm = () => {
    const filtered = movies.filter((movie) => 
      movie['#TITLE'].toLowerCase().includes(search.toLowerCase())
    )
    setFilter(filtered)
  }
  useEffect(() => {
    getfilm ()
  }, [])

  return (
    <div className='app'>
      <div className="header">
        <h1 className='title'>Movie Collection</h1>
        <input  value={search} type='text' placeholder='search' onChange={handleSearch}/>
        <button onClick={filterFilm}>search</button>
      </div>
      <div className='mapMovie'>
        {filter.map((movies) => {
          return (
          <div className ='movie' key={movies['#IMDB_ID']}>
            <img src={movies['#IMG_POSTER']}/>
            <h1>{movies['#TITLE']}</h1>
            <div className='info'>
              <p>{movies['#YEAR']}</p>
              <p>#{movies['#RANK']}</p>
            </div>
            <p className='cast'>cast:<br/>{movies['#ACTORS']}</p>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default App

