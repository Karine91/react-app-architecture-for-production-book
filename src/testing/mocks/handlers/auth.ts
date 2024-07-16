import { http, delay, HttpResponse } from 'msw';

import { API_URL } from '@/config/constants';

import {
  authenticate,
  requireAuth,
  AUTH_COOKIE,
  type AuthenticateParamsType,
} from '../utils';

const loginHandler = http.post(
  `${API_URL}/auth/login`,
  async ({ request }) => {
    const credentials =
      (await request.json()) as AuthenticateParamsType;
    const { user, jwt } = authenticate(credentials);

    await delay(300);

    return HttpResponse.json(user, {
      headers: {
        'Set-Cookie': `${AUTH_COOKIE}=${jwt}; HttpOnly; Path=/`,
      },
    });
  }
);

const logoutHandler = http.post(
  `${API_URL}/auth/logout`,
  async () => {
    await delay(300);

    return new HttpResponse('success', {
      headers: {
        'Set-Cookie': `${AUTH_COOKIE}=''; HttpOnly; Path=/`,
      },
    });
  }
);

const meHandler = http.get(
  `${API_URL}/auth/me`,
  async ({ cookies }) => {
    console.log('cookies', cookies);
    const user = requireAuth({
      cookies,
      shouldThrow: false,
    });

    await delay(300);

    return HttpResponse.json(user, { status: 200 });
  }
);

export const authHandlers = [
  loginHandler,
  logoutHandler,
  meHandler,
];
