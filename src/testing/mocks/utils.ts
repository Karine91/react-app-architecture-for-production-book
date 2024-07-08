import { IS_TEST } from '@/config/constants';
import { AuthUser } from '@/features/auth';

import { testData } from '../test-data';

import { db } from './db';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

export const AUTH_COOKIE = 'auth-token';

const sanitizeUser = (user: any): AuthUser => {
  const sanitizedUser = { ...user };
  delete sanitizedUser.password;
  return sanitizedUser;
};

export const getUser = () =>
  sanitizeUser(testData.users[0]);

export type AuthenticateParamsType = {
  email: string;
  password: string;
};

// returns the user object and auth token if the provided credentials are valid
export const authenticate = ({
  email,
  password,
}: AuthenticateParamsType) => {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === password) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = AUTH_TOKEN;
    return { user: sanitizedUser, jwt: encodedToken };
  }

  throw new Error('Invalid username or password');
};

// extract the token and return the user if exists
export const requireAuth = ({
  cookies,
  shouldThrow = true,
}: {
  cookies: Record<string, string>;
  shouldThrow?: boolean;
}) => {
  if (IS_TEST) {
    return getUser();
  } else {
    const encodedToken = cookies[AUTH_COOKIE];
    console.log('encodedToken', encodedToken);

    if (encodedToken !== AUTH_TOKEN) {
      if (shouldThrow) {
        throw new Error(
          'No authorization token provided!'
        );
      }
      return null;
    }

    return getUser();
  }
};
