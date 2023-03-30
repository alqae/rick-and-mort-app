import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, CharacterScreen } from '../screens';
import { colors } from '../theme/colors';
import { AppBar } from '../components';
import { Character } from '../models';

export type RootStackParamList = {
  Home: undefined;
  Character: { character: Character };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const MainStack: React.FC<{}> = () => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Rick And Morty API',
            headerStyle: {
              backgroundColor: colors.dark,
            },
            headerTintColor: colors.light,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <RootStack.Screen
          name="Character"
          component={CharacterScreen}
          options={{ header: ({ navigation }) => <AppBar onClose={() => navigation.goBack()} /> }}
        />
      </RootStack.Navigator>
    </QueryClientProvider>
  </NavigationContainer>
);

export default MainStack;
