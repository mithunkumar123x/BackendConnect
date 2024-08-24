import React from 'react';

const Bookmark = ({ bookmark, onEdit, onDelete }) => (
  <div className="bookmark-item">
    <h3>{bookmark.title}</h3>
    <p>{bookmark.url}</p>
    <div className="bookmark-actions">
      <button onClick={() => onEdit(bookmark)}>Edit</button>
      <button onClick={() => onDelete(bookmark.id)}>Close</button>
    </div>
  </div>
);

export default Bookmark;