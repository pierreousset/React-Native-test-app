import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._storageAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _storageAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('User  :', userToken);
    
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}