import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE  from './STORE'

export default class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store : STORE
  };

  handleDeleteCard = (cardId) => {
    console.log('delete clicked')
    const {lists, allCards} = this.state.store;
    // const newCards = allCards.filter(id => id !== cardId);
    // const newList = lists;
    console.log(lists);
    console.log(allCards);
    // this.setState({
    //   store: newCards
  }


  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

