import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './pages/styles.css'

import Index from './pages/Index.jsx'
import RandomQuote from './pages/randomQuote.jsx'
import MarkDownPreviewer from './pages/markDownPreviewer.jsx'
import DrumMachine from './pages/drumMachine.jsx'
import JsCalculator from './pages/jsCalculator.jsx'
import Error from './pages/error.jsx'

const routerVar = createBrowserRouter([
  { path: '/', element: <Index />, errorElement: <Error /> },
  { path: '/randomquote', element: <RandomQuote />, errorElement: <Error /> },
  { path: '/markdownpreviewer', element: <MarkDownPreviewer />, errorElement: <Error /> },
  { path: '/drummachine', element: <DrumMachine />, errorElement: <Error /> },
  { path: '/jscalculator', element: <JsCalculator />, errorElement: <Error /> }
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routerVar} />
)
