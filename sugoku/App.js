import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './src/store/index'

import Home from './src/components/home'
import Game from './src/components/game'
import Finish from './src/components/finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerTransparent: true, title: ''}}></Stack.Screen>
          <Stack.Screen name="Game" component={Game} options={{headerTransparent: true, title: ''}}></Stack.Screen>
          <Stack.Screen name="Finish" component={Finish} options={{headerTransparent: true, title: ''}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}