import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, CircularProgress } from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { callApiAndReturnIfSucceed, signIn } from '../../utils/api_handlers';
import digestText from '../../utils/digest';
import Auth, { AuthState } from '../../utils/store';
import { UserSignInInfo } from '../../utils/User';

const inputDefinitions = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'yourname@example.com',
    size: 'lg',
    required: true,
  },
  { name: 'password', label: 'Password', type: 'password', placeholder: '********', size: 'lg', required: true },
];

const SignIn: React.FC = () => {
  const useAuth = Auth.useContainer();

  const [user] = useState<Partial<UserSignInInfo>>({});
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
          <Heading>Sign In</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {/* TODO show the error message  */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          <Box as="form" onSubmit={(event: any) => handleSubmit({ event, user, setIsLoading, useAuth })}>
            {inputDefinitions.map((inputDefinition) => (
              <FormControl key={inputDefinition.name} isRequired={inputDefinition.required}>
                <FormLabel>{inputDefinition.label}</FormLabel>
                <Input
                  onChange={(event) =>
                    handleInputChange({ inputName: inputDefinition.name, value: event.currentTarget.value, user })
                  }
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...inputDefinition}
                />
              </FormControl>
            ))}
            <Button type="submit" variant="outline" width="full" mt={6}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;

async function handleInputChange({
  inputName,
  value,
  user,
}: {
  inputName: string;
  value: string;
  user: Partial<UserSignInInfo>;
}) {
  if (inputName === 'password') {
    // eslint-disable-next-line no-param-reassign
    user.authenticationHash = await digestText(value);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-param-reassign
    (user as any)[inputName] = value;
  }
}

async function handleSubmit({
  event,
  user,
  setIsLoading,
  useAuth,
}: {
  event: FormEvent;
  user: Partial<UserSignInInfo>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  useAuth: AuthState;
}) {
  event.preventDefault();
  setIsLoading(true);
  const isSuccessful = await callApiAndReturnIfSucceed(signIn, user);
  setIsLoading(false);
  if (isSuccessful) {
    useAuth.login(user.username ?? '');

    // TODO consider using useHistory hook
    window.location.reload();
  } else {
    // TODO use UI framework's alert component
    // eslint-disable-next-line no-alert
    alert('Sign in fail');
  }
}
