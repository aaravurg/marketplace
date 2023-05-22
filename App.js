import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from './screens/InitialScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

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
            headerTitleStyle: {
              color: 'white'
            }
            }} />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "Login",
            headerTitleStyle: {
              color: 'white'
            }
          }}
          />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home',
            headerBackTitle: "Back to login",
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'white'
            }
          }}
          />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            title: 'Profile',
            headerBackTitle: "Back to home",
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'white'
            }
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
