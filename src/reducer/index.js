import { combineReducers } from 'redux'
import { SETMODE, SETID, CREATE, REMOVE, UPDATE } from '../action';

const initState = {
  mode: 'HELLO',
  id: 1,
  topics: [
    { id: 0, visible: true, title: 'RUGAY', body: "YES I'M GAY" },
    { id: 1, visible: true, title: 'URGAY', body: "NO U" },
    { id: 2, visible: true, title: 'WHO IS LMFAO', body: "LMFAO THE CHINESE HACKER" }
  ]
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case SETMODE:
      return state, { mode: action.mode };

    case SETID:
      return state, { id: action.id };

    case CREATE:
      const newtopics = [...state.topics]
      newtopics.push({ id: newtopics.length, visible: true, title: action.title, body: action.body });
      return state, { topics: newtopics };
    case REMOVE:
      return state;

    case UPDATE:
      return state;

    default:
      return state;
  }
}

export default combineReducers({
  reducer
})
