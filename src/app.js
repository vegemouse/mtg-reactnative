import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import { Card, CardSection, Header, Button, Input, Spinner } from './components/common';


class App extends Component {
  state = { inputtedCard: '', foundCards: [], hasSearched: false, isLoading: false };

  onButtonPress() {
    const { inputtedCard } = this.state;
    this.setState({ isLoading: true });

    axios.get(`https://api.magicthegathering.io/v1/cards/?name=${inputtedCard}`)
      .then(response => this.setState({ foundCards: response.data.cards, hasSearched: true, isLoading: false }));

  }

  renderCards() {
    if (this.state.hasSearched) {
      return this.state.foundCards.map(foundCard =>
      (
        <CardSection key={foundCard.id}>
          <Text>
            {foundCard.name}
          </Text>
        </CardSection>
      )
    );
    }
  }

  renderButton() {
    if (this.state.isLoading) {
      return <Spinner />
    } else {
      return <Button onPress={this.onButtonPress.bind(this)}>Search</Button>
    }
  }

  render() {
    return (
      <ScrollView>
        <Header headerText="Magic Card Search" />
        <Card>
          <CardSection>
            <Input
              placeholder="Jace, the Mind Sculptor"
              label="Card Name"
              value={this.state.inputtedCard}
              onChangeText={inputtedCard => this.setState({ inputtedCard })}
            />
          </CardSection>
          <CardSection>
            {this.renderButton()}
          </CardSection>
            {this.renderCards()}
        </Card>
      </ScrollView>
    );
  }
}


export default App;
