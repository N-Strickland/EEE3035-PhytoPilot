import React from 'react';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeTabNavigator from './HomeTabNavigator'

const RootNavigator = createAnimatedSwitchNavigator(
    {
        initial: { screen: AuthLoadingScreen },
        login: { screen: LoginScreen },
        home: HomeTabNavigator,
    },
    {
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="slide-top"
                    durationMs={400}
                    interpolation="easeIn"
                />
                <Transition.In type="fade" durationMs={500}/>

            </Transition.Together>
        ),
    }
);

export default createAppContainer(RootNavigator);

