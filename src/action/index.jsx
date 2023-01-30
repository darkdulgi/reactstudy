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

export const createTopics = article => {
    return {
        type: CREATE,
        payload: article
    }
}

export const removeTopics = _id => {
    return {
        type: REMOVE,
        id:_id
    }
}

export const updateTopics = article => {
    return {
        type: UPDATE,
        payload: article
    }
}