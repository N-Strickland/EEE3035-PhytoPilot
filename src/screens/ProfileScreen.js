import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, AsyncStorage, StyleSheet } from 'react-native';

export default class ProfileScreen extends Component {
    _signOutAsync = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <View style={styles.profileContainer}>
                <Button buttonStyle={styles.logoutButton} containerStyle={{ marginTop: 32, flex: 0 }} title="Log Out" onPress={this._signOutAsync} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: 'rgba(0, 153, 51, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    profileContainer: {
        alignItems: "center"
    }
})