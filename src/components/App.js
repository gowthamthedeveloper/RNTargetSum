import React from 'react';
import Game from './Game';


class App extends React.Component {

  state = {
    gameId: 1
  };

  resetGame = () => {
    console.log('resetGame');
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1};
    });
    console.log(`gameId= ${this.state.gameId}`);
  };

  render() {
        return(
           <Game key={this.state.gameId} 
                 onPlayAgain={this.resetGame} 
                 randomNumberCount={6} 
                 initialSeconds={10}/>
        );
    }
}

export default App;

