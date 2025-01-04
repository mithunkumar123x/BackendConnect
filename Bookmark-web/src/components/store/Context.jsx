import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = React.createContext();

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [formData, setFormData] = useState({ title: '', url: '' });

  const Url = 'https://crudcrud.com/api/102090af021c4da98d9420c5b85407be';

  const fetchBookmarks = async () => {
    const response = await fetch(`${Url}/bookmarks`);
    const data = await response.json();
    setBookmarks(data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const addBookmark = async () => {
    const response = await fetch(`${Url}/bookmarks`, {
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
    const response = await fetch(`${Url}/bookmarks/${editingBookmark.id}`, {
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
    if(!id) {
      console.error('Bookmark Id is undefined');
      return;
    }
    try {
      const response = await fetch(`${Url}/bookmarks/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchBookmarks();
        setFormData( { title : '' , url : ''} )
      } else {
        console.error('Failed to delete bookmark:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
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
