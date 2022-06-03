import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import {useState} from "react"
import ChatScreen from './screens/ChatScreen';
import { SocketProvider } from './context/useSocketContext';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user,setUser] = useState(true)
  return (
    <NavigationContainer>
      <SocketProvider>
        <Stack.Navigator initialRouteName='Home'>
          {
            user ? (
              <Stack.Group>
                <Stack.Screen
                  name='Home' 
                  component={HomeScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                <Stack.Screen name='Chat' component={ChatScreen} />
              </Stack.Group>
            ):(
              <Stack.Group>
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
              </Stack.Group>
            )
          }
        </Stack.Navigator>
      </SocketProvider>
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
