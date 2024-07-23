// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
// https://compile7.org/decompile/how-to-fix-react-router-url-issues-during-manual-entry-or-page-refresh/
// https://v5.reactrouter.com/web/api/HashRouter/hashtype-string

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, RouterProvider, Route, Routes, createBrowserRouter } from 'react-router-dom'

import Index from '/src/pages/Index.jsx'
import RandomQuote from '/src/pages/randomQuote.jsx'
import MarkDownPreviewer from '/src/pages/markDownPreviewer.jsx'
import DrumMachine from '/src/pages/drumMachine.jsx'
import JsCalculator from '/src/pages/jsCalculator.jsx'
import Clock255 from '/src/pages/clock255.jsx'
import Error from '/src/pages/error.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='randomquote' element={<RandomQuote />} />
      <Route path='markdownpreviewer' element={<MarkDownPreviewer />} />
      <Route path='drummachine' element={<DrumMachine />} />
      <Route path='jscalculator' element={<JsCalculator />} />
      <Route path='clock255' element={<Clock255 />} />
    </Routes>
  </HashRouter>
)