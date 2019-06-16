import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { saveStorage, getStorage } from './util/storage';
import { LoginManager } from 'react-native-fbsdk';

class MainScreen extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor() {
		super();
		this.state = {
			userFbInfo: {
			}
		}
	}
	async componentDidMount() {
		const userFbInfo = await getStorage('userFbInfo');
		if (!userFbInfo) this.props.navigation.navigate('LoginScreen');
		this.setState({ userFbInfo: JSON.parse(userFbInfo) });
	}
	logOut() {
		LoginManager.logOut();
		AsyncStorage.removeItem('FBtoken');
		AsyncStorage.removeItem('userFbInfo');
		this.props.navigation.navigate('LoginScreen');
	}
	render() {
		return (
			<View>
				<Text>Main Screen</Text>
				<Text>{this.state.userFbInfo.name}</Text>
				<Button
					title="LogOut"
					onPress={() => this.logOut()}
				/>
			</View>
		);
	}
}

export default MainScreen;