import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import FilmDetails from './filmDetails.jsx'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('Dectetive conan')
  const [filter, setFilter] = useState([])
  const [detail, setDetail] = useState(null)
  const [open, setOpen] = useState(false)

  const getfilm = async () => {
    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the movies.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      const responses = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${search}`)
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

  const handleInputChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchClick = () => {
    getfilm()
  }

  useEffect(() => {
    getfilm()
  }, [])

  const openModal = (movie) => {
    setOpen(true);
    setDetail(movie);
  }

  const closeModal = () => {
    setOpen(false);
    setDetail(null);
  }

  return (
    <div className='app'>
      <div className="header">
        <h1 className='title'>Movie Collection</h1>
        <input value={search} type='text' placeholder='search' onChange={handleInputChange}/>
        <button onClick={handleSearchClick}>Search</button>
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
            <button onClick={() => openModal(movies)}>More Info</button>
            <p className='cast'>cast:<br/>{movies['#ACTORS']}</p>
          </div>
          )
        })}
      </div>
      <FilmDetails isOpen={open} movie={detail} onClose={closeModal} />
    </div>
  )
}

export default App

