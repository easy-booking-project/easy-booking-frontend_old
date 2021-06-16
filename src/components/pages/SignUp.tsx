import React, { FormEvent, useState } from 'react';
import { Box, Button, CircularProgress, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { UserSignUpInfo } from '../../utils/User';
import { callApiAndReturnIfSucceed, signUp } from '../../utils/api_handlers';
import digestText from '../../utils/digest';

const inputDefinitions = [
  { name: 'username', label: 'Username', type: 'text', placeholder: 'yourname@example.com', size: 'lg', required: true },
  { name: 'password', label: 'Password', type: 'password', placeholder: '********', size: 'lg', required: true },
  { name: 'nickname', label: 'Nickname', type: 'text', placeholder: 'Your nickname', size: 'lg', required: true },
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Your first name', size: 'lg', required: false },
  { name: 'middleName', label: 'Middle Name', type: 'text', placeholder: 'Your middle name', size: 'lg', required: false },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Your last name', size: 'lg', required: false },
];

const SignUp: React.FC = () => {
  const [user] = useState<Partial<UserSignUpInfo>>({});
  const [isLoading, setIsLoading] = useState(false);

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
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          <Box as="form" onSubmit={(event: any) => handleSubmit({ event, user, setIsLoading })}>
            {
              inputDefinitions.map(inputDefinition => (
                <FormControl key={inputDefinition.name} isRequired={inputDefinition.required}>
                  <FormLabel>{inputDefinition.label}</FormLabel>
                  <Input
                    onChange={event => handleInputChange({ inputName: inputDefinition.name, value: event.currentTarget.value, user })}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...inputDefinition}
                  />
                </FormControl>
              ))
            }
            <Button type="submit" variant="outline" width="full" mt={6}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;

async function handleInputChange({ inputName, value, user }: {
  inputName: string,
  value: string,
  user: Partial<UserSignUpInfo>,
}) {
  if (inputName === 'password') {
    // eslint-disable-next-line no-param-reassign
    user.authenticationHash = await digestText(value);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-param-reassign
    (user as any)[inputName] = value;
  }
}

async function handleSubmit({ event, user, setIsLoading }: {
  event: FormEvent,
  user: Partial<UserSignUpInfo>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  event.preventDefault();
  setIsLoading(true);
  const isSuccessful = await callApiAndReturnIfSucceed(signUp, user);
  setIsLoading(false);
  if (isSuccessful) {
    // TODO use UI framework's alert component
    // eslint-disable-next-line no-alert
    alert('Sign up successfully, please sign in with your account.');
    // TODO consider using useHistory hook
    window.location.hash = '/signin';
  } else {
    // TODO use UI framework's alert component
    // eslint-disable-next-line no-alert
    alert('Sign up fail');
  }
}