import React from 'react';
import "@fontsource/montserrat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExpenseTable from './pages/ExpenseTable';



function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/expense" element={<ExpenseTable/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;