import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './pages/styles.css'

import Index from '/src/pages/Index.jsx'
import RandomQuote from '/src/pages/randomQuote.jsx'
import MarkDownPreviewer from '/src/pages/markDownPreviewer.jsx'
import DrumMachine from '/src/pages/drumMachine.jsx'
import JsCalculator from '/src/pages/jsCalculator.jsx'
import Clock255 from '/src/pages/clock255.jsx'
import Error from '/src/pages/error.jsx'

const routerVar = createBrowserRouter([
  { path: '/', element: <Index />, errorElement: <Error /> },
  { path: '/randomquote', element: <RandomQuote />, errorElement: <Error /> },
  { path: '/markdownpreviewer', element: <MarkDownPreviewer />, errorElement: <Error /> },
  { path: '/drummachine', element: <DrumMachine />, errorElement: <Error /> },
  { path: '/jscalculator', element: <JsCalculator />, errorElement: <Error /> },
  { path: '/clock255', element: <Clock255 />, errorElement: <Error /> }
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routerVar} />
)
