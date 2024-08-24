// src/context/BookmarkContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [formData, setFormData] = useState({ title: '', url: '' });

  useEffect(() => {
  
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const response = await fetch('https://crudcrud.com/api/786aba94236a49acbf62dc7de66d7e46/bookmarks'); 
    const data = await response.json();
    setBookmarks(data);
  };

  const addBookmark = async () => {
    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchBookmarks();
    setIsModalOpen(false);
  };

  const updateBookmark = async () => {
    await fetch(`https://crudcrud.com/api/786aba94236a49acbf62dc7de66d7e46/bookmarks/${editingBookmark.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchBookmarks();
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
    setEditingBookmark(null);
    setFormData({ title: '', url: '' });
  };

  const handleEdit = (bookmark) => {
    setIsModalOpen(true);
    setEditingBookmark(bookmark);
    setFormData({ title: bookmark.title, url: bookmark.url });
  };

  const value = {
    bookmarks,
    isModalOpen,
    editingBookmark,
    formData,
    setFormData,
    handleAddNew,
    handleEdit,
    addBookmark,
    updateBookmark,
    setIsModalOpen,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
