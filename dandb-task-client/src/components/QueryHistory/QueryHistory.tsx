import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchHistory, setCurrentQuery, fetchResults } from '../../redux/querySlice';
import './QueryHistory.css';

const QueryHistory: React.FC = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.query.history);
  const results = useSelector((state: RootState) => state.query.results);

  useEffect(() => {
    dispatch(fetchHistory() as any);
  }, [dispatch]);

  const handleQueryClick = (query: string) => {
    dispatch(setCurrentQuery(query));
    dispatch(fetchResults(query) as any);
  };

  const calculateAppearances = (query: string) => {
    return results.reduce((count, result) => {
      if (!result.title || !result.snippet) return count;

      const titleMatches = (result.title.match(new RegExp(query, 'gi')) || []).length;
      const snippetMatches = (result.snippet.match(new RegExp(query, 'gi')) || []).length;
      return count + titleMatches + snippetMatches;
    }, 0);
  };

  return (
    <div className="query-history">
      {history.slice().reverse().map((query, index) => (
        <div
          key={index}
          className="query-item"
          onClick={() => handleQueryClick(query)}
        >
          {query} (Appearances: {calculateAppearances(query)})
        </div>
      ))}
    </div>
  );
};

export default QueryHistory;
