import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class weatherDisplay extends React.Component {
    render(){
        return(
            <View>
                <Text h1 style={{fontSize:100, textAlign:'center'}}>{this.props.weather}
                    <Text h1 style={{fontSize:50}}>°F</Text>
                 </Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('weatherDisplay', () => weatherDisplay);