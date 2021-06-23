import { Box, Button, CircularProgress } from '@chakra-ui/react';
import React from 'react';
import { signOut } from '../../utils/api_handlers';
import Auth from '../../utils/store';
import { User } from '../../utils/User';

const Home = () => {
  const useAuth = Auth.useContainer();

  console.log(useAuth.auth.authenticated);

//   if (!User) {
//     window.location.hash = '/';
//     return <CircularProgress isIndeterminate />;
//   }

//   const { nickname } = User;

  return (
    <Box>
      Hello, nickname!
      {/* Hello, {nickname}! */}
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
