import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { VoteProvider } from './contexts/voted';
import { UserProvider } from './contexts/user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <VoteProvider><UserProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </UserProvider></VoteProvider>
);