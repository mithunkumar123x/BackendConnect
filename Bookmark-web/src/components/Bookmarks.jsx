import React from 'react';
import Bookmark from '../components/Bookmark';
import Modal from '../components/Modal';
import { useBookmarks } from './store/BookmarkContext';

const Bookmarks = () => {
  const {
    bookmarks,
    isModalOpen,
    formData,
    setFormData,
    handleAddNew,
    handleEdit,
    addBookmark,
    updateBookmark,
    editingBookmark,
    setIsModalOpen,
  }     = useBookmarks();

  const handleSave = () => {
    if (editingBookmark) {
      updateBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <div>
      <header>
        <h1>Bookmarks</h1>
        <button onClick={handleAddNew}>Add New</button>
      </header>
      <div className="bookmarks-list">
        {bookmarks.map((bookmark) => (
          <Bookmark key={bookmark.id} bookmark={bookmark} onEdit={handleEdit} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</h2>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <button type="button" onClick={handleSave}>
            {editingBookmark ? 'Update' : 'Add'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Bookmarks;
