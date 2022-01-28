import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {

    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired
    }

    handlePress = () => {
        // console.log(this.props.id);
        if (this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    } 
}

const styles = StyleSheet.create( {
    random: {
        fontSize: 35,
        width: 150,
        padding: 5,
        marginHorizontal: 15,
        marginVertical: 25,
        backgroundColor: '#999',
        textAlign: 'center',
        fontWeight: '500',
        color: 'black'
    },
    disabled: {
        opacity: 0.3
    }
});

export default RandomNumber;
