import { CircularProgress } from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth, { AuthState } from '../../utils/store';

const HomeLazy = React.lazy(() => import('../pages/Home') as never);
const SignInLazy = React.lazy(() => import('../pages/SignIn') as never);
const SignUpLazy = React.lazy(() => import('../pages/SignUp') as never);

const validate = async (useAuth: AuthState, componentMounted: () => void) => {
  const result = await useAuth.validate();

  useAuth.login(result.username);

  console.log('--- inside validate ---', result, useAuth.auth);

  componentMounted();
};

// const componentMounted = (ref: React.MutableRefObject<boolean>) => {
//   ref.current = false;
// };

// const useComponentWillMount = async (func: () => void) => {
//   const willMount = React.useRef(true);

//   if (willMount.current) func();
// };

const BasicRoute = () => {
  const useAuth = Auth.useContainer();

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const willMount = React.useRef(true);

  const componentMounted = () => {
    willMount.current = false;
  };

  if (willMount.current) {
    validate(useAuth, componentMounted);
    willMount.current = false;
    validate(useAuth, componentMounted);
  }

  console.log('--- will mount ---', willMount.current);

  //   useComponentWillMount(validate(useAuth, componentMounted));
  //   useEffect(() => {
  //     async function validate() {
  //       const result = await useAuth.validate();
  //       console.log('me', useAuth.auth.authenticated, result);
  //       setLoggedIn(result);
  //       setLoading(false);
  //     }

  //     setLoading(true);
  //     validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (willMount.current || loading) {
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
