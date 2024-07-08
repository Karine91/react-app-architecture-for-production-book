import { MSWDevTools } from 'msw-devtools';
import { ReactNode, useEffect, useState } from 'react';

import { IS_DEVELOPMENT } from '@/config/constants';
import { db, handlers } from '@/testing/mocks';
import { initializeMocks } from '@/testing/mocks/initialize';

export type MSWWrapperProps = {
  children: ReactNode;
};

export const MSWWrapper = ({
  children,
}: MSWWrapperProps) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initializeMocks().then(() => setInitialized(true));
    }
  }, []);

  if (!initialized) return null;

  return (
    <>
      {IS_DEVELOPMENT && (
        <MSWDevTools db={db} handlers={handlers} />
      )}
      {children}
    </>
  );
};
