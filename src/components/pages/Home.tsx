import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchUser, signOut } from '../../utils/api_handlers';
import { User } from '../../utils/User';
import Calendar from '../common/calendar/calendar';


const Home: React.FC = () => {
  const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   fetchAndSetUser(setUser);
  // }, []);

  return (
    <Box>
      Hello, {user?.nickname}!
      <br />
      <Button onClick={handleSignOut}>Sign Out</Button>

      <Calendar/>
    </Box>
  );
};

export default Home;

async function fetchAndSetUser(setUser: (user: User) => void) {
  try {
    const response = await fetchUser();
    if (response.ok) {
      setUser(await response.json());
    } else {
      // TODO consider using useHistory hook
      window.location.hash = '/signin';
    }
  } catch {
    // TODO consider using useHistory hook
    window.location.hash = '/signin';
  }
}

async function handleSignOut() {
  await signOut();
  // TODO consider using useHistory hook
  window.location.hash = '/signin';
}