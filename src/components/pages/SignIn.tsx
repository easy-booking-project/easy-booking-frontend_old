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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // submit button loading
  const [isLoading, setIsLoading] = useState(false);

  // if error show the error compinent
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    setIsLoading(true);

    // try {
    //   // make  login function  eg:  await userLogin({ email, password });
    //   setIsLoading(false);
    // } catch (mes) {
    //   setError('Invalid username or password');
    //   setIsLoading(false);
    //   setEmail('');
    //   setPassword('');
    // }
  };

  return (
    <Flex width="full" align="center" justifyContent="center" mt={{ base: '3rem', md: '4rem', lg: '8rem', xl: '8rem' }}>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign In</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {/* show the error message  */}

          <Box as="form" onSubmit={handleSubmit}>
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
            <Button type="submit"  variant="outline" width="full" mt={6}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
