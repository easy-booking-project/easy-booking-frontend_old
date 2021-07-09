import { Box, Button, CircularProgress } from '@chakra-ui/react';
import { History } from 'history';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../utils/api_handlers';
import { User } from '../../utils/User';

// eslint-disable-next-line no-shadow
const Home = ({ User }: { User: User }) => {
  const history = useHistory();

  if (!User) {
    history.push('/');
    return <CircularProgress isIndeterminate />;
  }

  const { nickname } = User;

  return (
    <Box>
      Hello, {nickname}!
      <br />
      <Button onClick={() => handleSignOut(history)}>Sign Out</Button>
    </Box>
  );
};

export default Home;

async function handleSignOut(history: History) {
  await signOut();

  history.go(0);
}
