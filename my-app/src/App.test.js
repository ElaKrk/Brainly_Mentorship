import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import MainPage from './features/MainPage'

it('set correct className on header', () => {
  const wrapper = shallow(<App />);
  const header = wrapper.find("header");
  expect(header).toHaveLength(1);
  expect(header.props().className).toEqual("App-header");
});

it('displays correct components in header', () => {
  const wrapper = shallow(<App />);
  const header = wrapper.find("header");
  expect(header.find("img")).toHaveLength(1);
  expect(header.find("h1")).toHaveLength(1);
});

it('app renders MainPage', () => {
  const wrapper = shallow(<App />);
  const mainPage = wrapper.find(MainPage);
  expect(mainPage).toHaveLength(1);
});

