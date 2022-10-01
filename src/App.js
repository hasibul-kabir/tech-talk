import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Message from './Components/Pages/Message';
import ResetPass from './Components/ResetPass';
import { useSelector } from 'react-redux';

function App() {
  const dMode = useSelector((state) => state.dmode.value);
  return (
    <div className="App">
      <div className={dMode && "darkmode"}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} ></Route>
            <Route path='/registration' element={<Registration />} ></Route>
            <Route path='/home' element={<Home />} ></Route>
            <Route path='/message' element={<Message />} ></Route>
            <Route path='/resetpass' element={<ResetPass />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
