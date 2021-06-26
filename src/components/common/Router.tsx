import { CircularProgress } from '@chakra-ui/react';
import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth, { AuthState } from '../../utils/store';

const HomeLazy = React.lazy(() => import('../pages/Home') as never);
const SignInLazy = React.lazy(() => import('../pages/SignIn') as never);
const SignUpLazy = React.lazy(() => import('../pages/SignUp') as never);

const validate = async (
  useAuth: AuthState,
  componentMounted: () => void,
  setLoading: (loading: boolean) => void,
  setLoggedIn: (loggedIn: boolean) => void,
) => {
  const result = await useAuth.validate();

  if (result.authenticated) {
    setLoggedIn(true);
  }

  setLoading(false);

  componentMounted();
};

const BasicRoute = () => {
  const useAuth = Auth.useContainer();

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const willMount = React.useRef(true);

  const componentMounted = () => {
    willMount.current = false;
  };

  if (willMount.current) {
    validate(useAuth, componentMounted, setLoading, setLoggedIn);
    willMount.current = false;
  }

  if (willMount.current || loading) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <Suspense fallback={<CircularProgress isIndeterminate />}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return <HomeLazy />;
          }}
        >
          {loggedIn ? <Redirect to="/Home" /> : <Redirect to="/signin" />}
        </Route>
        <Route
          exact
          path="/Home"
          component={() => {
            return <HomeLazy />;
          }}
        />
        <Route exact path="/signin">
          {loggedIn ? <Redirect to="/Home" /> : <SignInLazy />}
        </Route>
        <Route exact path="/signup" component={SignUpLazy} />
      </Switch>
    </Suspense>
  );
};

export default BasicRoute;
