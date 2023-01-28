import { useState } from 'react';
import { Button, Box, Grid, ButtonGroup, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const Header = (props) => {
  return <header>
    <h1><a href='null' onClick={event => {
      event.preventDefault();
      props.MyEvent();
    }}>{props.title}</a></h1>
    <h2>
      <Link to='/test'>Test Link</Link>
    </h2>
  </header>
}

const Nav = (props) => {
  const arr = [];
  for (let i = 0; i < props.arr.length; i++) {
    let t = props.arr[i];
    if (t.visible) {
      arr.push(<li key={t.id}><a id={t.id} href='null' onClick={event => {
        event.preventDefault();
        props.MyEvent(Number(event.target.id));
      }}>{t.title}</a></li>)
    }
  }
  return <nav>
    <ul>
      {arr}
    </ul>
  </nav>
}

const Article = (props) => {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

const Create = (props) => {
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

const Update = (props) => {
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

const Main = () => {
  const [mode, setMode] = useState('HELLO');
  const [id, setId] = useState(1);
  const [topics, setTopics] = useState([
    { id: 0, visible: true, title: 'RUGAY', body: "YES I'M GAY" },
    { id: 1, visible: true, title: 'URGAY', body: "NO U" },
    { id: 2, visible: true, title: 'WHO IS LMFAO', body: "" }
  ]);
  let content;

  if (mode === 'HELLO') content = <Article title='Hello' body='Click links' />
  else if (mode === 'READ') {
    let _title;
    let _body;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        _title = topics[i].title;
        _body = topics[i].body;
        break;
      }
    }
    content = <Article title={_title} body={_body} />
  }
  else if (mode === 'CREATE') content = <Create MyCreate={(_title, _body) => {
    const newtopics = [...topics];
    newtopics.push({ id: topics.length, visible: true, title: _title, body: _body });
    setMode('READ');
    setId(topics.length);
    setTopics(newtopics);
  }} />
  else if (mode === 'UPDATE') {
    let oldtitle;
    let oldbody;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        oldtitle = topics[i].title;
        oldbody = topics[i].body;
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
    }} />
  }

  return <Container fixed>
    <Header title='React' MyEvent={() => { setMode('HELLO'); }} />
    <Grid container>
      <Grid item xs={4}>
        <Box>
          <Nav arr={topics} MyEvent={_id => {
            setMode('READ');
            setId(_id);
          }} />
          <ButtonGroup>
            <Button
              variant='outlined'
              onClick={() => { setMode('CREATE'); }}>Create</Button>
            <Button
              variant='outlined'
              onClick={() => { setMode('UPDATE'); }}>Update</Button>
            <Button
              variant='outlined'
              onClick={() => {
                if (mode === 'READ') {
                  let newtopics = [...topics];
                  for (let i = 0; i < newtopics.length; i++) {
                    if (id === newtopics[i].id) {
                      newtopics[i].visible = false;
                      break;
                    }
                  }
                  setTopics(newtopics);
                  setMode('HELLO');
                }
              }}>Delete</Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          {content}
        </Box>

      </Grid>
    </Grid>

  </Container>
}

const mapStateToProps = state => {
  console.log(state);
  return state;
}

export default connect(mapStateToProps)(Main);