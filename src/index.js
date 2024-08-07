import './components/api/setupAxios';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);