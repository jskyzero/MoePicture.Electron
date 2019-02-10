import React from 'react';
import ImageGridItem from './ImageGridItem'
import WebSite from '../services/website';


class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      url: 'https://yande.re/post.xml?limit=100'
    };
  }

  componentDidMount() {
    let website = new WebSite(this.state.url);
    website.GetItems().then((items) => {
      this.setState({items: items})
    });
    // let str = xml.getElementsByTagName("post").item(0).getAttribute("sample_url");
    // this.setState({txt: str});
  }

  componentWillUnmount() {

  }

  render = () => {
    let items = this.state.items ? this.state.items.map((item) => {
      return <ImageGridItem key={item.id} item={item}/>
    }) : null;

    return (
      <div>
        <canvas>
        {/* style={"background-url: https://files.yande.re/sample/09919d7ce26350f19b46bde905821908/yande.re%20516608%20sample%20chibi%20cleavage%20dress%20fate_grand_order%20heels%20jeanne_d%27arc%20jeanne_d%27arc_%28fate%29%20no_bra%20stockings%20symmetrical_docking%20thighhighs%20tonchan.jpg;" */}
          {/* <div></div> */}
        </canvas>
          {/* {items} */}
      </div>
    )
  }

}

export default ImageGrid;
