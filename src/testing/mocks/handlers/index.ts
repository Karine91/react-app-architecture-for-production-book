import { http, HttpResponse } from 'msw';

import { API_URL } from '@/config/constants';

import { authHandlers } from './auth';
import { jobsHandlers } from './jobs';
import { organizationsHandlers } from './organizations';

export const handlers = [
  ...authHandlers,
  ...jobsHandlers,
  ...organizationsHandlers,
  http.get(`${API_URL}/healthcheck`, () => {
    return HttpResponse.json(
      {
        healthy: true,
      },
      {
        status: 200,
      }
    );
  }),
];
