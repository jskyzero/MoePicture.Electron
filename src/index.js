import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

const user = {
  name: "jskyzero",
  email: "jskyzero@outlook.com",
};

let formatName = (user) => {
  return `${user.name}(${user.email})`;
}

class WelcomeUser extends React.Component {
  render = () => {
    return (
      <div>
        <p>welcome {formatName(this.props.user)}</p>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date });
  }
  render = () => {
    return (
      <p>Now time is {this.state.date.toLocaleTimeString()}</p>
    );
  }
}

class Header extends React.Component {
  render = () => {
    return (
      <div>
        <h1>Timer!</h1>
        <WelcomeUser user={this.props.user}></WelcomeUser>
        <Clock></Clock>
      </div>
    );
  }
}

ReactDOM.render(
  <Header user={user} />,
  document.getElementById("root")
);