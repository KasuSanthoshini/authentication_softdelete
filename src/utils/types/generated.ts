/* eslint-disable unicorn/no-abusive-eslint-disable */
/*  eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
import { z } from 'zod'
import { ObjectId } from 'mongodb';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  /** JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error. */
  DateTime: Date;
  /** A field whose value conforms to the standard internet email address format as specified in {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address HTML Spec}. */
  EmailAddress: string;
  /** The JSON scalar type represents JSON values as specified by {@link http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf ECMA-404}. */
  JSON: Record<string | number, any>;
  /** A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character */
  Password: string;
  /** A field whose value conforms to the standard URL format as specified in {@link https://www.ietf.org/rfc/rfc3986.txt RFC3986}, and it uses real JavaScript URL objects. */
  URL: URL;
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['String'];
  resetPassword: Scalars['String'];
  restoreUser: Scalars['String'];
  signIn: Scalars['String'];
  signUp: Scalars['String'];
  softDeleteUser: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationResetPasswordArgs = {
  input?: InputMaybe<ResetforgotPasswordInput>;
};


export type MutationRestoreUserArgs = {
  userId: Scalars['ID'];
};


export type MutationSignInArgs = {
  input: SignIninput;
};


export type MutationSignUpArgs = {
  input: UserInput;
};


export type MutationSoftDeleteUserArgs = {
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  findUserById: User;
  getUserDetailsByToken: User;
  hello: Scalars['String'];
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserDetailsByTokenArgs = {
  authToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  aadharNumber: Scalars['String'];
  createdAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  mobileNumber: Scalars['String'];
  userName: Scalars['String'];
};

export type UserInput = {
  aadharNumber: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  mobileNumber: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ResetforgotPasswordInput = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  otp: Scalars['String'];
};

export type SignIninput = {
  credential: Scalars['String'];
  password: Scalars['String'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Password: ResolverTypeWrapper<Scalars['Password']>;
  Query: ResolverTypeWrapper<{}>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserInput: UserInput;
  forgotPasswordInput: ForgotPasswordInput;
  resetforgotPasswordInput: ResetforgotPasswordInput;
  signIninput: SignIninput;
  AdditionalEntityFields: AdditionalEntityFields;
  Int: ResolverTypeWrapper<Scalars['Int']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  JSON: Scalars['JSON'];
  Mutation: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  Password: Scalars['Password'];
  Query: {};
  URL: Scalars['URL'];
  User: User;
  Boolean: Scalars['Boolean'];
  UserInput: UserInput;
  forgotPasswordInput: ForgotPasswordInput;
  resetforgotPasswordInput: ResetforgotPasswordInput;
  signIninput: SignIninput;
  AdditionalEntityFields: AdditionalEntityFields;
  Int: Scalars['Int'];
};

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExternalDirectiveArgs = { };

export type ExternalDirectiveResolver<Result, Parent, ContextType = Context, Args = ExternalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidationDirectiveArgs = {
  default?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  pattern?: Maybe<Scalars['String']>;
  requiredMessage?: Maybe<Scalars['String']>;
  trim?: Maybe<Scalars['Boolean']>;
  typeOf?: Maybe<Scalars['String']>;
};

export type ValidationDirectiveResolver<Result, Parent, ContextType = Context, Args = ValidationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  forgotPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'input'>>;
  resetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, Partial<MutationResetPasswordArgs>>;
  restoreUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRestoreUserArgs, 'userId'>>;
  signIn?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  softDeleteUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSoftDeleteUserArgs, 'userId'>>;
};

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByIdArgs, 'userId'>>;
  getUserDetailsByToken?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserDetailsByTokenArgs, 'authToken'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  aadharNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mobileNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  external?: ExternalDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  validation?: ValidationDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function UserInputSchema(): z.ZodObject<Properties<UserInput>> {
  return z.object<Properties<UserInput>>({
    aadharNumber: z.string(),
    displayName: z.string(),
    email: z.string(),
    mobileNumber: z.string(),
    password: z.string(),
    userName: z.string()
  })
}

export function ForgotPasswordInputSchema(): z.ZodObject<Properties<ForgotPasswordInput>> {
  return z.object<Properties<ForgotPasswordInput>>({
    email: z.string()
  })
}

export function ResetforgotPasswordInputSchema(): z.ZodObject<Properties<ResetforgotPasswordInput>> {
  return z.object<Properties<ResetforgotPasswordInput>>({
    email: z.string(),
    newPassword: z.string(),
    otp: z.string()
  })
}

export function SignIninputSchema(): z.ZodObject<Properties<SignIninput>> {
  return z.object<Properties<SignIninput>>({
    credential: z.string(),
    password: z.string()
  })
}

export function AdditionalEntityFieldsSchema(): z.ZodObject<Properties<AdditionalEntityFields>> {
  return z.object<Properties<AdditionalEntityFields>>({
    path: z.string().nullish(),
    type: z.string().nullish()
  })
}


export type UserInDb = {
  _id: string,
  aadharNumber: string,
  createdAt: Date,
  deleted: Boolean,
  displayName: string,
  email: string,
  mobileNumber: string,
  userName: string,
  updatedAt?: Maybe<Date>,
  password: string,
};
