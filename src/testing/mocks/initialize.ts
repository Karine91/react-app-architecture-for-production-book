import { IS_SERVER } from '@/config/constants';

import { seedDb } from './seed-db';

export const initializeMocks = async () => {
  if (IS_SERVER) {
    const { server } = require('./server');
    server.listen();
  } else {
    const { worker } = require('./browser');
    await worker.start();
    worker.listHandlers();
  }
  seedDb();
};
