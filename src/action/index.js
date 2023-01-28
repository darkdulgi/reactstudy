export const SETMODE = 'SETMODE';
export const SETID = 'SETID';
export const CREATE = 'CREATE_TOPICS';
export const REMOVE = 'REMOVE';
export const UPDATE = 'UPDATE'

export const setMode = _mode => {
    return {
        type: SETMODE,
        mode: _mode
    }
}

export const setId = _id => {
    return {
        type: SETID,
        id: _id
    }
}

export const createTopics = (_title, _body) => {
    return {
        type: CREATE,
        title: _title,
        body: _body
    }
}

export const removeTopics = _id => {
    return {
        type: REMOVE,
        id:_id
    }
}

export const updateTopics = (_id, _title, _body) => {
    return {
        type: UPDATE,
        id:_id,
        title: _title,
        body: _body
    }
}