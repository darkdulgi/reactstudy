import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return <header>
    <h1><a href='null' onClick={event => {
      event.preventDefault();
      props.MyEvent();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const arr = [];
  for (let i = 0; i < props.arr.length; i++) {
    let t = props.arr[i];
    arr.push(<li key={t.id}><a id={t.id} href='null' onClick={event => {
      event.preventDefault();
      props.MyEvent(event.target.id);
    }}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {arr}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const [mode, setMode] = useState('HELLO');
  const [id, setId] = useState(null);
  let content;
  const topics = [
    { id: 0, title: 'RUGAY', body: "YES I'M GAY" },
    { id: 1, title: 'URGAY', body: "NO U" },
    { id: 2, title: 'WHO IS LMFAO', body: "LMFAO THE CHINESE HACKER" }
  ]

  if (mode === 'HELLO') content = <Article title='Hello' body='Click links'></Article>
  else if (mode === 'READ') content = <Article title={topics[id].title} body={topics[id].body}></Article>

  return <div>
    <Header title='React' MyEvent={() => { setMode('HELLO') }}></Header>
    <Nav arr={topics} MyEvent={_id => {
      setMode('READ');
      setId(_id)
    }}></Nav>
    {content}
  </div>
}

export default App;