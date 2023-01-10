import logo from './logo.svg';
import './App.css';
function Header(){
  return(
    <div>
      <header>
        <h1>REACT</h1>
      </header>
    </div>
  );
}
function App() {
  return (
    <div>
      <Header></Header>
      <Header></Header>
      <Header></Header>
    </div>
  );
}

export default App;
