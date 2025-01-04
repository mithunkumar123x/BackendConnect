import React from 'react';

const Bookmark = ({ bookmark, onEdit, onDelete }) => (
  <div>
    <h2>{bookmark.title}- 
    <a href={bookmark.url}
    >{bookmark.url} 
    </a> </h2>
      <button onClick={() => onEdit(bookmark)}>Edit</button>
      <button onClick={() => onDelete(bookmark._id)}>Delete</button>
  
  </div>
);

export default Bookmark;
