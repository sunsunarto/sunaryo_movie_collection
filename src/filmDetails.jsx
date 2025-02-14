import React from 'react';
import './filmDetails.css';

const FilmDetails = ({ isOpen, movie, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {movie && (
          <div>
            <img src={movie['#IMG_POSTER']} alt={movie['#TITLE']} />
            <h1>{movie['#TITLE']}</h1>
            <div className='info'>
              <p>Release Date: {movie['#YEAR']}</p>
              <p>Rank: {movie['#RANK']}</p>
              <p>{movie['#AKA']}</p>
            </div>
            <p className='cast'>actors: {movie['#ACTORS']}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmDetails;
