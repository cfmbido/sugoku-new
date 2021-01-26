export const fetchBoard = (difficulty) => {
    return (dispatch, getState) => {

    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: "FETCH_BOARD",
                payload: data.board
            })
            dispatch({
                type: "FETCH_STARTBOARD",
                payload: data.board
            })
        })
        .catch(err => console.log(err))
        }
}

export const updateValueBoard = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: "UPDATE_VALUE_BOARD",
            payload: payload
        })
    }
}