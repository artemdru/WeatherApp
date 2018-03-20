import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import WeatherDisplay from './components/weatherDisplay';
import { Button, FormInput } from 'react-native-elements';

const API_KEY = 'dd6852d95498bd264b4a12dba0729bba';

export default class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      textValue: '',
      weather: ''
    }
  }

  onChangeText(val){
    this.setState({
      textValue: val
    });
  }

  submitZIP(){
    this.fetchWeather(this.state.textValue);
    Keyboard.dismiss();
  }

  fetchWeather(zip){
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + zip.toString() + '&APPID=' + API_KEY)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          // convert from Kelvin to F
          weather: Math.round(9/5*(response.main.temp - 273) + 32),
        });
      });    
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.window}>
          <View style={styles.container}>
            
            <FormInput
              inputStyle={{color:'black',fontSize:25}}
              containerStyle={{marginBottom: 20}}
              keyboardType='numeric'
              placeholder='Enter ZIP'
              onChangeText={(value) => this.onChangeText(value)}
              onSubmitEditing={this.submitZIP.bind(this)}
            />

            <Button 
              title='WEATHER ME!'
              onPress={this.submitZIP.bind(this)}
            />

            {/* RENDER WEATHERDISPLAY IF WEATHER HAS BEEN QUERIED */}
            {this.state.weather ? <WeatherDisplay weather={this.state.weather}/> : <View></View>}
            
            
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  window: {
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'white',
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5
  }
});
