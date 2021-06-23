import { Box, Button, CircularProgress } from '@chakra-ui/react';
import React from 'react';
import { signOut } from '../../utils/api_handlers';
import Auth from '../../utils/store';

const Home = () => {
  const useAuth = Auth.useContainer();

  if (!useAuth.auth.authenticated) {
    window.location.hash = '/';
    return <CircularProgress isIndeterminate />;
  }

  const nickname = useAuth.auth.username;

  return (
    <Box>
      Hello, {nickname}!
      <br />
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Box>
  );
};

export default Home;

async function handleSignOut() {
  await signOut();
  // TODO consider using useHistory hook
  window.location.reload();
}
