import { CircularProgress } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeLazy = React.lazy(() => import('../pages/Home') as never);
const SignInLazy = React.lazy(() => import('../pages/SignIn') as never);
const SignUpLazy = React.lazy(() => import('../pages/SignUp') as never);

const BasicRoute = () => {
  return (
    <Suspense fallback={<CircularProgress isIndeterminate />}>
      <Switch>
        <Route exact path="/" component={HomeLazy} />
        <Route exact path="/signin" component={SignInLazy} />
        <Route exact path="/signup" component={SignUpLazy} />
      </Switch>
    </Suspense>
  );
};

export default BasicRoute;
