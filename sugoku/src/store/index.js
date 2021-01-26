import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    board: [],
    startBoard: []
}

function reducer (state = initialState, action){
    switch(action.type){
        case "FETCH_BOARD":
            return {...state, board: action.payload }
        case "FETCH_STARTBOARD":
            return {...state, startBoard: action.payload }
        case "UPDATE_VALUE_BOARD":
            return {...state, board: action.payload }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store