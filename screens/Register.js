import React, { Component } from 'react';
import {
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import { uuidv5 } from 'uuid/v5'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'

import { Button, Block, Text, Input } from '../components';
import * as theme from '../constants/theme';
import {fire, db } from './../firebase'

const { height } = Dimensions.get('window');

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: null,
      activePro: null,
      email: '',
      password: '',
      name: null,
      club: null,
      isLoading : false,
      errorCode: ''
    }
  }
  

  handleType = id => {
    const { active } = this.state;

    if (active === 'customerPro') {
      this.setState({activePro : null})
    }
    this.setState({ active: active === id ? null : id });
  }

  handleTypePro = id => {
    const { activePro } = this.state;
    this.setState({ activePro: activePro === id ? null : id });
  }

  createLogin = async () => {
    let statename = null
    let stateprofil = null
    if (this.state.active || this.state.activePro && this.state.name || this.state.club) {
      this.setState({ isLoading: true })
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (re) => { 
          if (this.state.name) {
            statename = this.state.name
          } else {
            statename = this.state.club
          }

          if (this.state.active) {
            stateprofil = this.state.active
          } else {
            stateprofil = this.state.activePro
          }

          try {
            db.ref('userLogin/' + re.user.uid).set({name: statename, profil: stateprofil})
          } catch (error) {
            console.log(error);
          }
          await AsyncStorage.setItem('userToken', re.user.uid)
          await AsyncStorage.setItem('first', 'true')
          this.setState({ isLoading: false, errorCode: '' })
          this.props.navigation.navigate('AuthLoading')
        })
        .catch(error => {
          console.log(error);
          
          const errorCode = error.code;
          this.setState({errorCode : errorCode})
        })
        this.setState({ isLoading: false })
    } else{
        this.setState({ errorCode : 'auth/active-pro'})
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _errorMail(){
    if (this.state.errorCode === 'auth/email-already-in-use') {      
      return (
       <Text style={styles.containerError}>Il existe déjà un compte avec l'adresse email donnée.</Text>
      )
      
    }else if(this.state.errorCode === 'auth/invalid-email'){
      return (
        <Text style={styles.containerError}> L'adresse email n'est pas valide.</Text>
       )
    }
  }
  _errorPassword(){
    if (this.state.errorCode === 'auth/wrong-password') {
      return (
       <Text style={styles.containerError}>Le mot de passe n'est pas assez fort.</Text>
      )
      
    }
  }

  _errorBlock(){
    if (this.state.errorCode === 'auth/active-pro') {
      return (
       <Text style={styles.containerError}>Vous êtes ????</Text>
      )
      
    }
  }

  render() {
    const { navigation } = this.props;
    const { active, activePro } = this.state;

    const customerIcon = (
      <Icon type='ionicon' name='ios-body' style={{ height: 16, width: 14 }}/>
    );
    
    const customerProIcon = (
      <Icon type='ionicon' name='ios-business' style={{ height: 16, width: 14 }}/>
    );

    const customerProCoachIcon = (
      <Icon type='ionicon' name='ios-happy' style={{ height: 16, width: 14 }}/>
    );
    const customerProClubIcon = (
      <Icon type='ionicon' name='ios-school' style={{ height: 16, width: 14 }}/>
    );

    const checkIcon = (
      <Image
        source={require('../assets/images/icons/check.png')}
        style={{ height: 18, width: 18 }}
      />
    );

    return (
      <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
        {this._displayLoading()}
        <Block center middle style={{ marginBottom: 40, marginTop: 20 }}>
          <Image
            source={require('../assets/images/Base/Logo.png')}
            style={{ height: 28, width: 102 }}
          />
        </Block>
        <Block flex center>
          <Text h3 style={{ marginBottom: 6 }}>
          Commencez gratuitement
          </Text>
          <Text paragraph color="black3">
            Libre pour toujours. Aucune carte de crédit nécessaire.
          </Text>
          {this._errorBlock()}
          <Block row style={{ marginHorizontal: 28, marginTop: 40, }}>
            <TouchableWithoutFeedback
              onPress={() => this.handleType('customer')}
              style={active === 'customer' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  { marginRight: 20, },
                  active === 'customer' ? styles.active : null
                ]}
              >
                {
                  active === 'customer' ? (
                    <Block center middle style={styles.check}>
                      {checkIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {customerIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11 }}>Particulier</Text>
                <Text paragraph center color="black3">Pour tout le monde</Text>
              </Block>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.handleType('customerPro')}
              style={active === 'customerPro' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  active === 'customerPro' ? styles.active : null
                ]}
              >
                {
                  active === 'customerPro' ? (
                    <Block center middle style={styles.check}>
                      {customerProIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {customerProIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11 }}>Pro</Text>
                <Text paragraph center color="black3">Conserne les coachs, salle de sport/club</Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
          { active === 'customerPro' ? (
          <Block row style={{ marginHorizontal: 28, marginTop: 40, }}>
            <TouchableWithoutFeedback
              onPress={() => this.handleTypePro('customerProCoach')}
              style={activePro === 'customer' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  { marginRight: 20, },
                  activePro === 'customerProCoach' ? styles.active : null
                ]}
              >
                {
                  activePro === 'customerProCoach' ? (
                    <Block center middle style={styles.check}>
                      {checkIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {customerProCoachIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11 }}>Coach</Text>
              </Block>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.handleTypePro('customerProClub')}
              style={activePro === 'customerProClub' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  activePro === 'customerProClub' ? styles.active : null
                ]}
              >
                {
                  activePro === 'customerProClub' ? (
                    <Block center middle style={styles.check}>
                      {checkIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {customerProClubIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11, textAlign:'center' }}>Salle de Sport/Club</Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
          ): null }

          <Block center style={{ marginTop: 25 }}>
            <Input
              full
              label={activePro === 'customerProClub' ? "Nom de la salle/club" : "Nom complet"}
              onChangeText={name => {
                if (activePro === 'customerProClub') {
                  this.setState({ club: name, name: null })
                }else{
                  this.setState({ name: name, club: null })
                }
                
              }}
              value={this.state.name}
              style={{ marginBottom: 25 }}
            />

            <Input
              full
              email
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              label="Adresse Mail"
              style={{ marginBottom: 25 }}
            />
            {this._errorMail()}
            <Input
              full
              password
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              label="Mot de passe"
              style={{ marginBottom: 25 }}
              onSubmitEditing={() => this.createLogin()}
            />
            {this._errorPassword()}
            <Button
              full
              style={{ marginBottom: 12 }}
              onPress={() => this.createLogin()}
            >
              <Text button>Créer un compte</Text>
            </Button>
            <Text paragraph color="gray">
            Vous avez déjà un compte? <Text
                height={18}
                color="orange"
                onPress={() => navigation.navigate('Login')}>
                Se connecter
              </Text>
            </Text>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    )
  }
}

export default Register;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  active: {
    borderColor: theme.colors.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightorange,
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightorange
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
  containerError: {
    color: theme.colors.red,
    textAlign: 'center',
    marginTop:0,
    padding:0
  },
  loading_container: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})