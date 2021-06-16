import { Box, Button, CircularProgress } from '@chakra-ui/react';
import React from 'react';
import { signOut } from '../../utils/api_handlers';
import { User } from '../../utils/User';

// eslint-disable-next-line no-shadow
const Home = ({ User }: { User: User }) => {
  if (!User) {
    window.location.hash = '/';
    return <CircularProgress isIndeterminate />;
  }

  const { nickname } = User;

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
