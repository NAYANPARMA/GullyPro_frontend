import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { storageService } from '../services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        storageService.get('TGG')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)