import { Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AiOutlineLogin, AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import ColorModeSwitcher from './ColorModeSwitcher';

const Header = () => {
  // get history  inorder to other page
  const history = useHistory();

  // get url pathname
  const location = useLocation();

  return (
    <Flex
      h="16"
      justifyContent="space-between"
      alignItems="center"
      w={{ base: '85vw', md: '46rem', lg: '71rem', xl: '71rem' }}
      margin="0 auto"
    >
      <Heading
        letterSpacing="tight"
        cursor="pointer"
        onClick={() => {
          history.push('/home');
        }}
      >
        📅 Easy Booking
      </Heading>

      {/* pc  */}
      <Flex h="16" alignItems="center" display={{ base: 'none', sm: 'none', md: 'flex' }}>
        <Flex
          mr={{ md: '9', lg: '28' }}
          fontWeight="500"
          cursor="pointer"
          borderBottom={location.pathname === '/' ? '4px solid #333' : ''}
          h="16"
          alignItems="center"
          onClick={() => {
            history.push('/');
          }}
          color={location.pathname === '/' ? '#000' : '#999'}
        >
          Home
        </Flex>
        <Flex
          _hover={{ color: '#000' }}
          mr={{ md: '9', lg: '28' }}
          h="16"
          fontWeight="500"
          cursor="pointer"
          alignItems="center"
          onClick={() => {
            history.push('/signin');
          }}
          color={location.pathname === '/signin' ? '#000' : '#999'}
          borderBottom={location.pathname === '/signin' ? '4px solid #333' : ''}
        >
          Sign In
        </Flex>
        <Flex
          _hover={{ color: '#000' }}
          mr={{ md: '9', lg: '28' }}
          fontWeight="500"
          h="16"
          cursor="pointer"
          alignItems="center"
          onClick={() => {
            history.push('/signup');
          }}
          color={location.pathname === '/signup' ? '#000' : '#999'}
          borderBottom={location.pathname === '/signup' ? '4px solid #333' : ''}
        >
          Sign Up
        </Flex>
        <ColorModeSwitcher />
      </Flex>

      {/* mobile */}
      <Flex display={{ base: 'flex', sm: 'flex', md: 'none' }}>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
          <MenuList>
            <MenuItem icon={<AiOutlineLogin />}>
              <Box
                onClick={() => {
                  history.push('/signin');
                }}
              >
                Sign In
              </Box>
            </MenuItem>
            <MenuItem icon={<AiOutlineDeliveredProcedure />}>
              <Box
                onClick={() => {
                  history.push('/signup');
                }}
              >
                Sign Up
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
};

export default Header;
