import React from 'react';

export const highlightSearchTerm = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  if (!text) return undefined;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};
