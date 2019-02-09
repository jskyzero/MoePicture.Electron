# React
`jskyzero` `2018/12/13`

So, here is a react playground, for I must try react and compare with angular.

## Main Concepts

+ Hello World
  + `ReactDOM.render()`
  + JavaScript grammer like `=>`, `class`, \`$(variable)\`, `let`, `const`
+ JSX
  + `const h1 = (<h1>text</h1>);`
  + `const img = (<img src={usr.avatarUrl} />);`
+ Render
  + `ReactDOM.render(element, document.getElementById("root"));`
  + `function tick() {}; setInterval(tick, 1000);`
+ Components & Props
  + `function Hello(Props) { return (<p>props.name</p>); };`
  + make Props read only
+ State & Lifecycle
  + 
  ```js
  class xxx extend ReactDOM.component {
    constructor() {}
    componentDidMount() {}
    componentWillUnMount() {}
    tick() {}
    render() { return () }
  }
  ```
+ Handling Event
+ Conditional Rendering
+ Lists and Keys
+ Forms
+ Lifting State Up
+ Compositions Vs Inheritance
+ Think in React