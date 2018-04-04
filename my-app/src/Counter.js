import React from 'react';

export const Button = props => {
    console.log("render", <div />);
    return <button onClick={props.onClick}>{props.children}</button>;
  };
  
  export class Button2 extends React.Component {
    render() {
      return <button onClick={this.props.onClick}>{this.props.children}</button>;
    }
  }
  
  let _x = 0;
  const incrementX = () => {
    return _x++;
  }
  
  class Counter extends React.Component {
    state = { counter: 0 };
  
    increment = () => {
      this.setState(prevState => {
        console.log("incrementing", this.state.counter, prevState.counter);
  
        return {
          counter: prevState.counter + 1
        };
      });
    };
    reset = () => {
      this.setState({ counter: 0 });
    };
    handleClick = () => {
      this.increment();
      this.increment();
    };
  
    render() {
      return (
        <div>
          <Button2 onClick={this.handleClick}>increment</Button2>
          {this.state.counter > 0 && <Button onClick={this.reset}>reset</Button>}
          <span>{this.state.counter}</span>
        </div>
      );
    }
  }

  export default Counter;