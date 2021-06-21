import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { fetchUser, signOut } from '../../utils/api_handlers';
import { User } from '../../utils/User';

// import 'react-big-calendar/lib/sass/styles';
import './HomeCalendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Home: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchAndSetUser(setUser);
  }, []);

  return (
    <Box height="500">
      Hello, {user?.nickname}!
      <br />
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Calendar localizer={localizer} events={[]} style={{ height: '500' }} />
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
