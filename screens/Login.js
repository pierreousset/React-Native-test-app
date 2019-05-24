import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Dimensions, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

import { Button, Block, Text, Input } from '../components';
import {fire} from './../firebase'
import { colors } from '../constants/theme';

const { height, width } = Dimensions.get('window');

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      password: '',
      email: '',
      errorCode: ''
    }
  }

  login() {
    this.setState({ isLoading: true })
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (re) => {
        await AsyncStorage.setItem('userToken', re.user.uid)
        await AsyncStorage.setItem('first', 'false')
        this.setState({ isLoading: false, errorCode:'' })
        this.props.navigation.navigate('AuthLoading')
      })
      .catch(error => {
        const errorCode = error.code;
        this.setState({errorCode : errorCode})
      })
      this.setState({ isLoading: false })
  }

  _displayLoading(){
    if (this.state.isLoading) {
      return (
        <Block style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </Block>
      )
      
    }
  }

  _errorMail(){
    if (this.state.errorCode === 'auth/invalid-email') {      
      return (
       <Text style={styles.containerError}>Mauvais mail</Text>
      )
      
    }
  }
  _errorPassword(){
    if (this.state.errorCode === 'auth/wrong-password') {
      return (
       <Text style={styles.containerError}>Mauvais mot de passe</Text>
      )
      
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.2}
      >
        <Block center middle>
          <Block middle>
            <Image
              source={require('../assets/images/Base/Logo.png')}
              style={{ height: 28, width: 102 }}
            />
          </Block>
          <Block flex={2.5} center>
            <Text h3 style={{ marginBottom: 6 }}>
              Connectez-vous à Velocity
            </Text>
            <Text paragraph color="black3" style={{textAlign:'center'}}>
              Veuillez entrer vos informations d'identification pour continuer.
            </Text>
            <Block center style={{ marginTop: 44 }}>
              <Input
                full
                email
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                label="Adresse Mail"
                style={{ marginBottom: 25 }}
                onSubmitEditing={() => this.login()}
              />
              {this._errorMail()}
              <Input
                full
                password
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                label="Mot de passe"
                style={{ marginBottom: 25 }}
                onSubmitEditing={() => this.login()}
                rightLabel={
                  <Text
                    paragraph
                    color="gray"
                    onPress={() => navigation.navigate('Forgot')}
                  >
                    Mot de passe oublié?
                  </Text>
                }
              />
              {this._errorPassword()}
              <Button
                full
                style={{ marginBottom: 12 }}
                onPress={() => this.login()}
              >
                <Text button>Se connecter</Text>
              </Button>
              <Text paragraph color="gray">
              Vous n'avez pas de compte? <Text
                  height={18}
                  color="orange"
                  onPress={() => navigation.navigate('Register')}>
                   S'inscrire
                </Text>
              </Text>
            </Block>
          </Block>
        </Block>
        {this._displayLoading()}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
  },
  containerError: {
    color: colors.red,
    textAlign: 'center',
    marginTop:0,
    padding:0
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width,
    height: 169,
    backgroundColor: 'gray'
  },
})

export default Login;