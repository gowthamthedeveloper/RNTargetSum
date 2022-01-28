import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

class Launch extends React.Component {
  render() {
        return(
            <View style={styles.container}>
                <Text style={[styles.title]}>TARGET SUM</Text>
                <Text style={[styles.subtitle]}>Number Puzzle</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'purple',
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
});

export default Launch;
