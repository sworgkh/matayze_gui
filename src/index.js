import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Management from './Screens/management_interface/management_index'
import Hall from './Screens/hall_interface/hall_index'
import SiteInterface from './Screens/site_interface/interface_index'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


const routing = (
    <Router>
        <div>
            {/*<ul>*/}
                {/*<li>*/}
                    {/*<Link to="/">Home</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/management_index">Management</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/interface_index">SiteInterface</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/hall_index">Hall</Link>*/}
                {/*</li>*/}
            {/*</ul>*/}
            <Route exact path="/" component={App} />
            <Route path="/management_index" component={Management} />
            <Route path="/interface_index" component={SiteInterface} />
            <Route path="/hall_index" component={Hall} />
        </div>
    </Router>
)


// const routing = (
// //     <Router>
// //         <div>
// //             <Route path="/index" component={App} />
// //             <Route path="/management_index" component={Management} />
// //             <Route path="/interface_index" component={SiteInterface} />
// //             <Route path="/hall_index" component={Hall} />
// //         </div>
// //     </Router>
// // )


ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
