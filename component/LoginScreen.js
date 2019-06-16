import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveStorage, getStorage } from './util/storage';
import FBLogin from './FBLogin';

const styles = StyleSheet.create({
  container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
  },
})

class LoginScreen extends Component {
	static navigationOptions = {
		header: null,
	};
	async componentDidMount() {
		const FBtoken = await getStorage('FBtoken');
		if (FBtoken) {
			this.props.navigation.navigate('MainScreen');
		}
	}
	render() {
		const goMainPage = () => this.props.navigation.navigate('MainScreen');
		return (
			<View style={styles.container}>
				<FBLogin goMainPage={goMainPage} />
			</View>
		);
	}
}

export default LoginScreen;