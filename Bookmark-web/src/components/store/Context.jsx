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

  const fetchBookmarks = async () => {
    const response = await fetch('https://crudcrud.com/api/3e9c995804f6419f85e6472b5a881d87/bookmarks');
    const data = await response.json();
    setBookmarks(data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const addBookmark = async () => {
    const response = await fetch('https://crudcrud.com/api/3e9c995804f6419f85e6472b5a881d87/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchBookmarks();
      setIsModalOpen(false);
      setFormData({ title: '', url: '' });
    } else {
      console.error('Failed to add bookmark:', response.statusText);
    }
  };

  const updateBookmark = async () => {
    const response = await fetch(`https://crudcrud.com/api/3e9c995804f6419f85e6472b5a881d87/bookmarks/${editingBookmark.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchBookmarks();
      setIsModalOpen(false);
      setEditingBookmark(null);
      setFormData({ title: '', url: '' });
    } else {
      console.error('Failed to update bookmark:', response.statusText);
    }
  };

  const deleteBookmark = async (id) => {
    const response = await fetch(`https://crudcrud.com/api/3e9c995804f6419f85e6472b5a881d87/bookmarks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchBookmarks();
    } else {
      console.error('Failed to delete bookmark:', response.statusText);
      // Handle the error gracefully, e.g., display a message to the user
    }
   throw new error;
    console.error('Error deleting bookmark:', error);
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
    deleteBookmark, 
    setIsModalOpen,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
