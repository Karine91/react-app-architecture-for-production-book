import { http, HttpResponse, delay } from 'msw';

import { API_URL } from '@/config/constants';
import type { Job } from '@/features/jobs';

import { db } from '../db';
import { requireAuth } from '../utils';

const getJobsHandler = http.get(
  `${API_URL}/jobs`,
  async ({ request }) => {
    const organizationId = new URLSearchParams(
      request.url
    ).get('organizationId') as string;

    console.log(request.url);

    console.log(organizationId);

    const jobs = db.job.findMany({
      where: {
        organizationId: {
          equals: organizationId,
        },
      },
    });

    await delay(300);

    return HttpResponse.json(jobs, { status: 200 });
  }
);

const getJobHandler = http.get(
  `${API_URL}/jobs/:jobId`,
  async ({ params }) => {
    const jobId = params.jobId as string;

    const job = db.job.findFirst({
      where: {
        id: {
          equals: jobId,
        },
      },
    });

    await delay(300);

    if (!job) {
      return HttpResponse.json(
        { message: 'Not found!' },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(job, {
      status: 200,
    });
  }
);

const createJobHandler = http.post(
  `${API_URL}/jobs`,
  async ({ cookies, request }) => {
    const user = requireAuth({ cookies });

    const jobData = (await request.json()) as Job;

    const job = db.job.create({
      ...jobData,
      organizationId: user?.organizationId,
    });

    await delay(300);

    return HttpResponse.json(job, { status: 200 });
  }
);

export const jobsHandlers = [
  getJobsHandler,
  getJobHandler,
  createJobHandler,
];
