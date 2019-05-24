import React, { Component } from 'react';
import { TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, TouchableWithoutFeedback } from 'react-native';

import { Block, Card, Text, Label } from '../components';

import { Button, Overlay, Icon } from 'react-native-elements';

import * as theme from '../constants/theme';
import {db} from './../firebase'


class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      first: false,
      profil: null,
      active: null
    }
  }

  static navigationOptions = {
    headerLeftContainerStyle: {
      paddingLeft: 24
    },
    headerRightContainerStyle: {
      paddingRight: 24
    },
    headerLeft: (
      <TouchableOpacity><Icon menu /></TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity><Icon notification /></TouchableOpacity>
    ),
    headerTitle: (
      <Block row middle><Text h4>Bienvenue</Text></Block>
    )
  }

  handleType = id => {
    const { active } = this.state;
    this.setState({ active: active === id ? null : id });
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    const firstDo = await AsyncStorage.getItem('first');
    //await AsyncStorage.setItem('first', 'false')
    console.log(firstDo);
    let firstresult = false

    if (firstDo == 'true') {
      firstresult = true
    }

    db.ref('userLogin/' + token).once('value', (value) => {
      let val = value.val()
      this.setState({name: val.name, profil: val.profil})
      console.log(val.name, val.profil);
    });
    
    this.setState({first: firstresult})
  }


  async _removePress(navigate) {
    try {
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
    }
    catch(exception) {
      alert(exception)
      return false;
    }
  }
  

  render() {
    const { navigate } = this.props.navigation;
    const { active } = this.state;

    const checkIcon = (
      <Image
        source={require('../assets/images/icons/check.png')}
        style={{ height: 25, width: 25 }}
      />
    );

    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
          <Card row middle style={styles.margin}>
            <Block flex={1.2} center middle style={{ marginRight: 20 }}>
            <Text light>{this.state.name}</Text>
              <Text light height={43} size={36} spacing={-0.45}>86</Text>
              <Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
                OPERATING SCORE
              </Text>
            </Block>
            <Block>
              <Text paragraph color="black3">
                All cars are operating well.
                There were 1,233 trips since your last login.
              </Text>
            </Block>
          </Card>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon vehicle />
              <Text h2 style={{ marginTop: 17 }}>1,428</Text>
              <Text paragraph color="gray">Vehicles on track</Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon distance />
              <Text h2 style={{ marginTop: 17 }}>158.3</Text>
              <Text paragraph color="gray">Distance driven</Text>
            </Card>
          </Block>

          <Card
            title="TODAY'S TRIPS"
            style={[styles.margin, { marginTop: 18 }]}
          >
            <Block row right>
              <Block flex={2} row center right>
                <Label orange />
                <Text paragraph color="gray">Today</Text>
              </Block>
              <Block row center right>
                <Label purple />
                <Text paragraph color="gray">Yesterday</Text>
              </Block>
            </Block>
            <Block>
              <Text>Chart</Text>
            </Block>
          </Card>

          <Card
            title="TOP DRIVERS"
            style={[styles.margin, { marginTop: 18 }]}
          >
            <Block style={styles.driver}>
              <TouchableOpacity activeOpacity={0.8}>
                <Block row center>
                  <Block>
                    <Image
                      style={styles.avatar}
                      source={{ uri: 'https://images.unsplash.com/photo-1506244856291-8910ea843e81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                    />
                  </Block>
                  <Block flex={2}>
                    <Text h4>Grand Tesoro</Text>
                    <Text paragraph color="gray">Chevrolet Bolt</Text>
                  </Block>
                  <Block>
                    <Text paragraph right color="black">$6,432</Text>
                    <Text paragraph right color="gray">1,232 miles</Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
            <Block style={styles.driver}>
              <TouchableOpacity activeOpacity={0.8}>
                <Block row center>
                  <Block>
                    <Image
                      style={styles.avatar}
                      source={{ uri: 'https://images.unsplash.com/photo-1521657249896-063c0c611fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                    />
                  </Block>
                  <Block flex={2}>
                    <Text h4>Invision App</Text>
                    <Text paragraph color="gray">Tesla Model X</Text>
                  </Block>
                  <Block>
                    <Text paragraph right color="black">$6,432</Text>
                    <Text paragraph right color="gray">1,232 miles</Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
            <Block style={styles.driver}>
              <TouchableOpacity activeOpacity={0.8}>
                <Block row center>
                  <Block>
                    <Image
                      style={styles.avatar}
                      source={{ uri: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                    />
                  </Block>
                  <Block flex={2}>
                    <Text h4>React UI Kit</Text>
                    <Text paragraph color="gray">Volvo Intellisafe</Text>
                  </Block>
                  <Block>
                    <Text paragraph right color="black">$6,432</Text>
                    <Text paragraph right color="gray">1,232 miles</Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
          </Card>


          <Card
            title="TRIPS BY TYPE"
            style={[styles.margin, { marginTop: 18 }]}
          >
            <Block>
              <Text>Chart</Text>
            </Block>
            <Block row space="between" style={{ marginTop: 25 }}>
              <Block>
                <Text h2 light>1,744</Text>
                <Block row center>
                  <Label blue />
                  <Text paragraph color="gray">Confort</Text>
                </Block>
              </Block>
              <Block>
                <Text h2 light>2,312</Text>
                <Block row center>
                  <Label purple />
                  <Text paragraph color="gray">Premium</Text>
                </Block>
              </Block>
            </Block>
          </Card>
          <Button
            icon={
              <Icon
                name="ios-log-out"
                type='ionicon'
                size={30}
                color="white"
              />
            }
            title=" Déconnection"
            id="buttonDeco"
            onPress={() =>this._removePress(navigate)}

          />
        </ScrollView>
        {
          this.state.first && (
            <Overlay isVisible fullScreen={true}>
              <Block flex center middle style={{marginTop:'40%'}}>
                <Text bold h3 style={{ marginTop: 10 }}>Bienvenue</Text>

                <Block row style={{marginTop:60}}>
                  <TouchableWithoutFeedback
                    onPress={() => this.handleType('men')}
                    style={active === 'men' ? styles.activeBorder : null}
                  >
                    <Block
                      center
                      middle
                      style={[
                        styles.card,
                        { marginRight: 20, },
                        active === 'men' ? styles.active : null
                      ]}
                    >
                      {
                        active === 'men' ? (
                          <Block center middle style={styles.check}>
                            {checkIcon}
                          </Block>
                        ) : null
                      }
                      <Block center middle style={styles.icon}>
                        <Text style={{ fontSize:40 }}>👨</Text>
                      </Block>
                      <Text h4 style={{ marginTop: 10 }}>Homme</Text>
                    </Block>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => this.handleType('girl')}
                    style={active === 'girl' ? styles.activeBorder : null}
                  >
                    <Block
                      center
                      middle
                      style={[
                        styles.card,
                        active === 'girl' ? styles.active : null
                      ]}
                    >
                      {
                        active === 'girl' ? (
                          <Block center middle style={styles.check}>
                            {checkIcon}
                          </Block>
                        ) : null
                      }
                      <Block center middle style={styles.icon}>
                      <Text style={{ fontSize:40 }}>👩</Text>
                      </Block>
                      <Text h4 style={{ marginTop: 10  }}>Femme</Text>
                    </Block>
                  </TouchableWithoutFeedback>
                </Block>
                <Block flex style={{marginTop:10}}>
                  <TouchableWithoutFeedback
                    onPress={() => this.handleType('autre')}
                    style={active === 'autre' ? styles.activeBorder : null}
                  >
                    <Block
                      center
                      middle
                      style={[
                        styles.card,
                        { marginRight: 20, },
                        active === 'autre' ? styles.active : null
                      ]}
                    >
                      {
                        active === 'autre' ? (
                          <Block center middle style={styles.check}>
                            {checkIcon}
                          </Block>
                        ) : null
                      }
                      <Block center middle style={styles.icon}>
                        <Text style={{ fontSize:40 }}>👤</Text>
                      </Block>
                      <Text h4 style={{ marginTop: 10 }}>Autre</Text>
                    </Block>
                  </TouchableWithoutFeedback>
                  </Block>
                  <Block center style={{ marginTop: 25 }}>
                    <Button
                      full
                      style={{ marginBottom: 12 }}
                      onPress={() => this.createLogin()}
                    >
                    <Text button>Créer un compte</Text>
                  </Button>
                </Block>
              </Block> 
            </Overlay>
          )
        }
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
  },
  margin: {
    marginHorizontal: 25,
  },
  driver: {
    marginBottom: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
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
    height: 60,
    width: 60,
    borderRadius: 48,
    backgroundColor: theme.colors.lightorange
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
});

export default Overview;