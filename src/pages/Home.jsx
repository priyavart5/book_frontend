import React, { useState, useEffect } from 'react';
import "../styles/homepage.css"
import { getAllBooks } from '../services/bookService';
import AddBook from '../components/AddBook';
import Navbar from '../components/Navbar';
import { Heart, Trash, Pencil } from 'lucide-react';
import { deleteBook, favourite } from '../services/bookService';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const Home = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [showAddBook, setShowAddBook] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [showFavouritesFirst, setShowFavouritesFirst] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data.allBooks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleToggleFavouritesView = () => {
    setShowFavouritesFirst((prev) => !prev);
  };

  return (
    <>
      <Toaster position="top-center"/>
      <div className='home_page' >
        <h2 className='home_page_heading' >Explore Your<br/>Boookes Collection 📚</h2>
        <div className='home_page_allBooks'>
          {loading ? (
            <p className='gome_page_fallBack_UI'>Loading...</p>
          ) : books.length > 0 ? (
            [...books]
              .sort((a, b) => {
                if (showFavouritesFirst) {
                  return b.favourite - a.favourite;
                }
                return 0;
              })
              .map((item, index) => (
                <div className='home_page_book' key={index}>
                  <img
                    className='home_page_book_image'
                    src={`${process.env.REACT_APP_SERVER}/${item.image}`}
                    alt={item.title}
                    width="100"
                  />
                  <h3 className='home_page_book_title'>{item.title}</h3>
                  <h5 className='home_page_book_author'>by: {item.author}</h5>
                  <h5 className='home_page_book_description'>{item.description}</h5>

                  <div className='home_page_book_buttons'>
                    <Heart
                      className='hp_book_favourite'
                      onClick={async () => {
                        const loadingToast = toast.loading('Marking...', {
                          style: { borderRadius: '100px', background: '#2a2a2a', color: '#efefef' },
                        });
                        try {
                          await favourite(item._id);
                          setBooks(prev =>
                            prev.map(book =>
                              book._id === item._id ? { ...book, favourite: !book.favourite } : book
                            )
                          );

                          toast.success('Done!', {
                            id: loadingToast,
                            style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
                          });
                        } catch (error) {
                          toast.error('Failed to Mark Favourite. Please try again.', {
                            id: loadingToast,
                            style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
                          });
                        }
                      }}
                      color={item.favourite ? '#ff0000' : '#000000'}
                      size={16}
                    />
                    <Pencil
                      className='hp_book_edit'
                      onClick={() => {
                        setEditBook(item);
                        setShowAddBook(true);
                      }}
                      size={16}
                    />
                    <Trash
                      className='hp_book_delete'
                      onClick={async () => {
                        const loadingToast = toast.loading('Deleting...', {
                          style: { borderRadius: '100px', background: '#2a2a2a', color: '#efefef' },
                        });
                        try {
                          await deleteBook(item._id);
                          setBooks((prev) => prev.filter(book => book._id !== item._id));

                          toast.success('Deleted!', {
                            id: loadingToast,
                            style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
                          });
                        } catch (error) {
                          toast.error('Failed to Delete Book. Please try again.', {
                            id: loadingToast,
                            style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
                          });
                        }
                      }}
                      size={16}
                    />
                  </div>
                </div>
              ))
          ) : (
            <p className='gome_page_fallBack_UI'>Add Books into your collection</p>
          )}
        </div>


        {showAddBook && (
          <AddBook
            setBooks={setBooks}
            onClose={() => {
              setShowAddBook(false);
              setEditBook(null);
            }}
            bookToEdit={editBook}
          />
        )}

        <Navbar onAddBook={() => setShowAddBook(true)} onToggleFavourites={handleToggleFavouritesView} />


      </div>
    </>
  );
};

export default Home;
