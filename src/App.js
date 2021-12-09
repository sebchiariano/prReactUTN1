import './App.css';

import {
  BrowserRouter as Router,
} from "react-router-dom"

import Public from './Routes/Public'

import AuthProvider from './Context/AuthProvider';


function App() {
  return (
    <div className='page'>
      <AuthProvider>

          <Router>

            <Public />

          </Router>

      </AuthProvider>
    </div>
  );
}

export default App;
