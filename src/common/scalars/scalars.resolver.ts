/* eslint-disable consistent-return */
import { GraphQLScalarType, Kind } from 'graphql';
import { DateTimeResolver, EmailAddressResolver, JSONResolver, URLResolver } from 'graphql-scalars';

import { ValidationError } from '../../utils/functions/errors';

const PasswordResolver = new GraphQLScalarType<string | undefined, string>({
  name: 'Password',
  description:
    'A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character',
  serialize: (value) => {
    if (typeof value === 'string') return value;

    throw new ValidationError('Invalid Password');
  },
  parseValue: (value) => {
    if (typeof value === 'string') {
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/;

      if (regex.test(value)) return value;
    }

    throw new ValidationError('Invalid Password');
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) return ast.value;
  },
});

export const resolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Password: PasswordResolver,
};
