import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Icon } from 'react-native-elements';

export default HomeTabNavigator = createBottomTabNavigator(
    {
        Help: {
            screen: HelpScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'help-circle' : 'help-circle'}
                        size={24}
                        type="material-community"
                        color={tintColor}
                    />
                ),
            },
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'home' : 'home'}
                        size={24}
                        type="material-community"
                        color={tintColor}
                    />
                ),
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'account-circle' : 'account-circle'}
                        size={24}
                        type="material-community"
                        color={tintColor}
                    />
                ),
            },
        },
    },

    {
        initialRouteName: 'Home',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPositon: 'bottom',
        tabBarOptions: {
            activeTintColor: 'rgba(0, 153, 51, 1)',
            showIcon: true
        }
    }
)

