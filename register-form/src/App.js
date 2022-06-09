import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Register } from "./pages/Register/register";
import { Success } from "./pages/Success/success";
import goodgif from "./assets/GODRICK.gif";
import goodsong from "./assets/goodsong.mp3";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route exact path="/success/:name">
            <Success goodgif={goodgif} goodsong={goodsong} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
