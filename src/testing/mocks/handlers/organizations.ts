import { http, delay, HttpResponse } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';

const getOrganizationHandler = http.get(
  `${API_URL}/organizations/:organizationId`,
  async ({ params }) => {
    const { organizationId } = params;

    const organization = db.organization.findFirst({
      where: {
        id: {
          equals: organizationId as string,
        },
      },
    });

    await delay();

    if (!organization) {
      return HttpResponse.json(
        { message: 'Not found!' },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(organization);
  }
);

export const organizationsHandlers = [
  getOrganizationHandler,
];
