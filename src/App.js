import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Course from "./Page/course";
import Cart from "./Page/Cart";
import Payment from "./Page/Payment"
import SearchedCourse from "./Page/SearchedCourse"
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Cart">
            <Cart/>
          </Route>
          <Route path="/Payment">
            <Payment/>
          </Route>
          <Route path="/" >
            <Course/>
          </Route>
          <Route path="/Course">
            <Course/>
          </Route>
          <Route path="/SearchedCourse">
            <SearchedCourse/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
