import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Main, IntroductionMain } from '@containers/index';

const renderRouter = (
  rest: any,
  condition: boolean,
  Component: any,
  path: string
) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (condition) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: path,
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const PrivateComponent = ({ component: Component, auth, ...rest }: any) => {
  return renderRouter(rest, auth, Component, '/');
};

const PublicComponent = ({ component: Component, auth, ...rest }: any) => {
  return renderRouter(rest, !auth, Component, '/home');
};

const routes = (token : string) => {
  return (
    <Router>
      <Switch>
        <PublicComponent
          auth={Boolean(token)}
          path='/'
          exact
          component={Main}
        />
        <PrivateComponent auth={Boolean(token)} path='/home' component={IntroductionMain} />
      </Switch>
    </Router>
  );
};

export default routes;