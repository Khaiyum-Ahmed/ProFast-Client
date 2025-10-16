import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

import { RouterProvider } from "react-router/dom";
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

AOS.init();
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
