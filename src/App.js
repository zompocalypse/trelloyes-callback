import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE  from './STORE'

export default class App extends Component {
  state = {
    store : STORE
  };

  omit(obj, keyToOmit) {
    let {[keyToOmit]: _, ...rest} = obj;
    return rest;
  };

  handleDeleteCard = (cardId) => {
    const {lists, allCards} = this.state.store;
    const newCards = this.omit(allCards, cardId);
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));
    this.setState({
      store: {
        allCards: newCards,
        lists: newLists
      }
    })
  }


  render() {
    const { lists, allCards } = this.state.store;
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => allCards[id])}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

