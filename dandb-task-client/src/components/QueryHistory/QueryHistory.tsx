import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchHistory, setCurrentQuery, fetchResults } from '../../redux/querySlice';
import './QueryHistory.css';

const QueryHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.query.history);
  const results = useSelector((state: RootState) => state.query.results);

  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleQueryClick = (query: string) => {
    dispatch(setCurrentQuery(query));
    dispatch(fetchResults(query));
  };

 
  const calculateAppearances = (query: string) => {
    if (!results || results.length === 0) return 0;

    const regex = new RegExp(query, 'gi');
    return results.reduce((count, result) => {
      if (!result.title || !result.snippet) return count;

      const titleMatches = (result.title.match(regex) || []).length;
      const snippetMatches = (result.snippet.match(regex) || []).length;
      return count + titleMatches + snippetMatches;
    }, 0);
  };

  return (
    <div className="query-history">
      <h2>Search History</h2>
      <ul>
        {history.slice().reverse().map((query, index) => (
          <li key={index} className="history-item" onClick={() => handleQueryClick(query)}>
            <span className="history-query">{query}</span>
            <span className="history-appearances">
              ({calculateAppearances(query)} Appearances)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;