import React, { useState } from "react";
import ReactDOM from "react-dom";

import DeckList from "./components/DeckList";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

import { fetchCards } from "./api";

import "./index.css";

import axios from "axios";

const App = () => {
  console.log("rendering APP");

  const [results, setResults] = useState([]);
  const [deck, setDeck] = useState([]);

  const addCardToDeck = ({ id, name }) => {
    const nextDeck = [...deck];
    const index = nextDeck.findIndex((card) => card.id === id);

    if (index > -1) {
      nextDeck[index].count += 1;
    } else {
      nextDeck.push({
        id,
        name,
        count: 1,
      });
    }

    setDeck(nextDeck);
  };

  const removeCardFromDeck = ({ id }) => {
    const nextDeck = [...deck];
    const index = nextDeck.findIndex((card) => card.id === id);

    if (index === -1) {
      return;
    }

    if (nextDeck[index].count === 1) {
      nextDeck.splice(index, 1);
    } else {
      nextDeck[index].count -= 1;
    }

    setDeck(nextDeck);
  };

  return (
    <div id="app">
      <SearchBar setResults={setResults} />
      <SearchResults
        results={results}
        removeCardFromDeck={removeCardFromDeck}
        addCardToDeck={addCardToDeck}
      />
      <DeckList
        deck={deck}
        removeCardFromDeck={removeCardFromDeck}
        addCardToDeck={addCardToDeck}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
