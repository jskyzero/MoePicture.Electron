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

let formatName = (user) => {
  return `${user.name}(${user.email})`;
}

const user = {
  name: "jskyzero",
  email: "jskyzero@outlook.com",
};

class WelcomeUser extends React.Component {
  render = () => {
    return (
      <div>
        <p>welcome {formatName(this.props.user)}</p>
      </div>
    );
  }
}

let ticker = () => {
  const time = (new Date().toLocaleTimeString());

  // same to React.createElement()
  const element = (
    <div>
      <h1>Timer!</h1>
      <WelcomeUser user={user}></WelcomeUser>
      <p>Now time is {time}</p>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById("root")
  );
}

// render will only update changed part
setInterval(ticker, 1000);