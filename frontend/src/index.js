import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Asegúrate de que la ruta al archivo sea correcta
import './App.css';       // Estilos asociados con el componente App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Este es el contenedor en index.html
);
