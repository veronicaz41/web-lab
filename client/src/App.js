

import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Play from './components/pages/Play';
import HomePage from './components/pages/Homepage';

export function App() {
  
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route
          exact={true}
          path="/"
          element={<HomePage />}
        />

        <Route
          exact={true}
          path="/player1"
          element={<Play player={1}/>}
        />

        <Route
          exact={true}
          path="/player2"
          element={<Play player={2}/>}
        />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

console.log()