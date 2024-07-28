import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentQuery, addQuery, fetchResults } from '../../redux/querySlice';
import { AppDispatch } from '../../redux/store';
import './SearchForm.css';

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (query.trim() === '') return; // Validation: don't search if query is empty
    dispatch(setCurrentQuery(query));
    dispatch(addQuery(query));
    dispatch(fetchResults(query));
    setQuery('');
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button className="search-button" onClick={handleSearch}>
        Find
      </button>
    </div>
  );
};

export default SearchForm;
