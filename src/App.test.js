import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';
import PlayersList from './components/PlayersList/PlayersList'
import AddPlayer from './components/AddPlayer/AddPlayer'

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {
  const appComponent = shallow(<App />);
  let players = [
    {
      name: 'Kunegunda',
      score: 0,
    }    
  ];
  appComponent.setState({ players });
  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state('players');

  expect(5).toEqual(playersAfterUpdate[0].score);
});

it('should add new player', () => {
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Ania');
  const players = appComponent.state('players');

  
  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual('Ania');
  expect(players[0].score).toEqual(0);
  
});

it('should remove player', () => {
  const appComponent = shallow(<App />);
  let players = [
    {
      name: 'Kunegunda',
      score: 5,
    },
    {
      name: 'Antoś',
      score: 0,
    },  
  ];
  appComponent.setState({ players });
  const onPlayerRemove = appComponent.find(PlayersList).prop('onPlayerRemove');
  onPlayerRemove(0);

  const playersAfterRemove = appComponent.state('players');

  expect('Antoś').toEqual(playersAfterRemove[0].name);
});
