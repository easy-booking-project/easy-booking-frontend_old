import { CircularProgress } from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../../utils/store';

const HomeLazy = React.lazy(() => import('../pages/Home') as never);
const SignInLazy = React.lazy(() => import('../pages/SignIn') as never);
const SignUpLazy = React.lazy(() => import('../pages/SignUp') as never);

const BasicRoute = () => {
  const useAuth = Auth.useContainer();

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function validate() {
      const result = await useAuth.validate();
      console.log('me', useAuth.auth.authenticated, result);
      setLoggedIn(result);
      setLoading(false);
    }

    setLoading(true);
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <CircularProgress isIndeterminate />;
  }

  console.log('--router ---', loggedIn);

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
