import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import RecordScreen from './screens/RecordScreen';
import RecordDetailScreen from './screens/RecordDetailScreen'; // yeni

export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
  Records: undefined;
  RecordDetail: { record: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Ana Sayfa' }} 
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Uçuş Formu' }} 
        />
        <Stack.Screen 
          name="Records" 
          component={RecordScreen} 
          options={{ title: 'Geçmiş Kayıtlar' }} 
        />
        <Stack.Screen
          name="RecordDetail"
          component={RecordDetailScreen}
          options={{ title: 'Kayıt Detayı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;