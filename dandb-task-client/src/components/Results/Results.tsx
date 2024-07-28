import React, { useEffect } from 'react';
import './Results.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchResults } from '../../redux/querySlice';
import { highlightSearchTerm } from '../utils/highlightSearchTerm';

const Results: React.FC = () => {
  const results = useSelector((state: RootState) => state.query.results);
  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentQuery) {
      dispatch(fetchResults(currentQuery) as any);
    }
  }, [currentQuery, dispatch]);

  return (
    <div className="results">
      {results.length === 0 && <p>No results found.</p>}
      {results.map((result, index) => (
        <div className="result-item" key={index}>
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {highlightSearchTerm(result.title, currentQuery)}
          </a>
          <p>{highlightSearchTerm(result.snippet, currentQuery)}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
