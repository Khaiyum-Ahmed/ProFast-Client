import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

import { RouterProvider } from "react-router/dom";
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';


AOS.init();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
