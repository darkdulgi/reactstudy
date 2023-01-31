import * as ACT from '../action';

const initState = {
  mode: 'HELLO',
  id: 1,
  topics: [
    { id: 0, visible: true, title: '공지', body: "욕설 금지" },
    { id: 1, visible: true, title: '게시판입니다', body: "게시판입니다" },
    { id: 2, visible: true, title: '안녕하세요', body: "저는 한국인입니다" }
  ]
}

const reducer = (state = initState, action) => {
  const newtopics = [...state.topics];
  switch (action.type) {
    case ACT.SETMODE:
      return { ...state, mode: action.mode };

    case ACT.SETID:
      return { ...state, id: action.id };

    case ACT.CREATE:
      return { ...state, topics: [...state.topics, action.payload], mode: 'READ', id: state.topics.length };

    case ACT.REMOVE:
      if (state.mode !== 'READ') break;
      for (let i = 0; i < newtopics.length; i++) {
        if (newtopics[i].id === action.id) {
          newtopics[i].visible = false;
          break;
        }
      }
      return { ...state, topcis: newtopics, mode: 'HELLO' };

    case ACT.UPDATE:
      if (state.mode !== 'UPDATE') break;
      for (let i = 0; i < newtopics.length; i++) {
        if (newtopics[i].id === action.payload.id) {
          newtopics[i] = action.payload;
          break;
        }
      }
      return { ...state, topics: newtopics, mode: 'READ', id: action.payload.id };

    default:
      return state;
  }
}

export default reducer