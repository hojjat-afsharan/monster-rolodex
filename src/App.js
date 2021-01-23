import { Component } from "react";

import { CardList } from "./components/card-list/card-list.component";
import {SearchBox} from './components/search-box/search-box.component';

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  fakeMonsters = [
    { id: 1, name: "frankenstein" },
    { id: 2, name: "Zombie" },
    { id: 3, name: "Dracula" },
  ];

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }))
      .catch((error) => {
        console.error(error);
        console.warn("Using fake monster data");
        this.setState({ monsters: this.fakeMonsters });
      });
  }

  handleChanges = (e) => {
    this.setState({ searchField: e.target.value }, () => console.log(this.state));
  }

  render() {

    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField));

    return (
      <div className="App">
        
      <h1>Monster Roledex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChanges={this.handleChanges}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
