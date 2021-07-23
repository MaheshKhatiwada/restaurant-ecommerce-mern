
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Header from  './components/Header.js'
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App=()=> {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/dashboard/admin" component={AdminDashboard}/>
          <Route exact path="/dashboard/user" component={UserDashboard}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
