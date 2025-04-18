import React, { useState, useEffect } from "react";
import "../styles/auth.css";
import { loginUser, registerUser } from "../services/authService";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Auth = () => {

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        Cookies.set("token", data.token, { expires: 7, secure: true });
        navigate('/home');
      } else {
        await registerUser(formData.name, formData.email, formData.password);
        toast.success(`Register Successfully!`, {
          style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
        });
        setFormData({ name: "", email: "", password: "" });
        setIsLogin(true)
      }
    } catch (err) {
      toast.error(err.data.message, {
        style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Toaster position="top-center"/>
    <div className='authModal'>
      <div className="auhModal_top" >
        <p className="auhModal_head">Boookes</p>
        <p className="auhModal_subhead">Ease your book collection</p>
      </div>
      <div className='authModal_container'>
        {error && <p style={{ color: "#FF0000" }}>{error}</p>}
        <form onSubmit={handleSubmit} className='form_authModal'>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className='input_authModal'
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className='input_authModal'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className='input_authModal'
          required
        />

        <button
            type="submit"
            className='submit_authModal'
            disabled={loading}
        >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
        </form>
        <p className='alternate_authModal' onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
    </>
  );
};

export default Auth;