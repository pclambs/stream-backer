import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css'

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import Video from './pages/Video.jsx'
// import Upload from './pages/Upload.jsx'
import Account from './pages/Account.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },  {
        path: '/profiles/:profileId',
        element: <Profile />
      }, {
        path: '/video/:videoPostId',
        element: <Video />
      }, {
        path: '/upload',
        // element: <Upload />
      }, {
        path: '/account',
        element: <Account />
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
