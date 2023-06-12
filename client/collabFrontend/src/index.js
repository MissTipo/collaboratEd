import { createRoot } from 'react-dom/client';
import App from './App';
import ContextProvider from './context/contextProvider';

createRoot(document.getElementById('root')).render(<ContextProvider><App /></ContextProvider> );