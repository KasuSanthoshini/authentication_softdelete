import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/**/*.graphql',
  generates: {
    'src/utils/types/generated.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-validation-schema',
        'typescript-mongodb',
        {
          add: {
            content: [
              '/* eslint-disable unicorn/no-abusive-eslint-disable */',
              '/*  eslint-disable */',
              "import { ObjectId } from 'mongodb';",
            ],
          },
        },
      ],
      config: {
        dbTypeSuffix: 'InDB',
        strictScalars: true,
        enumsAsTypes: true,
        enumsAsString: false,
        objectIdType: 'string',
        schema: 'zod',
        contextType: './context#Context',
        idFieldName: '_id',
        scalars: {
          DateTime: 'Date',
          JSON: 'Record<string | number, any>',
          EmailAddress: 'string',
          URL: 'URL',
          PostalCode: 'string',
          Password: 'string',
          Date: 'Date',
        },
        scalarSchemas: {
          DateTime: 'z.date()',
          JSON: ' z.record(z.string().or(z.number()), z.any())',
          EmailAddress: 'z.string().email()',
          URL: 'z.custom<URL>((value) => value)',
          PostalCode: 'z.string()',
          Password: 'z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\\d)(?=.*?[!#$%&*?@^-]).{8,}$/)',
        },
        directives: {
          validation: {
            // validations for strings
            min: ['min', '$1', '$2'],
            max: ['max', '$1', '$2'],
            length: ['length', '$1', '$2'],
            startsWith: ['startsWith', '$1', '$2'],
            endsWith: ['endsWith', '$1', '$2'],
            regex: ['regex', '$1', '$2'],
            trim: ['trim'],

            // validations for numbers
            gt: ['gt', '$1', '$2'],
            gte: ['gte', '$1', '$2'],
            lt: ['gte', '$1', '$2'],
            lte: ['gte', '$1', '$2'],
            int: ['int', '$1', '$2'],
            finite: ['finite', '$1'],

            // validation for objects
            // validation for arrays

            // common
            default: 'default',
          },
        },
      },
    },
  },
};

export default config;
