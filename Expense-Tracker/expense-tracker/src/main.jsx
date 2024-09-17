import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import store from './components/store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
     <App />
  </BrowserRouter>
  </Provider>
);
