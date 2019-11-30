import React from 'react';
import ReactDOM from 'react-dom';
import { PersonalChatSection } from './PersonalChatSection';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(PersonalChatSection, div);
    ReactDOM.unmountComponentAtNode(div);
  });
