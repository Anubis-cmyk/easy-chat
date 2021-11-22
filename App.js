import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import AddChatScreen from './screen/AddChatScreen';
import ChatScreen from './screen/ChatScreen';
import { ToastProvider } from 'react-toast-notifications'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#FF6464"},
  headerTitleStyle: {color: "white" ,fontWeight: 'bold'},
  headerTintColor: "white",
  headerTitleAlign: "center",
  
};


export default function App() {
  return (
    <NavigationContainer> 
     <ToastProvider placement ='bottom-center' >
      <Stack.Navigator 
      // initialRouteName="Home"
      screenOptions={globalScreenOptions}
      >
       <Stack.Screen name='Login' component={LoginScreen}/>
       <Stack.Screen name='Register' component={RegisterScreen}/>
       <Stack.Screen name='Home' component={HomeScreen}/>
       <Stack.Screen name='AddChat' component={AddChatScreen}/>
       <Stack.Screen name='Chat' component={ChatScreen}/>
      </Stack.Navigator>
     </ToastProvider>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
