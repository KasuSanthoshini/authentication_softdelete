/* eslint-disable unicorn/prefer-module */
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'graphql-tag';
import path from 'path';

import { plugins } from '../functions/plugins';
import { Context } from '../types/context';
import { env } from './env';

const { NODE_ENV } = env;

const appResolvers =
  NODE_ENV === 'dev'
    ? loadFilesSync(path.join(__dirname, '../../', '**/*.resolver.ts'))
    : loadFilesSync(path.join(__dirname, '../../../', './src/**/*.resolver.js'));

export const resolvers = mergeResolvers(appResolvers);

const schemas =
  NODE_ENV === 'dev'
    ? loadFilesSync(path.join(__dirname, '../../', '**/*.graphql'))
    : loadFilesSync(path.join(__dirname, '../../../../', './src/**/*.graphql'));

const directiveTypeDefinition = gql`
  input AdditionalEntityFields {
    path: String
    type: String
  }

  directive @entity(embedded: Boolean, additionalFields: [AdditionalEntityFields]) on OBJECT
`;

const typeDefs = mergeTypeDefs([...schemas, directiveTypeDefinition]);

const schema = buildSubgraphSchema({
  typeDefs,
  resolvers: resolvers as never,
});

export const server = new ApolloServer<Context>({
  status400ForVariableCoercionErrors: true,
  plugins,
  schema,
  introspection: true,
});
