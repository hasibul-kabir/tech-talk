import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Message from './Components/Pages/Message';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} ></Route>
          <Route path='/registration' element={<Registration />} ></Route>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/message' element={<Message />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
