import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { saveStorage, getStorage } from './util/storage';
import { get } from './util/http';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
    borderRadius: 25,
    height: 50,
    width: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})

export default class FBLogin extends Component {

  FBLoginTrigger() {
    const context = this;
    LoginManager.logInWithReadPermissions(["email", "public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            async (data) => {
              const FBtoken = data.accessToken.toString();
              await saveStorage('FBtoken', FBtoken);
              const userFbInfo = await get(`https://graph.facebook.com/me?access_token=${FBtoken}&fields=id,name,picture,email,friendlists,birthday`);
              await saveStorage('userFbInfo', JSON.stringify(
                userFbInfo
              ));
              context.props.goMainPage();
            }
          )
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    );
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.FBLoginTrigger()}
          >
          <Text style={styles.text}>Login with FB</Text>
        </TouchableOpacity>
      </View>
    );
  }
};