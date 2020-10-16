import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Mapper from './pages/Map';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={Mapper}/>

                <Route path="/orphanages/:id" component={Orphanage}/>
                <Route path="/create" component={CreateOrphanage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
