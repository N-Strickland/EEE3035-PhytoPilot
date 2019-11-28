import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    UIManager,
    View,
    Text,
    LayoutAnimation,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BACKGROUND_IMAGE = require('../../background.jpg');

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected} />
        </View>
    );
};

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            currentTab: 0,
            isLoading: false,
            isValidEmail: true,
            isValidPassword: true,
            isValidConfirmation: true,
        };

        this.selectTab = this.selectTab.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    selectTab(currentTab) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            currentTab,
            isLoading: false,
        });
    }

    checkEmailIsValid(email) {
        let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    }

    login() {
        const { email, password } = this.state;
        this.setState({ isLoading: true });

        // TO DO SETUP LOGIN SYSTEM CURRENT PLACEHOLDER ANIMATION & CHECKS
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isValidEmail: this.checkEmailIsValid(email) || this.inputEmail.shake(),
                isValidPassword: password.length >= 6 || this.inputPassword.shake(),
            });
        }, 1500);
    }

    signUp() {
        const { email, password, passwordConfirmation } = this.state;
        this.setState({ isLoading: true });

        // TO DO SETUP LOGIN SYSTEM CURRENT PLACEHOLDER ANIMATION & CHECKS
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isValidEmail: this.checkEmailIsValid(email) || this.inputEmail.shake(),
                isValidPassword: password.length >= 6 || this.inputPassword.shake(),
                isValidConfirmation: password === passwordConfirmation || this.inputConfirmation.shake(),
            });
        }, 1500);
    }

    render() {
        const {
            currentTab,
            isLoading,
            isValidPassword,
            isValidConfirmation,
            isValidEmail,
            email,
            password,
            passwordConfirmation,
        } = this.state;

        const loginPage = currentTab === 0;
        const signUpPage = currentTab === 1;

        return (
            <View style={styles.container} >
                <ImageBackground source={BACKGROUND_IMAGE} style={styles.bgImage}>
                    <View>
                        <KeyboardAvoidingView
                            contentContainerStyle={styles.loginContainer}
                            behavior="position"
                        >
                            <View style={styles.titleContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.titleText}>Phyto</Text>
                                </View>
                                <View style={{ marginTop: -10, marginLeft: 10 }}>
                                    <Text style={styles.titleText}>Pilot</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    disabled={isLoading}
                                    type="clear"
                                    activeOpacity={0.75}
                                    onPress={() => this.selectTab(0)}
                                    containerStyle={{ flex: 1 }}
                                    titleStyle={[
                                        styles.categoryText,
                                        loginPage && styles.selectedCategoryText,
                                    ]}
                                    title={'Login'}
                                />
                                <Button
                                    disabled={isLoading}
                                    type="clear"
                                    activeOpacity={0.75}
                                    onPress={() => this.selectTab(1)}
                                    containerStyle={{ flex: 1 }}
                                    titleStyle={[
                                        styles.categoryText,
                                        signUpPage && styles.selectedCategoryText,
                                    ]}
                                    title={'Sign Up'}
                                />
                            </View>
                            <View style={styles.rowSelector}>
                                <TabSelector selected={loginPage} />
                                <TabSelector selected={signUpPage} />
                            </View>
                            <View style={styles.formContainer}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="envelope-o"
                                            type="font-awesome"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={email}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder={'Email'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    ref={input => (this.inputEmail = input)}
                                    onSubmitEditing={() => this.inputPassword.focus()}
                                    onChangeText={email => this.setState({ email })}
                                    errorMessage={
                                        isValidEmail ? null : 'Please enter a valid email address'
                                    }
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="lock"
                                            type="simple-line-icon"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={password}
                                    keyboardAppearance="light"
                                    secureTextEntry={true}
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    returnKeyType={signUpPage ? 'next' : 'done'}
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder={'Password'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        marginTop: 16
                                    }}
                                    ref={input => (this.inputPassword = input)}
                                    onSubmitEditing={() => signUpPage ? this.inputConfirmation.focus() : this.login}
                                    onChangeText={password => this.setState({ password })}
                                    errorMessage={
                                        isValidPassword ? null : 'Password must be at least 6 characters'
                                    }
                                />

                                {signUpPage && (
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="lock"
                                                type="simple-line-icon"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        }
                                        value={passwordConfirmation}
                                        keyboardAppearance="light"
                                        secureTextEntry={true}
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        blurOnSubmit={true}
                                        returnKeyType={'done'}
                                        inputStyle={{ marginLeft: 10 }}
                                        placeholder={'Confirm Password'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                            marginTop: 16
                                        }}
                                        ref={input => (this.inputConfirmation = input)}
                                        onSubmitEditing={this.signUp}
                                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                                        errorMessage={
                                            isValidPassword ? null : 'Passwords do not match'
                                        }
                                    />
                                )}

                                <Button
                                    buttonStyle={styles.loginButton}
                                    containerStyle={{ marginTop: 32, flex: 0 }}
                                    activeOpacity={0.8}
                                    title={loginPage ? 'LOGIN' : 'SIGN UP'}
                                    onPress={loginPage ? this.login : this.signUp}
                                    titleStyle={styles.loginTextButton}
                                    loading={isLoading}
                                    disabled={isLoading}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(0, 153, 51, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


