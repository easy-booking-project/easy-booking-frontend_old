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
import { signIn } from '../../Api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // submit button loading
  const [isLoading, setIsLoading] = useState(false);

  // if error show the error compinent
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const actionSignIn = async () => {
    try {
      const response = await signIn(email, password);

      const json = await response.json();

      if (response.ok) {
        window.location.reload();
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

  const handleSubmit = async () => {
    setIsLoading(true);
    actionSignIn();
  };

  return (
    <Flex width="full" align="center" justifyContent="center" mt={{ base: '3rem', md: '4rem', lg: '8rem', xl: '8rem' }}>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign In</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {/* TODO show the error message  */}

          <Box as="form">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="youemail@gmail.com"
                onChange={(event) => setEmail(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
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
            <Button type="button" variant="outline" width="full" mt={6} onClick={handleSubmit}>

              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
