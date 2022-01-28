import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

import {View, Text, StyleSheet, Button} from 'react-native';

class Game extends React.Component {

static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
}

state = {
    selectedIDs: [],
    remainingSeconds: this.props.initialSeconds
};

gameStatus = 'PLAYING';

componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
            return {remainingSeconds: prevState.remainingSeconds - 1};
        }, () => {
            if (this.state.remainingSeconds === 0){
                clearInterval(this.intervalId);
            }
        });
    }, 1000);
}

componentWillUpdate(nextProps, nextState) {
    
    //This life cycle method will call before render methods
    if (nextState.selectedIDs !== this.state.selectedIDs || nextState.remainingSeconds === 0)
    {
        this.gameStatus = this.calcGameStatus(nextState)

        if (this.gameStatus !== "PLAYING")
        {
            clearInterval(this.intervalId);
        }
    }

    return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
}

componentWillUnmount() {
    clearInterval(this.intervalId);
}

isNumberSelected = (numberIndex) => {
    return this.state.selectedIDs.indexOf(numberIndex) >= 0;
};

randomNumbers = Array.from({length: this.props.randomNumberCount})
                    .map( () => 1 + Math.floor(10 * Math.random()))

target = this.randomNumbers.slice(0, this.props.randomNumberCount -2)
                      .reduce((acc, curr) => acc + curr, 0)

shuffledRandomNumbers = shuffle(this.randomNumbers);

selectNumber = (numberIndex) => {

    // this.state.selectedIDs.map((number) =>
    //     console.log(number)
    // );
    // console.log(numberIndex);
    this.setState((prevState) => ({         
        selectedIDs: [...prevState.selectedIDs, numberIndex]
    }));
};

calcGameStatus = (nextState) => {
    console.log('calcGameStatus');

    const sumSelected = nextState.selectedIDs.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
    
    console.log(sumSelected);

    if (nextState.remainingSeconds === 0) {
        return 'LOSE';
    }

    if (sumSelected < this.target) {
        return 'PLAYING';
    }

    if (sumSelected === this.target) {
        return 'WON';
    }
    
    if (sumSelected > this.target) {
        return 'LOSE';
    }
}

  render() {

    const gameStatus = this.gameStatus;

        return(
            <View style={styles.container}>
                <Text style={styles.logText}>{this.gameStatus}</Text>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {
                        this.shuffledRandomNumbers.map((randomNumber, index) =>
                          <RandomNumber key={index} 
                                        id={index}
                                        number={randomNumber}
                                        isDisabled={
                                            this.isNumberSelected(index) || 
                                            gameStatus !== 'PLAYING'}
                                        onPress={this.selectNumber}/>
                        )
                    }
                </View>
                {this.gameStatus !== 'PLAYING' && (
                    <Button style={styles.playAgainButton} title='Play Again' onPress={this.props.onPlayAgain} />
                )}
                <Text style={styles.logText}>{this.state.remainingSeconds}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 40
    },
    target: {
        fontSize: 40,
        padding: 10,
        marginHorizontal: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    randomContainer: {
        flex: 1,
        marginTop: 60,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    playAgainButton: {
        marginHorizontal: 50,
    },
    logText: {
        textAlign: 'center',
        padding: 25,
        color: 'black',
        fontSize: 20
    },
    STATUS_PLAYING: {
        backgroundColor: '#aaa'
    },
    STATUS_WON: {
        backgroundColor: 'green'
    },
    STATUS_LOSE: {
        backgroundColor: 'red'
    }
});

export default Game;
