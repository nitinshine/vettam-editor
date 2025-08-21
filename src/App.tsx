import React from 'react';
import './App.css';
import EditorPage from './components/EditorPage';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Sidebar/> */}
      {/* <EditorPage/> */}

        <BrowserRouter>
 <div style={{ display: 'flex' }}>
   <Sidebar />
   <div style={{ flex: 1 }}>
     <Routes>
       <Route path="/editor" element={<EditorPage/>} />
       {/* Add other routes here */}
     </Routes>
   </div>
 </div>
  </BrowserRouter>
    </div>
    
  );
}

export default App;
