import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import * as serviceWorker from './serviceWorker';


class MoePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { txt: null };
  }

  componentDidMount() {
    axios.get('https://yande.re/post.xml?limit=100')
      .then(response => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(response.data, "application/xml");
        let str = xml.getElementsByTagName("post").item(0).getAttribute("sample_url");
        // axios.get(str).then(response =>{
        // this.setState({txt: "data:image/png;base64," + response.data});
        // })
        this.setState({txt: str});
      })
  }

  componentWillUnmount() {

  }

  render() {
    return <img alt={this.state.txt} src={this.state.txt}></img>
  }
}


let img = (<img alt="img"></img>)

ReactDOM.render(<MoePicture />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
