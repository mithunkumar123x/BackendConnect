import React from 'react';
import Bookmark from '../components/Bookmark';
import Modal from '../components/Modal';
import { useBookmarks } from './store/Context';

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
    deleteBookmark, 
  } = useBookmarks();

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
        <h1>ALL BOOKMARKS : </h1>
        {bookmarks.length === 0 || (
          bookmarks.map((bookmark) => (
            <Bookmark
              key={bookmark.id}
              bookmark={bookmark}
              onEdit={handleEdit}
              onDelete={deleteBookmark}
            />
          ))
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form>
          <label htmlFor="Title">Website Title :</label>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <label>Website URL :</label>
          <input
            type="text"
            placeholder="Website Url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <button type="button" onClick={handleSave}>
            ADD NOW
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            CLOSE
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Bookmarks;
