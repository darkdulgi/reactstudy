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
      props.MyEvent(Number(event.target.id));
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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.MyUpdate(title, body);
    }}>
      <p><input type='text' name='title' value={title} onChange={event => { setTitle(event.target.value); }} /></p>
      <p><textarea name='body' value={body} onChange={event => { setBody(event.target.value); }} /></p>
      <p><input type='submit' /></p>
    </form>
  </article>
}

const App = () => {
  const [mode, setMode] = useState('HELLO');
  const [id, setId] = useState(1);
  const [topics, setTopics] = useState([
    { id: 1, title: 'RUGAY', body: "YES I'M GAY" },
    { id: 2, title: 'URGAY', body: "NO U" },
    { id: 3, title: 'WHO IS LMFAO', body: <ReactPlayer url='https://youtu.be/RtnmvOP703A' /> }
  ]);
  let content;

  if (mode === 'HELLO') content = <Article title='Hello' body='Click links'></Article>
  else if (mode === 'READ') {
    let _title;
    let _body;
    for (let i = 0; i < topics.length; i++) {
      const tp = topics[i];
      if (tp.id === id) {
        _title = tp.title;
        _body = tp.body;
        break;
      }
    }

    content = <Article title={_title} body={_body}></Article>
  }
  else if (mode === 'CREATE') content = <Create MyCreate={(_title, _body) => {
    const newtopics = [...topics];
    newtopics.push({ id: topics.length + 1, title: _title, body: _body });
    setMode('READ');
    setId(topics.length + 1);
    setTopics(newtopics);
  }}></Create>
  else if (mode === 'UPDATE') {
    let oldtitle;
    let oldbody;
    for (let i = 0; i < topics.length; i++) {
      const tp = topics[i];
      if (tp.id === id) {
        oldtitle = tp.title;
        oldbody = tp.body;
        break;
      }
    }
    content = <Update title={oldtitle} body={oldbody} MyUpdate={(_title, _body) => {
      const newtopics = [...topics];
      for (let i = 0; i < topics.length; i++) {
        if (id === newtopics[i].id) {
          newtopics[i].body = _body;
          newtopics[i].title = _title;
          break;
        }
      }
      setTopics(newtopics);
      setMode('READ');
    }}></Update >
  }

  return <div>
    <Header title='React' MyEvent={() => { setMode('HELLO'); }}></Header>

    <Nav arr={topics} MyEvent={_id => {
      setMode('READ');
      setId(_id);
    }}></Nav>

    {content}

    <ul>
      <li><a href='null' onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      <li><a href='null' onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type='button' value='delete' onClick={() => {
        if (mode === 'READ') {
          let newtopics = [];
          for (let i = 0; i < topics.length; i++) {
            if (id !== topics[i].id) {
              newtopics.push(topics[i]);
            }
          }
          setTopics(newtopics);
        }
      }} /></li>
    </ul>

  </div>
}

export default App;