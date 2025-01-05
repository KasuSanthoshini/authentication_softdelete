import { startStandaloneServer } from '@apollo/server/standalone';

import { env } from './src/utils/config/env';
import { server } from './src/utils/config/server-config';
import { db } from './src/utils/functions/db';
import { Context } from './src/utils/types/context';

const start = async () => {
  const { url } = await startStandaloneServer<Context>(server, {
    context: async (context) => {
      return { db } satisfies Context;
    },
    listen: { port: +env.PORT },
  });

  console.log(`🚀 Server running at ${url}graphql`);
};

start();
