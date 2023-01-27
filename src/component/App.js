import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main'
import Test from './Test'
import Error from './Error'

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