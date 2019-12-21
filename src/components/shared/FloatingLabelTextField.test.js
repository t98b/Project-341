import React from 'react';
import ReactDOM from 'react-dom';
import { FloatingLabelTextField } from './FloatingLabelTextField';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FloatingLabelTextField />, div);
  ReactDOM.unmountComponentAtNode(div);
});
