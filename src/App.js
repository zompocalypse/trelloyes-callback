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
  
  lists = this.state.store.lists;
  allCards = this.state.store.lists;

  handleNewRandomCard = (listId) => {
    const newCard = newRandomCard();
    const newCards = {...this.allCards, [newCard.id]: newCard}
    this.setState({
      store: {
        allCards: newCards,
      }
    });
  }

  handleNewList = (listId) => {
    const newCard = newRandomCard();
    const newCards = {...this.allCards, [newCard.id]: newCard}
    const newList = this.lists.map(list => 
      {
      //({...lists, cardIds: newCard}));
    
      if (list.id === listId){
        list.cardIds.push(newCards.id)
      }
    });
      console.log(newList);
      //console.log(newList);
      // this.setState({
      //   store: {
      //     allCards: newCards,
      //     lists: newList
      //   }
      // });
    
  }

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
          {this.lists.map(list => (
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
};

