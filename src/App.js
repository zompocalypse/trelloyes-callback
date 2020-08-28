import React, { Component } from 'react';
import List from './List'
import './App.css';
import {lists, allCards} from './STORE';

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
    lists, allCards
  };

  handleNewRandomCard = (listId) => {
    const newCard = newRandomCard();
    this.setState((prevState) => {
      const {lists, allCards} = prevState;
      return {
        lists: lists.map(list => (
          list.id === listId ? {...list, cardIds: [...list.cardIds, newCard.id]} : list
        )),
        allCards: {...allCards, [newCard.id]: newCard}
      }
    })
  }

  handleDeleteCard = (cardId) => {
    this.setState((prevState) => {
      const {lists, allCards} = prevState;
      return {
        lists: lists.map(list => ({
          ...list,
          cardIds: list.cardIds.filter(id => id !== cardId)
        })),
        allCards: omit(allCards, cardId)
      };
    });
  }


  render() {
    const { lists, allCards } = this.state;
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

