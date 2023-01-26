import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './main/Main'
import Test from './main/Test'
import Error from './main/Error'

const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;