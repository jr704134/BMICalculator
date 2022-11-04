import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const key = '@MyApp:key';

export default class App extends Component {
  state = {
    height: 0,
    weight: 0,
    storedValue: 0,
  };

  onSave = async () => {
    const { height } = this.state;

    try {
      await AsyncStorage.setItem(key, height.toString());
      Alert.alert('Saved', 'Your data was saved')
    } catch (error) {
      Alert.alert('Error', 'Data was not saved');
    }
  }

  onChange = (height) => {
    this.setState({height});
  }

  calcBMI = () => {
    const { height, weight } = this.state;
    const bmi = (weight / ( height * height ) ) * 703;

    const BMI = "Body Mass Index is " + bmi;
  }
  
  render() {
    const { height } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
          <ScrollView style={styles.view}>
            <TextInput style={styles.input}
            placeholder='Weight in Pounds'/>
            <TextInput style={styles.input}
            onChangeText={this.onChange}
            value={height}
            placeholder='Height in Inches'></TextInput>
            <TouchableOpacity onPress={this.onSave} style={styles.button}>
              <Text style={styles.buttontext}>Compute BMI</Text>
            </TouchableOpacity>
            <Text style={styles.BMIDisplay}></Text>
              <Text style={styles.assessment}>Assessing Your BMI</Text>
              <Text style={styles.assessment1}>Underweight: less than 18.5</Text>
              <Text style={styles.assessment1}>Healthy: 18.5 to 24.9</Text>
              <Text style={styles.assessment1}>Overweight: 25.0 to 29.9</Text>
              <Text style={styles.assessment1}>Obese: 30.0 or higher</Text>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    padding: 10,
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    height: 40,
    marginBottom: 10,
    fontSize: 24,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
  buttontext: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  BMIDisplay: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 20,
  },
  assessment: {
    paddingTop: 140,
    fontSize: 20,
  },
  assessment1: {
    fontSize: 20,
    paddingLeft: 20,
  }
});
