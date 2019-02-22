import * as React from "react";
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import Navigation from './components/Navigation';


export class App extends React.Component {
  render() {
    return (
      <UWPThemeProvider
        theme={getTheme({
          themeName: "light", // set custom theme
          accent: "#0078D7", // set accent color
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage: "/img/bg.jpg"
          // set global desktop background image
        })}
      >
        <Navigation />
      </UWPThemeProvider>
    )
  }
}

export default App;
