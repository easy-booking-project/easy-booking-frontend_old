import { CircularProgress } from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { fetchUser } from '../../utils/api_handlers';
import { User } from '../../utils/User';

const HomeLazy = React.lazy(() => import('../pages/Home') as never);
const SignInLazy = React.lazy(() => import('../pages/SignIn') as never);
const SignUpLazy = React.lazy(() => import('../pages/SignUp') as never);

const BasicRoute = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    userLoggedIn(setUser, setLoading);
  }, []);

  if (loading) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <Suspense fallback={<CircularProgress isIndeterminate />}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return <HomeLazy User={user} />;
          }}
        >
          {user ? <Redirect to="/Home" /> : <Redirect to="/signin" />}
        </Route>
        <Route
          exact
          path="/Home"
          component={() => {
            return <HomeLazy User={user} />;
          }}
        />
        <Route exact path="/signin">
          {user ? <Redirect to="/Home" /> : <SignInLazy />}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/Home" /> : <SignUpLazy />}
        </Route>
      </Switch>
    </Suspense>
  );
};

export default BasicRoute;

async function userLoggedIn(setUser: (user: User | undefined) => void, setLoading: (loading: boolean) => void) {
  try {
    const response = await fetchUser();
    if (response.ok) {
      setUser(await response.json());
    }
  } catch (e) {
    setUser(undefined);
  }

  setLoading(false);
}
