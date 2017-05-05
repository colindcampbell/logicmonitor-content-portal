import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss';
import { Style } from 'radium'
import normalize from 'radium-normalize';


// App container in the DOM
const app = document.getElementById('app');

render(
  <Router history={browserHistory} routes={routes}>
		<Style rules={normalize} />
  </Router>, app
);