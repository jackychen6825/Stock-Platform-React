import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { fetchRacingBarData } from './util/racing_bar_util';
import { getRacingBarData } from './actions/racing_bar_actions';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store = configureStore();
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.fetchRacingBarData = fetchRacingBarData;
    window.getRacingBarData = getRacingBarData;
    
    ReactDOM.render(<Root store={store} />, root); 
})


