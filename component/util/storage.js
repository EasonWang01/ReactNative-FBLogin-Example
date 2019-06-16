import { AsyncStorage } from 'react-native';

export async function saveStorage(name, value) {
  try {
    await AsyncStorage.setItem(name, value);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getStorage(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return (value);
    }
  } catch (error) {
    console.log(error);
  }
};