import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
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

  // nav header
  const header1 = useColorModeValue('#000', '#fff');
  const header2 = useColorModeValue('#4A5568', '#F7FAFC');

  const hover = useColorModeValue('#000', '#fff');

  const borderBottom = useColorModeValue('4px solid #333', '4px solid #F7FAFC');

  return (
    <Flex
      h="16"
      justifyContent="space-between"
      alignItems="center"
      w={{ base: '95vw', md: '46rem', lg: '71rem', xl: '71rem' }}
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
          borderBottom={location.pathname === '/' ? borderBottom : ''}
          h="16"
          alignItems="center"
          onClick={() => {
            history.push('/');
          }}
          _hover={{ color: hover }}
          color={location.pathname === '/' ? header1 : header2}
        >
          Home
        </Flex>
        <Flex
          _hover={{ color: hover }}
          mr={{ md: '9', lg: '28' }}
          h="16"
          fontWeight="500"
          cursor="pointer"
          alignItems="center"
          onClick={() => {
            history.push('/signin');
          }}
          color={location.pathname === '/signin' ? header1 : header2}
          borderBottom={location.pathname === '/signin' ? borderBottom : ''}
        >
          Sign In
        </Flex>
        <Flex
          _hover={{ color: hover }}
          mr={{ md: '9', lg: '28' }}
          fontWeight="500"
          h="16"
          cursor="pointer"
          alignItems="center"
          onClick={() => {
            history.push('/signup');
          }}
          color={location.pathname === '/signup' ? header1 : header2}
          borderBottom={location.pathname === '/signup' ? borderBottom : ''}
        >
          Sign Up
        </Flex>
        <ColorModeSwitcher />
      </Flex>

      {/* mobile */}
      <Flex display={{ base: 'flex', sm: 'flex', md: 'none' }} flexDir="inherit">
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
