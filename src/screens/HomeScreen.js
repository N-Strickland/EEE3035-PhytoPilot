import React from 'react';
import {
    Text,
    View,
    Button,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import DataPanel from '../components/DataPanel';
import Amplify, { Auth } from 'aws-amplify';


export default class HomeScreen extends React.Component {
    render() {
        return (
            <View>
                <DataPanel></DataPanel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f9',
        paddingTop: 30
    },
});