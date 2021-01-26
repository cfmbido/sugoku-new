import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, updateValueBoard } from '../store/actions/actions'

export default function Game({ navigation, route }) {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const startBoard = useSelector(state => state.startBoard)
  const { difficulty, playerName } = route.params

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [dispatch, difficulty])

  function handleChange(event, row, col){
    let clone = JSON.parse(JSON.stringify(board))
    event = Number(event)
    if(!isNaN(event)) {
        if(event <= 9){
            clone[row][col] = event
            dispatch(updateValueBoard(clone))
        }
    } 
  }

  function solveBoard(){
    
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

    fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: encodeParams({board: startBoard}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                dispatch(updateValueBoard(response.solution))
            })
            .catch(console.warn)
  }

  function validateBoard(){
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

    fetch('https://sugoku.herokuapp.com/validate', {
        method: 'POST',
        body: encodeParams({board: board}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                if(response.status === 'solved'){
                    navigation.replace('Finish', {
                        playerName: playerName
                    })
                } else {
                    Alert.alert('Incorrect Answer!')
                }
            })
            .catch(console.warn)
  }

  function backToHome(){
    navigation.replace('Home')
  }

  if(board.length < 1 || startBoard.length < 1){
    return (
        <View style={styles.container}>
            <Text style={{color: '#03ff42', fontWeight: 'bold', fontSize: 50, marginTop:-200, marginBottom: 100}}>SUGOKU</Text>
            <Text style={{color: 'white', fontSize: 20, marginTop: 100}}>Loading...</Text>
        </View>
    )
  } else {
    return (
        <View style={styles.container}>
            <Text style={{color: '#03ff42', fontWeight: 'bold', fontSize: 50, marginBottom: 10}}>SUGOKU</Text>
            <Text style={{color: '#03ff42', fontSize: 20, marginBottom: 15}}>Difficulty: {difficulty}</Text>
            <View>
            {
                board.map((el, row) => {
                return <View key={row} style={{flexDirection: 'row', backgroundColor: 'black', padding: 5}}>
                    {
                    el.map((el2, col) => {
                        if(el2 == 0){
                            return <TextInput key={col} keyboardType={'number-pad'} value="" onChangeText={(e) => {handleChange(e, row, col)}} style={{padding: 5, color: '#03ff42', textAlign: 'center', borderColor: 'blue', borderWidth: 1, fontWeight: 'bold'}} />
                        } else if(el2 == startBoard[row][col]){
                            return <TextInput key={col} keyboardType={'number-pad'} value={board[row][col].toString()} editable={false} onChangeText={(e) => {handleChange(e, row, col)}} style={{padding: 5, color: '#03ff42', textAlign: 'center', borderColor: 'blue', borderWidth: 1, fontWeight: 'bold', backgroundColor: 'blue'}} />
                        } else {
                            return <TextInput key={col} keyboardType={'number-pad'} value={board[row][col].toString()} onChangeText={(e) => {handleChange(e, row, col)}} style={{padding: 5, color: '#03ff42', textAlign: 'center', borderColor: 'blue', borderWidth: 1, fontWeight: 'bold'}} />
                        }
                    })}
                    </View>
                })
            }
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={solveBoard}
                >
                    <Text style={{fontWeight: 'bold'}}>Solve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={validateBoard}
                >
                    <Text style={{fontWeight: 'bold'}}>Validate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={backToHome}
                >
                    <Text style={{fontWeight: 'bold'}}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#b2b8b2",
    padding: 10,
    margin: 10
  }
});
