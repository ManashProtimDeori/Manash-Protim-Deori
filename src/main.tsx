import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './premium-system.css';
import './kinetic-editorial.css';
import './home-dimensional-cards.css';
import './home-motion-wall.css';
import './home-card-palette.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
