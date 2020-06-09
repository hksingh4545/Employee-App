import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Home from './screen/Home'
import CreateEmployee from './screen/CreateEmployee'
import Profile from './screen/Profile'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  myoption={
    title:"MY HOME",
    headerTintColor:"white",
    cardShadowEnabled:"true",
    headerStyle:{
      backgroundColor:"#388387",
      
    }
  }
  return (
    <View style={styles.container}>
      {/* <Profile/> */}
      <Stack.Navigator >
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={         //header editing
          {
            title:"MY HOME",
            headerTintColor:"white",
            headerStyle:{
              backgroundColor:"#388387"
            }
          }
        }
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{...myoption,title:"Profile"}} //how to change only one thing in object
        />
        <Stack.Screen 
        name="create" 
        component={CreateEmployee}
        options={{...myoption,title:"create"}}
        />
      </Stack.Navigator>
    </View>
  );
}

export default ()=> {
  return (
    <NavigationContainer>
      <App/>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000',
   //alignItems:'center',
  //justifyContent:'center'
  },

});
