import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from './screens/InitialScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Product from './screens/ProductPage'
import ProductPage from './screens/ProductPage';
import ProfilePage from './screens/ProfilePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

export default function App() {
  return (


    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#333333'
        }
      }}>
        <Stack.Screen options = {{ headerShown: false }} name="Initial" component={InitialScreen} />
        <Stack.Screen 
          name="SignUp"
          component={SignUpScreen} 
          options={{
            title: "Sign Up",
            headerShown: false
            }} />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "Login",
            headerShown: false
          }}
          />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home',
            headerShown: false
          }}
          />
        <Stack.Screen 
          name="Product" 
          component={ProductPage} 
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen 
          name="Profile" 
          component={ProfilePage} 
          options={{
            headerShown: false
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
