import React from 'react';
import '../App.css';
import { CopyPlus, Heart, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onAddBook, onToggleFavourites }) => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        Cookies.remove("token");
        navigate("/");
    };

  return (
    <div className='navbar' >
        <CopyPlus 
          onClick={onAddBook}
          strokeWidth={1.5} 
          size={18} 
          className='navbar_botton' 
        />
        <Heart
          onClick={onToggleFavourites}
          strokeWidth={1.5}
          size={18}
          className='navbar_botton'
        />
        <LogOut 
          onClick={() => handleLogOut()} 
          strokeWidth={1.5}
          size={18} 
          className='navbar_botton' 
        />
    </div>
  )
}

export default Navbar;
