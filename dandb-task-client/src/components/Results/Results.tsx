import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Results.css';

const Results: React.FC = () => {
  const results = useSelector((state: RootState) => state.query.results);
  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);
  
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const highlightSearchTerm = (text: string, term: string) => {
    if (!text) return { highlightedText: text, count: 0 };

    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    const count = (text.match(regex) || []).length;

    return {
      highlightedText: parts.map((part, index) =>
        regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
      ),
      count
    };
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={(e) => handleClick(e, number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="results-container">
      {currentResults.map((result, index) => (
        <div key={index} className="result-item">
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {highlightSearchTerm(result.title, currentQuery).highlightedText}
          </a>
          <p>{highlightSearchTerm(result.snippet, currentQuery).highlightedText}</p>
        </div>
      ))}
      {renderPagination()}
    </div>
  );
};

export default Results;
