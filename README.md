# 📚 Book Management App – Frontend

This is the **frontend** for the Book Management App, built using **React**.

## 🚀 Features

- 📖 View list of all books
- ➕ Add new books to your collection
- ✏️ Edit existing book details
- ❌ Delete books from your collection
- ❤️ Mark/unmark books as favourites
- 🔐 Login/Register with authentication (integrated with the provided backend)

## 📦 Tech Stack

- React (with Create React App)
- Axios (for API requests)
- React Router (for routing)
- Custom styling

## 🛠️ Available Scripts

In the project directory, run:

### `npm install`

Install all dependencies.

### `npm start`

Runs the app in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.


## 🔗 API Integration

The frontend communicates with the backend hosted at:

```
http://localhost:5000/api OR https://book-backend-nr9r.onrender.com
```

Make sure the backend is running and accessible at this URL.

## 🔐 Authentication

- Auth backend is prebuilt and integrated.
- JWT token is stored in `cookies` and used for protected API routes.

## 📁 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Page components (Home, Login, Register)
├── services/          # API call functions
├── App.js             # App entry point
└── index.js           # ReactDOM render
```

## 🧪 Environment Variables

Create a `.env` file in the root with:

```
REACT_APP_SERVER=https://book-backend-nr9r.onrender.com
REACT_APP_SERVER=http://localhost:5001
```

## 📝 Contributing

Feel free to open issues or pull requests to improve the app.

---

**Happy coding! 💻**
