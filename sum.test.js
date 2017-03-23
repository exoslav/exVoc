import React from 'react';
import Header from './app/js/components/Header';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/*
test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Header title="JEST test">Facebook</Header>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
*/

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});














/*
const sum = require('./app/js/components/Header');
//const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
*/