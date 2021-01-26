import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'


export default function Finish() {
    const [playerName, setPlayerName] = useState('')
    const [difficulty, setDifficulty] = useState('easy')
    const navigation = useNavigation()
    
    function goToGame(){
        if(playerName === ''){
            Alert.alert('Please input your name.')
        } else {
            navigation.replace('Game', {
                difficulty: difficulty,
                playerName: playerName
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{color: '#03ff42', fontWeight: 'bold', fontSize: 50, marginTop:-200, marginBottom: 100}}>SUGOKU</Text>
            <View style={{backgroundColor: '#2e302e'}}>
                <Text style={{color: '#03ff42', fontWeight: 'bold', textAlign: 'center', padding: 10}}>Input Your Name</Text>
                <TextInput
                    value={playerName}
                    style={{height: 40, width: 200, backgroundColor: '#b2b8b2', margin: 10}}
                    placeholder="ex: Bob"
                    onChangeText={(value) => setPlayerName(value)}
                />
                <Text style={{color: '#03ff42', fontWeight: 'bold', textAlign: 'center', margin: 10}}>Select Difficulty</Text>
                <Picker
                    selectedValue={difficulty}
                    style={{ height: 50, width: 150, color: '#03ff42', marginLeft: 50 }}
                    onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
                >
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                    <Picker.Item label="Random" value="random" />
                </Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goToGame}
                >
                    <Text style={{fontWeight: 'bold'}}>Play</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
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
    padding: 10
  }
});
