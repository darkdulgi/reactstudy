import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';

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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.MyCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' /></p>
      <p><textarea name='body' placeholder='article' /></p>
      <p><input type='submit' /></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('HELLO');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 0, title: 'RUGAY', body: "YES I'M GAY" },
    { id: 1, title: 'URGAY', body: "NO U" },
    { id: 2, title: 'WHO IS LMFAO', body: <ReactPlayer url='https://youtu.be/RtnmvOP703A' /> }
  ]);

  let content;
  if (mode === 'HELLO') content = <Article title='Hello' body='Click links'></Article>
  else if (mode === 'READ') content = <Article title={topics[id].title} body={topics[id].body}></Article>
  else if (mode === 'CREATE') content = <Create MyCreate={(_title, _body) => {
    const newtopics = [...topics];
    newtopics.push({ id: topics.length, title: _title, body: _body });
    setMode('READ');
    setId(topics.length);
    setTopics(newtopics);
  }}></Create>

  return <div>
    <Header title='React' MyEvent={() => { setMode('HELLO'); }}></Header>
    <Nav arr={topics} MyEvent={_id => {
      setMode('READ');
      setId(_id)
    }}></Nav>
    {content}
    <a href='null' onClick={event => {
      event.preventDefault();
      setMode('CREATE');
    }}>Create</a>
  </div>
}

export default App;