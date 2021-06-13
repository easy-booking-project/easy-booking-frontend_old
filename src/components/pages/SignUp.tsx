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
  // *username,   *password,    nickname,    *firstname, middlename,  *lastname
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');

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
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      mt={{ base: '2rem', md: '3rem', lg: '3.5rem', xl: '5rem' }}

      // mt="8rem"
    >
      <Box p={8}  maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {/* show the error message  */}

          <Box as="form" onSubmit={handleSubmit}>
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
            <FormControl mt={6} >
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder="Song"
                onChange={(event) => setFirstname(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* middlename  */}
            <FormControl mt={6}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                placeholder="Shi"
                onChange={(event) => setMiddlename(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            {/* last name  */}
            <FormControl mt={6} >
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Wei"
                onChange={(event) => setLastname(event.currentTarget.value)}
                size="lg"
              />
            </FormControl>
            <Button type="submit"  variant="outline" width="full" mt={6}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
