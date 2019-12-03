import React from 'react';
import ReactDOM from 'react-dom';
import { MessageBoard } from './MessageBoard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessageBoard />, div);
  ReactDOM.unmountComponentAtNode(div);
});