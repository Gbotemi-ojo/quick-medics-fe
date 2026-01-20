import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Your specific Client ID
const GOOGLE_CLIENT_ID = "547022261470-is1g3mp9mh07ti4ph9uaal2ucn4vu23s.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
         <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);