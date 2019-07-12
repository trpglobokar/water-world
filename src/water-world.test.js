import React from 'react';
import ReactDOM from 'react-dom';
import WaterWorld from './water-world';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WaterWorld />, div);
  ReactDOM.unmountComponentAtNode(div);
});
