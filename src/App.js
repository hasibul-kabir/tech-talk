import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Message from './Components/Pages/Message';
import ResetPass from './Components/ResetPass';
import Notification from './Components/Pages/Notification';
import Settings from './Components/Pages/Settings';
import { useSelector } from 'react-redux';
import NotFound from './Components/Pages/NotFound';

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
            <Route path='/notification' element={<Notification />} ></Route>
            <Route path='/settings' element={<Settings />} ></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
