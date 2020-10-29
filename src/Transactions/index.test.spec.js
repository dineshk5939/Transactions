import React from 'react';
import renderer from 'react-test-renderer';
import Transactions from './index';

it('renders correctly', () => {
  const tree = renderer.create(<Transactions />).toJSON();
  expect(tree).toMatchSnapshot();
});
