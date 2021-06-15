import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ISignUp, signUp } from '../../Api';

const SignIn = () => {
  const [email, setEmail] = useState(''); // TODO username or email?
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  // submit button loading
  const [isLoading, setIsLoading] = useState(false);

  // if error show the error compinent
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const actionSignUp = async () => {
    try {
      const response = await signUp({
        username: email,
        authenticationHash: password,
        nickname,
        firstName,
        middleName,
        lastName,
      } as ISignUp);

      const json = await response.json();

      if (response.ok) {
        // window.location.reload();
      } else {
        if (json.status === 406) {
          setError(json.message);
          // eslint-disable-next-line no-alert
          alert(json.message); // TODO use better way to display error message
        }

        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    actionSignUp();
  };

  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      mt={{ base: '2rem', md: '3rem', lg: '3.5rem', xl: '5rem' }}
    >
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {/* TODO show the error message  */}

          <Box as="form">
            {/* Email  */}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="youemail@gmail.com"
                onChange={(event) => setEmail(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* password  */}
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*******"
                  size="lg"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="3rem">
                  <Button mt="0.5rem" boxSize={8} onClick={handlePasswordVisibility}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* nickname  */}
            <FormControl mt={6} isRequired>
              <FormLabel>Nickname</FormLabel>
              <Input
                type="text"
                placeholder="chao"
                onChange={(event) => setNickname(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* firstname  */}
            <FormControl mt={6}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder="Song"
                onChange={(event) => setFirstName(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* middlename  */}
            <FormControl mt={6}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                placeholder="Shi"
                onChange={(event) => setMiddleName(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* last name  */}
            <FormControl mt={6}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Wei"
                onChange={(event) => setLastName(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            <Button type="button" variant="outline" width="full" mt={6} onClick={handleSubmit}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
