import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Finish({ navigation, route }) {

    const { playerName } = route.params

    function backToHome(){
        navigation.replace('Home')
    }


    return (
        <View style={styles.container}>
            <Text style={{color: '#03ff42', fontWeight: 'bold', fontSize: 50, marginTop:-200, marginBottom: 100}}>SUGOKU</Text>
            <Text style={{color: 'white', fontSize: 18, padding: 10, textAlign: 'center'}}>Congratulations {playerName} for solving this level !!!</Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={backToHome}
                >
                    <Text style={{fontWeight: 'bold'}}>Back to Home</Text>
                </TouchableOpacity>
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
    padding: 10,
    marginTop: 25
  }
});
