import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/bookService';
import '../styles/addBook.css';
import { Toaster, toast } from 'react-hot-toast';

const AddBook = ({ setBooks, onClose, bookToEdit = null }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setImage(bookToEdit.image)
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setDescription(bookToEdit.description);
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Saving...', {
      style: { borderRadius: '100px', background: '#2a2a2a', color: '#efefef' },
    });

    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('description', description);

      if (bookToEdit) {
        const data = await updateBook(bookToEdit._id, formData);
        setBooks((prev) =>
          prev.map((book) =>
            book._id === bookToEdit._id ? data.book : book
          )
        );
      } else {
        const data = await createBook(formData);
        setBooks((prev) => [...prev, data.savedBook]);
      }

      setImage(null)
      setTitle('');
      setAuthor('');
      setDescription('');
      
      toast.success('Book saved!', {
        id: loadingToast,
        style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
      });

      setTimeout(()=>{
        onClose();
      }, 2000)
    } catch (err) {
      toast.error('Failed to save book. Please try again.', {
        id: loadingToast,
        style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
      });
    }
  };

  return (
    <>
      <Toaster position="top-center"/>
      <div className="addBookModal">
        <div className="addBookModal_container">
          <h3 style={{ textAlign: "center" }} >{bookToEdit ? "Update Book" : "Add New Book"}</h3>
          <form onSubmit={handleSubmit} className='addBookModal_fields'>
            {
              !bookToEdit && (
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!bookToEdit}
                  className='addBookModal_inputImage'
                />
              )
            }
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='addBookModal_input'
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className='addBookModal_input'
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className='addBookModal_input'
            />
            <div className='addBookModal_buttons' >
              <button className='addBookModal_add' type="submit">{bookToEdit ? "Update Book" : "Add Book"}</button>
              <button className='addBookModal_close' type="button" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
