import React from 'react';

const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!text || !searchTerm) return { highlightedText: text, count: 0 };

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  const highlightedText = parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
  );

  const count = parts.filter(part => part.toLowerCase() === searchTerm.toLowerCase()).length;
  return { highlightedText, count };
};

export default highlightSearchTerm;
