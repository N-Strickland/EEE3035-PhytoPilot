import React, { Component } from 'react';
import { Text, Button, Avatar } from 'react-native-elements';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';


let username = '';
let email = '';

Auth.currentAuthenticatedUser({
    bypassCache: false
}).then(user => {
    username = user.username;
    email = user.attributes.email;
    console.log(username, email);
})
    .catch(err => console.log(err));

export default class ProfileScreen extends Component {
    _signOutAsync = async () => {
        await AsyncStorage.clear()
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <View style={styles.profileContainer}>
                <Avatar
                    size="xlarge"
                    rounded
                    title={username[0]}
                    activeOpacity={0.7}
                />
                <View style={styles.infobox}>
                    <Text style={styles.infotext}>Name: {username} </Text>
                    <Text style={styles.infotext}>Email: {email}</Text>
                </View>
                <Button buttonStyle={styles.logoutButton} title="Log Out" onPress={this._signOutAsync} />
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30
    },
    infobox: {
        padding: 30,
    },
    infotext: {
        fontSize: 18,
        padding: 5
    }
})