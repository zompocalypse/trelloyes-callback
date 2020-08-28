import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE  from './STORE'

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
};

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}


export default class App extends Component {
  state = {
    store : STORE
  };

  handleNewRandomCard = (listId) => {
    const {lists, allCards} = this.state.store;
    const newCard = newRandomCard();
    const newCards = {...allCards, [newCard.id]: newCard};
    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
	      return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };

  handleDeleteCard = (cardId) => {
    const {lists, allCards} = this.state.store;
    const newCards = omit(allCards, cardId);
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));
    this.setState({
      store: {
        allCards: newCards,
        lists: newLists
      }
    });
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
              onAddCard={this.handleNewRandomCard}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

