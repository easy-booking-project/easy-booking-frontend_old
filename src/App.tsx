import * as React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Router from './components/common/Router';

const App = () => {
  const bg = useColorModeValue('linear(to-r, #74ebd5, #ACB6E5)', 'linear(to-r, #232526, #414345)');
  return (
    <HashRouter>
      <Box textAlign="center" fontSize="xl" bgGradient={bg}>
        <Flex minH="100vh" p={3} flexDir="column">
          <Header />
          <Box flex="1" p="8">
            <Router />
          </Box>
          <Footer />
        </Flex>
      </Box>
    </HashRouter>
  );
};

export default App;
