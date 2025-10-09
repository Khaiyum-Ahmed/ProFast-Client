import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router/dom";
import { router } from './routes/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#EAECED] pt-8 Font-urbanist'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
