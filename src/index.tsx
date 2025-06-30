import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrivyProviders } from '@/components/Providers/PrivyProviders';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProviders>
      <App />
    </PrivyProviders>
  </React.StrictMode>
);