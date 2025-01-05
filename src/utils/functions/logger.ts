import { GraphQLRequest } from '@apollo/server';
import { ZodError } from 'zod';

import { env } from '../config/env';
import { ApolloError, UserInputError } from './errors';

export type BaseContext = Record<string, any>;

export const errorLogger = (error: unknown): ApolloError => {
  if (error instanceof ApolloError) {
    console.error('Error:', JSON.stringify(error, null, 2));

    return error;
  }

  if (error instanceof ZodError) {
    console.error(
      'Error:',
      JSON.stringify(
        error.issues.map((zodError) => zodError.message),
        null,
        2
      )
    );

    return new UserInputError('Invalid input', error.issues);
  }

  console.error('Error:', JSON.stringify(error, null, 2));
  return error as ApolloError;
};

export const logger = (query?: string, request?: GraphQLRequest) => {
  if (env.NODE_ENV === 'development') return;

  console.log(`Query: ${query}
Request: ${JSON.stringify(request, null, 2)}`);
};
