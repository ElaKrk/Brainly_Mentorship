import React from 'react';
import {shallow} from 'enzyme';
import Counter, {Button, Button2} from './Counter';

it('has correct initial state', () => {
    const wrapper = shallow(<Counter />);
    const span = wrapper.find("span");
    expect(span.props().children).toBe(0);
});

it('does not show button when inital state is zero', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.find(Button).length).toBe(0);
})

it('update state after click', () => {
    const wrapper = shallow(<Counter />);
    const button2 = wrapper.find(Button2);
    const span = wrapper.find("span");

    expect(span.props().children).toBe(0);

    button2.props().onClick();
    wrapper.update();

    const newSpan = wrapper.find("span");
    expect(newSpan.props().children).toBe(2);  
});

it('shows reset button after click', () => {
    const wrapper = shallow(<Counter />);
    const button2 = wrapper.find(Button2);

    button2.props().onClick();
    wrapper.update();

    const button = wrapper.find(Button);
    expect(button.props().children).toBe("reset");
});