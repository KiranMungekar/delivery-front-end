import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ProductList from './components/productList';
import ProductEdit from './components/productEdit';
import HomeComponent from './components/HomeComponent';
import LocationComponent from './components/LocationComponent';
import TransportComponent from './components/TransportProduct';
import  ReportComponent from './components/ReportComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/productList">Products</Link>
          </div>
          <div>
            <Link to="/transport">Transport</Link>
          </div>
          <div>
            <Link to="/locations">Locations</Link>
          </div>
          <div>
            <Link to="/report">Report</Link>
          </div>
        </div>
        <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/productList" component={ProductList} />
        <Route exact path="/product" component={ProductEdit} />
        <Route exact path="/locations" component={LocationComponent} />
        <Route exact path="/transport" component={TransportComponent} />
        <Route exact path='/report' component={ReportComponent}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
