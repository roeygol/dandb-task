import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHistory } from './redux/querySlice';
import QueryHistory from './components/QueryHistory/QueryHistory';
import SearchForm from './components/SearchForm/SearchForm';
import Results from './components/Results/Results';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory() as any);
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="left-pane">
        <QueryHistory />
      </div>
      <div className="main-content">
        <SearchForm />
        <Results />
      </div>
    </div>
  );
};

export default App;
