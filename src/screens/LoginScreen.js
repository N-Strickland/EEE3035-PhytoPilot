import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    UIManager,
    View,
    LayoutAnimation,
    KeyboardAvoidingView,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import { Button, Input, Icon, Text } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import Video from 'react-native-video';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BACKGROUND_VIDEO = require('/Users/nathanstrickland/Documents/Uni_Work/EEE3035_EPS/PhytoPilot/background.mp4');

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
            username: '',
            email: '',
            password: '',
            currentTab: 0,
            isLoading: false,
            isValidEmail: true,
            isValidPassword: true,
            isValidUsername: true,
            isValidPass: true,
            isValidUser: true,
            signedUp: false,
            confirmationCode: 0,
            isValidConfirmationCode: true,
        };

        this.selectTab = this.selectTab.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('home');
    };

    selectTab(currentTab) {
        LayoutAnimation.easeInEaseOut();
        try {
            this.inputEmail.clear();
        } catch {
            console.log("no email");
        }
        this.setState({
            currentTab,
            isLoading: false,
            isValidEmail: true,
            isValidPassword: true,
            isValidUsername: true
        });
    }

    checkEmailIsValid(email) {
        let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    }

    login() {
        const { username, password } = this.state;
        this.setState({ isLoading: true });

        // TO DO SETUP LOGIN SYSTEM CURRENT PLACEHOLDER ANIMATION & CHECKS
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isValidUsername: username.length >= 4 || this.inputUsername.shake(),
                isValidPassword: password.length >= 8 || this.inputPassword.shake(),
            });
            if (this.state.isValidUsername && this.state.isValidPassword) {

                Auth.signIn({
                    username: username,
                    password: password
                })
                    .then(data => {
                        console.log(data);
                        this._signInAsync();
                    })
                    .catch(err => {
                        console.log(err);
                        if (err.code == "UserNotFoundException") {
                            this.setState({
                                isValidUser: false,
                                loginError: err.message
                            });
                        } else {
                            this.setState({
                                isValidPass: false,
                                loginError: err.message
                            });
                        }
                    })
            }
        }, 1500);
    }

    signUp() {
        const { email, password, username } = this.state;
        this.setState({ isLoading: true });

        // TO DO SETUP LOGIN SYSTEM CURRENT PLACEHOLDER ANIMATION & CHECKS
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isValidEmail: this.checkEmailIsValid(email) || this.inputEmail.shake(),
                isValidPassword: password.length >= 8 || this.inputPassword.shake(),
                isValidUsername: username.length >= 4 || this.inputUsername.shake(),
            });

            const { signedUp, isValidEmail, isValidUsername, isValidPassword } = this.state;

            if (!signedUp) {
                if (isValidEmail && isValidUsername && isValidPassword) {
                    Auth.signUp({
                        username: username,
                        password: password,
                        attributes: {
                            email: email
                        }
                    })
                        .then(data => {
                            console.log(data)
                            this.setState({
                                signedUp: true
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            if (err.code == "UsernameExistsException") {
                                this.setState({
                                    isValidUser: false,
                                    loginError: err.message
                                })
                            }
                        });
                }
            }

        }, 1500);
    }

    confirmSignUp() {
        const { username, confirmationCode } = this.state;
        Auth.confirmSignUp(username, confirmationCode)
            .then(() => {
                console.log("Confirmed Sign Up");
                this.login();
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isValidConfirmationCode: false
                });
                this.inputConfirmationCode.shake();
            })
    }

    render() {
        const {
            currentTab,
            isLoading,
            isValidPassword,
            isValidUsername,
            isValidEmail,
            isValidConfirmationCode,
            email,
            password,
            username,
            signedUp,
            confirmationCode,
            loginError,
            isValidUser,
            isValidPass
        } = this.state;

        const loginPage = currentTab === 0;
        const signUpPage = currentTab === 1;

        return (
            <View style={styles.container} >
                <Video
                    source={BACKGROUND_VIDEO}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />

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
                                onPress={() => {
                                    this.selectTab(0);
                                    this.inputUsername.clear();
                                    this.inputPassword.clear();
                                }}
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
                                onPress={() => {
                                    this.selectTab(1);
                                    this.inputUsername.clear();
                                    this.inputPassword.clear();
                                }}
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
                            {signUpPage && signedUp && (
                                <View style={styles.confirmationBox}>
                                    <Text style={{ textAlign: 'center' }}>Please enter the confirmation code sent to</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{email}</Text>
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="code"
                                                type="font-awesome"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        }
                                        value={confirmationCode}
                                        keyboardAppearance="light"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        returnKeyType="next"
                                        inputStyle={{ marginLeft: 10 }}
                                        placeholder={'Confirmation Code'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                            marginTop: 10,
                                        }}
                                        ref={input => (this.inputConfirmationCode = input)}
                                        onSubmitEditing={() => this.confirmSignUp()}
                                        onChangeText={confirmationCode => this.setState({ confirmationCode })}
                                        errorMessage={
                                            isValidConfirmationCode ? null : 'Invalid Confirmation Code'
                                        }
                                    />
                                </View>
                            )}
                            {!signedUp && (
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="user-o"
                                            type="font-awesome"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={username}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType="next"
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder={'Username'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    ref={input => (this.inputUsername = input)}
                                    onSubmitEditing={() => signUpPage ? this.inputEmail.focus() : this.inputPassword.focus()}
                                    onChangeText={username => this.setState({ username })}
                                    errorMessage={
                                        isValidUsername ? isValidUser ? null : loginError : 'Username must be more than 4 letters'
                                    }
                                />
                            )}
                            {signUpPage && !signedUp && (
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
                                        marginTop: 16
                                    }}
                                    ref={input => (this.inputEmail = input)}
                                    onSubmitEditing={() => this.inputPassword.focus()}
                                    onChangeText={email => this.setState({ email })}
                                    errorMessage={
                                        isValidEmail ? null : 'Please enter a valid email address'
                                    }
                                />
                            )}
                            {!signedUp && (
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
                                    returnKeyType={'done'}
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder={'Password'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        marginTop: 16
                                    }}
                                    ref={input => (this.inputPassword = input)}
                                    onSubmitEditing={() => signUpPage ? this.signUp() : this.login()}
                                    onChangeText={password => {
                                        this.setState({ password });
                                    }
                                    }
                                    errorMessage={
                                        isValidPassword ? isValidPass ? null : loginError : 'Password must be at least 8 characters'
                                    }
                                />
                            )}

                            <Button
                                buttonStyle={styles.loginButton}
                                containerStyle={{ marginTop: 32, flex: 0 }}
                                activeOpacity={0.8}
                                title={signedUp ? 'CONFIRM' : loginPage ? 'LOGIN' : 'SIGN UP'}
                                onPress={signedUp ? this.confirmSignUp : loginPage ? this.login : this.signUp}
                                titleStyle={styles.loginTextButton}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>

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
        marginBottom: 30
    },
    selected: {
        position: 'absolute',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: 25,
        width: 50,
        borderRightWidth: 60,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 0,
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
    confirmationBox: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        opacity: 0.8,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
        fontWeight: 'bold'
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        height: SCREEN_HEIGHT,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
});


