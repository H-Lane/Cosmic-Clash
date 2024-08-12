import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './src/pages/Login.jsx';
import Signup from './src/pages/SignUp.jsx';
import Home from './src/pages/Home.jsx'
import Error from './src/pages/Error.jsx'

const router = createBrowserRouter([
    {
        path: '/', 
        element: <App />, 
        error: <Error />, 
        children: [
            {
                index: true, 
                element: <Home />, 
            }, {
                path: '/login', 
                element: <Login />, 
            }, {
                path: '/signup', 
                element: <Signup />, 
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
