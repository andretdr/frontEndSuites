import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './pages/styles.css'

import Index from './pages/Index.jsx'
import RandomQuote from './pages/randomQuote.jsx'
import Error from './pages/error.jsx'

const routerVar = createBrowserRouter([
  { path: '/', element: <Index />, errorElement: <Error /> },
  { path: '/randomquote', element: <RandomQuote />, errorElement: <Error /> }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routerVar} />

)
