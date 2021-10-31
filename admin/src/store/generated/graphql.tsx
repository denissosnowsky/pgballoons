import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Assortment = {
  __typename?: 'Assortment';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['String'];
  fixed: Scalars['Boolean'];
};

export type Balloon = {
  __typename?: 'Balloon';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['String'];
  category?: Maybe<Category>;
  color?: Maybe<Color>;
};

export type Bouquet = {
  __typename?: 'Bouquet';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['String'];
  personType: Person;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  balloons?: Maybe<Array<Maybe<Balloon>>>;
};

export type Color = {
  __typename?: 'Color';
  id: Scalars['ID'];
  name: Scalars['String'];
  cssName: Scalars['String'];
  balloons?: Maybe<Array<Maybe<Balloon>>>;
};


export type DeliveryPrice = {
  __typename?: 'DeliveryPrice';
  id: Scalars['ID'];
  price: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  addBouquet?: Maybe<Bouquet>;
  changeBouquet?: Maybe<Bouquet>;
  deleteBouquet?: Maybe<Bouquet>;
  addBalloon?: Maybe<Balloon>;
  changeBalloon?: Maybe<Balloon>;
  deleteBalloon?: Maybe<Balloon>;
  addCategory?: Maybe<Category>;
  deleteCategory?: Maybe<Category>;
  addColor?: Maybe<Color>;
  deleteColor?: Maybe<Color>;
  addAssortment?: Maybe<Assortment>;
  deleteAssortmant?: Maybe<Assortment>;
  changeAssortmant?: Maybe<Assortment>;
  addDeliveryPrice?: Maybe<DeliveryPrice>;
  changeDeliveryPrice?: Maybe<DeliveryPrice>;
  addPhone?: Maybe<Phone>;
  deletePhone?: Maybe<Phone>;
  addSocialNet?: Maybe<SocialNet>;
  deleteSocialNet?: Maybe<SocialNet>;
  changeManyPricesToBalloons?: Maybe<Scalars['Boolean']>;
  changeManyPricesToBouquets?: Maybe<Scalars['Boolean']>;
  sendOrder?: Maybe<Scalars['Boolean']>;
};


export type MutationAddBouquetArgs = {
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['Upload'];
  personType: Person;
};


export type MutationChangeBouquetArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  subname?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  personType?: Maybe<Person>;
};


export type MutationDeleteBouquetArgs = {
  id: Scalars['String'];
};


export type MutationAddBalloonArgs = {
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['Upload'];
  categoryId: Scalars['ID'];
  colorId: Scalars['ID'];
};


export type MutationChangeBalloonArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  subname?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteBalloonArgs = {
  id: Scalars['String'];
};


export type MutationAddCategoryArgs = {
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationAddColorArgs = {
  name: Scalars['String'];
  cssName: Scalars['String'];
};


export type MutationDeleteColorArgs = {
  id: Scalars['ID'];
};


export type MutationAddAssortmentArgs = {
  name: Scalars['String'];
  price: Scalars['String'];
  fixed: Scalars['Boolean'];
};


export type MutationDeleteAssortmantArgs = {
  id: Scalars['ID'];
};


export type MutationChangeAssortmantArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  fixed?: Maybe<Scalars['Boolean']>;
};


export type MutationAddDeliveryPriceArgs = {
  price: Scalars['String'];
};


export type MutationChangeDeliveryPriceArgs = {
  id: Scalars['ID'];
  price?: Maybe<Scalars['String']>;
};


export type MutationAddPhoneArgs = {
  number: Scalars['String'];
};


export type MutationDeletePhoneArgs = {
  id: Scalars['ID'];
};


export type MutationAddSocialNetArgs = {
  name: Scalars['String'];
  link: Scalars['String'];
  image: Scalars['String'];
};


export type MutationDeleteSocialNetArgs = {
  id: Scalars['ID'];
};


export type MutationChangeManyPricesToBalloonsArgs = {
  oldPrice: Scalars['Int'];
  newPrice: Scalars['Int'];
};


export type MutationChangeManyPricesToBouquetsArgs = {
  oldPrice: Scalars['Int'];
  newPrice: Scalars['Int'];
};


export type MutationSendOrderArgs = {
  order: Scalars['JSON'];
};

export enum Person {
  Man = 'MAN',
  Woman = 'WOMAN',
  Child = 'CHILD'
}

export type Phone = {
  __typename?: 'Phone';
  id: Scalars['ID'];
  number: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  bouquet?: Maybe<Bouquet>;
  bouquets?: Maybe<Array<Maybe<Bouquet>>>;
  balloon?: Maybe<Balloon>;
  balloons?: Maybe<Array<Maybe<Balloon>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  colors?: Maybe<Array<Maybe<Color>>>;
  assortment?: Maybe<Array<Maybe<Assortment>>>;
  phones?: Maybe<Array<Maybe<Phone>>>;
  socialNets?: Maybe<Array<Maybe<SocialNet>>>;
  deliveryPrice?: Maybe<DeliveryPrice>;
  allBouquets?: Maybe<Scalars['Int']>;
  allBalloons?: Maybe<Scalars['Int']>;
  maxBouquetPrice?: Maybe<Scalars['Int']>;
  maxBalloonPrice?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeBouquetArgs = {
  id: Scalars['String'];
};


export type RootQueryTypeBouquetsArgs = {
  price?: Maybe<Scalars['Int']>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  personType?: Maybe<Person>;
  code?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeBalloonArgs = {
  id: Scalars['String'];
};


export type RootQueryTypeBalloonsArgs = {
  price?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  code?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeAllBouquetsArgs = {
  price?: Maybe<Scalars['Int']>;
  personType?: Maybe<Person>;
  code?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeAllBalloonsArgs = {
  price?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['Int']>;
};

export type SocialNet = {
  __typename?: 'SocialNet';
  id: Scalars['ID'];
  name: Scalars['String'];
  link: Scalars['String'];
  image: Scalars['String'];
};


export type AddAssortmentMutationVariables = Exact<{
  name: Scalars['String'];
  price: Scalars['String'];
  fixed: Scalars['Boolean'];
}>;


export type AddAssortmentMutation = { __typename?: 'Mutation', addAssortment?: Maybe<{ __typename?: 'Assortment', id: string, name: string, price: string, fixed: boolean }> };

export type AddBalloonMutationVariables = Exact<{
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['Upload'];
  categoryId: Scalars['ID'];
  colorId: Scalars['ID'];
}>;


export type AddBalloonMutation = { __typename?: 'Mutation', addBalloon?: Maybe<{ __typename?: 'Balloon', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, category?: Maybe<{ __typename?: 'Category', id: string, name: string }>, color?: Maybe<{ __typename?: 'Color', id: string, name: string }> }> };

export type AddBouquetMutationVariables = Exact<{
  name: Scalars['String'];
  subname: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  code: Scalars['Int'];
  image: Scalars['Upload'];
  personType: Person;
}>;


export type AddBouquetMutation = { __typename?: 'Mutation', addBouquet?: Maybe<{ __typename?: 'Bouquet', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, personType: Person }> };

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory?: Maybe<{ __typename?: 'Category', id: string, name: string }> };

export type AddColorMutationVariables = Exact<{
  name: Scalars['String'];
  cssName: Scalars['String'];
}>;


export type AddColorMutation = { __typename?: 'Mutation', addColor?: Maybe<{ __typename?: 'Color', id: string, name: string, cssName: string }> };

export type AddDeliveryPriceMutationVariables = Exact<{
  price: Scalars['String'];
}>;


export type AddDeliveryPriceMutation = { __typename?: 'Mutation', addDeliveryPrice?: Maybe<{ __typename?: 'DeliveryPrice', id: string, price: string }> };

export type AddPhoneMutationVariables = Exact<{
  number: Scalars['String'];
}>;


export type AddPhoneMutation = { __typename?: 'Mutation', addPhone?: Maybe<{ __typename?: 'Phone', id: string, number: string }> };

export type AddSocialNetMutationVariables = Exact<{
  name: Scalars['String'];
  link: Scalars['String'];
  image: Scalars['String'];
}>;


export type AddSocialNetMutation = { __typename?: 'Mutation', addSocialNet?: Maybe<{ __typename?: 'SocialNet', id: string, name: string, link: string, image: string }> };

export type ChangeAssortmantMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  fixed?: Maybe<Scalars['Boolean']>;
}>;


export type ChangeAssortmantMutation = { __typename?: 'Mutation', changeAssortmant?: Maybe<{ __typename?: 'Assortment', id: string, name: string, price: string, fixed: boolean }> };

export type ChangeBalloonMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  subname?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
}>;


export type ChangeBalloonMutation = { __typename?: 'Mutation', changeBalloon?: Maybe<{ __typename?: 'Balloon', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, category?: Maybe<{ __typename?: 'Category', id: string, name: string }>, color?: Maybe<{ __typename?: 'Color', id: string, name: string }> }> };

export type ChangeBouquetMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  subname?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  personType?: Maybe<Person>;
}>;


export type ChangeBouquetMutation = { __typename?: 'Mutation', changeBouquet?: Maybe<{ __typename?: 'Bouquet', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, personType: Person }> };

export type ChangeDeliveryPriceMutationVariables = Exact<{
  id: Scalars['ID'];
  price?: Maybe<Scalars['String']>;
}>;


export type ChangeDeliveryPriceMutation = { __typename?: 'Mutation', changeDeliveryPrice?: Maybe<{ __typename?: 'DeliveryPrice', id: string, price: string }> };

export type ChangeManyPricesToBalloonsMutationVariables = Exact<{
  oldPrice: Scalars['Int'];
  newPrice: Scalars['Int'];
}>;


export type ChangeManyPricesToBalloonsMutation = { __typename?: 'Mutation', changeManyPricesToBalloons?: Maybe<boolean> };

export type ChangeManyPricesToBouquetsMutationVariables = Exact<{
  oldPrice: Scalars['Int'];
  newPrice: Scalars['Int'];
}>;


export type ChangeManyPricesToBouquetsMutation = { __typename?: 'Mutation', changeManyPricesToBouquets?: Maybe<boolean> };

export type DeleteAssortmantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAssortmantMutation = { __typename?: 'Mutation', deleteAssortmant?: Maybe<{ __typename?: 'Assortment', id: string, name: string, price: string, fixed: boolean }> };

export type DeleteBalloonMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBalloonMutation = { __typename?: 'Mutation', deleteBalloon?: Maybe<{ __typename?: 'Balloon', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, category?: Maybe<{ __typename?: 'Category', id: string, name: string }>, color?: Maybe<{ __typename?: 'Color', id: string, name: string }> }> };

export type DeleteBouquetMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBouquetMutation = { __typename?: 'Mutation', deleteBouquet?: Maybe<{ __typename?: 'Bouquet', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, personType: Person }> };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: Maybe<{ __typename?: 'Category', id: string, name: string }> };

export type DeleteColorMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteColorMutation = { __typename?: 'Mutation', deleteColor?: Maybe<{ __typename?: 'Color', id: string, name: string, cssName: string }> };

export type DeletePhoneMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePhoneMutation = { __typename?: 'Mutation', deletePhone?: Maybe<{ __typename?: 'Phone', id: string, number: string }> };

export type DeleteSocialNetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSocialNetMutation = { __typename?: 'Mutation', deleteSocialNet?: Maybe<{ __typename?: 'SocialNet', id: string, name: string, link: string, image: string }> };

export type SendOrderMutationVariables = Exact<{
  order: Scalars['JSON'];
}>;


export type SendOrderMutation = { __typename?: 'Mutation', sendOrder?: Maybe<boolean> };

export type AllBalloonsQueryVariables = Exact<{
  price?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['Int']>;
}>;


export type AllBalloonsQuery = { __typename?: 'RootQueryType', allBalloons?: Maybe<number> };

export type AllBouquetsQueryVariables = Exact<{
  price?: Maybe<Scalars['Int']>;
  personType?: Maybe<Person>;
  code?: Maybe<Scalars['Int']>;
}>;


export type AllBouquetsQuery = { __typename?: 'RootQueryType', allBouquets?: Maybe<number> };

export type AssortmentQueryVariables = Exact<{ [key: string]: never; }>;


export type AssortmentQuery = { __typename?: 'RootQueryType', assortment?: Maybe<Array<Maybe<{ __typename?: 'Assortment', id: string, name: string, price: string, fixed: boolean }>>> };

export type BalloonQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BalloonQuery = { __typename?: 'RootQueryType', balloon?: Maybe<{ __typename?: 'Balloon', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, category?: Maybe<{ __typename?: 'Category', id: string, name: string }>, color?: Maybe<{ __typename?: 'Color', id: string, name: string }> }> };

export type BalloonsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  price?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  colorId?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['Int']>;
}>;


export type BalloonsQuery = { __typename?: 'RootQueryType', balloons?: Maybe<Array<Maybe<{ __typename?: 'Balloon', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, category?: Maybe<{ __typename?: 'Category', id: string, name: string }>, color?: Maybe<{ __typename?: 'Color', id: string, name: string }> }>>> };

export type BouquetQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BouquetQuery = { __typename?: 'RootQueryType', bouquet?: Maybe<{ __typename?: 'Bouquet', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, personType: Person }> };

export type BouquetsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  price?: Maybe<Scalars['Int']>;
  personType?: Maybe<Person>;
  code?: Maybe<Scalars['Int']>;
}>;


export type BouquetsQuery = { __typename?: 'RootQueryType', bouquets?: Maybe<Array<Maybe<{ __typename?: 'Bouquet', id: string, name: string, subname: string, price: number, description: string, code: number, image: string, personType: Person }>>> };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'RootQueryType', categories?: Maybe<Array<Maybe<{ __typename?: 'Category', id: string, name: string }>>> };

export type ColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ColorsQuery = { __typename?: 'RootQueryType', colors?: Maybe<Array<Maybe<{ __typename?: 'Color', id: string, name: string, cssName: string }>>> };

export type DeliveryPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type DeliveryPriceQuery = { __typename?: 'RootQueryType', deliveryPrice?: Maybe<{ __typename?: 'DeliveryPrice', id: string, price: string }> };

export type MaxBalloonPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxBalloonPriceQuery = { __typename?: 'RootQueryType', maxBalloonPrice?: Maybe<number> };

export type MaxBouquetPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxBouquetPriceQuery = { __typename?: 'RootQueryType', maxBouquetPrice?: Maybe<number> };

export type PhonesQueryVariables = Exact<{ [key: string]: never; }>;


export type PhonesQuery = { __typename?: 'RootQueryType', phones?: Maybe<Array<Maybe<{ __typename?: 'Phone', id: string, number: string }>>> };

export type SocialNetsQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialNetsQuery = { __typename?: 'RootQueryType', socialNets?: Maybe<Array<Maybe<{ __typename?: 'SocialNet', id: string, name: string, link: string, image: string }>>> };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = ResolversObject<{
  Assortment: ResolverTypeWrapper<Assortment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Balloon: ResolverTypeWrapper<Balloon>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Bouquet: ResolverTypeWrapper<Bouquet>;
  Category: ResolverTypeWrapper<Category>;
  Color: ResolverTypeWrapper<Color>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeliveryPrice: ResolverTypeWrapper<DeliveryPrice>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  Person: Person;
  Phone: ResolverTypeWrapper<Phone>;
  RootQueryType: ResolverTypeWrapper<{}>;
  SocialNet: ResolverTypeWrapper<SocialNet>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Assortment: Assortment;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Balloon: Balloon;
  Int: Scalars['Int'];
  Bouquet: Bouquet;
  Category: Category;
  Color: Color;
  DateTime: Scalars['DateTime'];
  DeliveryPrice: DeliveryPrice;
  JSON: Scalars['JSON'];
  Mutation: {};
  Phone: Phone;
  RootQueryType: {};
  SocialNet: SocialNet;
  Upload: Scalars['Upload'];
}>;

export type AssortmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Assortment'] = ResolversParentTypes['Assortment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fixed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalloonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Balloon'] = ResolversParentTypes['Balloon']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BouquetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bouquet'] = ResolversParentTypes['Bouquet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  personType?: Resolver<ResolversTypes['Person'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balloons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Balloon']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cssName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balloons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Balloon']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeliveryPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryPrice'] = ResolversParentTypes['DeliveryPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBouquet?: Resolver<Maybe<ResolversTypes['Bouquet']>, ParentType, ContextType, RequireFields<MutationAddBouquetArgs, 'name' | 'subname' | 'price' | 'description' | 'code' | 'image' | 'personType'>>;
  changeBouquet?: Resolver<Maybe<ResolversTypes['Bouquet']>, ParentType, ContextType, RequireFields<MutationChangeBouquetArgs, 'id'>>;
  deleteBouquet?: Resolver<Maybe<ResolversTypes['Bouquet']>, ParentType, ContextType, RequireFields<MutationDeleteBouquetArgs, 'id'>>;
  addBalloon?: Resolver<Maybe<ResolversTypes['Balloon']>, ParentType, ContextType, RequireFields<MutationAddBalloonArgs, 'name' | 'subname' | 'price' | 'description' | 'code' | 'image' | 'categoryId' | 'colorId'>>;
  changeBalloon?: Resolver<Maybe<ResolversTypes['Balloon']>, ParentType, ContextType, RequireFields<MutationChangeBalloonArgs, 'id'>>;
  deleteBalloon?: Resolver<Maybe<ResolversTypes['Balloon']>, ParentType, ContextType, RequireFields<MutationDeleteBalloonArgs, 'id'>>;
  addCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'name'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  addColor?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType, RequireFields<MutationAddColorArgs, 'name' | 'cssName'>>;
  deleteColor?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType, RequireFields<MutationDeleteColorArgs, 'id'>>;
  addAssortment?: Resolver<Maybe<ResolversTypes['Assortment']>, ParentType, ContextType, RequireFields<MutationAddAssortmentArgs, 'name' | 'price' | 'fixed'>>;
  deleteAssortmant?: Resolver<Maybe<ResolversTypes['Assortment']>, ParentType, ContextType, RequireFields<MutationDeleteAssortmantArgs, 'id'>>;
  changeAssortmant?: Resolver<Maybe<ResolversTypes['Assortment']>, ParentType, ContextType, RequireFields<MutationChangeAssortmantArgs, 'id'>>;
  addDeliveryPrice?: Resolver<Maybe<ResolversTypes['DeliveryPrice']>, ParentType, ContextType, RequireFields<MutationAddDeliveryPriceArgs, 'price'>>;
  changeDeliveryPrice?: Resolver<Maybe<ResolversTypes['DeliveryPrice']>, ParentType, ContextType, RequireFields<MutationChangeDeliveryPriceArgs, 'id'>>;
  addPhone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType, RequireFields<MutationAddPhoneArgs, 'number'>>;
  deletePhone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType, RequireFields<MutationDeletePhoneArgs, 'id'>>;
  addSocialNet?: Resolver<Maybe<ResolversTypes['SocialNet']>, ParentType, ContextType, RequireFields<MutationAddSocialNetArgs, 'name' | 'link' | 'image'>>;
  deleteSocialNet?: Resolver<Maybe<ResolversTypes['SocialNet']>, ParentType, ContextType, RequireFields<MutationDeleteSocialNetArgs, 'id'>>;
  changeManyPricesToBalloons?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeManyPricesToBalloonsArgs, 'oldPrice' | 'newPrice'>>;
  changeManyPricesToBouquets?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeManyPricesToBouquetsArgs, 'oldPrice' | 'newPrice'>>;
  sendOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendOrderArgs, 'order'>>;
}>;

export type PhoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['Phone'] = ResolversParentTypes['Phone']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RootQueryTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQueryType'] = ResolversParentTypes['RootQueryType']> = ResolversObject<{
  bouquet?: Resolver<Maybe<ResolversTypes['Bouquet']>, ParentType, ContextType, RequireFields<RootQueryTypeBouquetArgs, 'id'>>;
  bouquets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bouquet']>>>, ParentType, ContextType, RequireFields<RootQueryTypeBouquetsArgs, 'skip' | 'take'>>;
  balloon?: Resolver<Maybe<ResolversTypes['Balloon']>, ParentType, ContextType, RequireFields<RootQueryTypeBalloonArgs, 'id'>>;
  balloons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Balloon']>>>, ParentType, ContextType, RequireFields<RootQueryTypeBalloonsArgs, 'skip' | 'take'>>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  colors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Color']>>>, ParentType, ContextType>;
  assortment?: Resolver<Maybe<Array<Maybe<ResolversTypes['Assortment']>>>, ParentType, ContextType>;
  phones?: Resolver<Maybe<Array<Maybe<ResolversTypes['Phone']>>>, ParentType, ContextType>;
  socialNets?: Resolver<Maybe<Array<Maybe<ResolversTypes['SocialNet']>>>, ParentType, ContextType>;
  deliveryPrice?: Resolver<Maybe<ResolversTypes['DeliveryPrice']>, ParentType, ContextType>;
  allBouquets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<RootQueryTypeAllBouquetsArgs, never>>;
  allBalloons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<RootQueryTypeAllBalloonsArgs, never>>;
  maxBouquetPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxBalloonPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type SocialNetResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialNet'] = ResolversParentTypes['SocialNet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Assortment?: AssortmentResolvers<ContextType>;
  Balloon?: BalloonResolvers<ContextType>;
  Bouquet?: BouquetResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Color?: ColorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeliveryPrice?: DeliveryPriceResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Phone?: PhoneResolvers<ContextType>;
  RootQueryType?: RootQueryTypeResolvers<ContextType>;
  SocialNet?: SocialNetResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;



export const AddAssortmentDocument = gql`
    mutation AddAssortment($name: String!, $price: String!, $fixed: Boolean!) {
  addAssortment(name: $name, price: $price, fixed: $fixed) {
    id
    name
    price
    fixed
  }
}
    `;
export type AddAssortmentMutationFn = Apollo.MutationFunction<AddAssortmentMutation, AddAssortmentMutationVariables>;

/**
 * __useAddAssortmentMutation__
 *
 * To run a mutation, you first call `useAddAssortmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssortmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssortmentMutation, { data, loading, error }] = useAddAssortmentMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      fixed: // value for 'fixed'
 *   },
 * });
 */
export function useAddAssortmentMutation(baseOptions?: Apollo.MutationHookOptions<AddAssortmentMutation, AddAssortmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAssortmentMutation, AddAssortmentMutationVariables>(AddAssortmentDocument, options);
      }
export type AddAssortmentMutationHookResult = ReturnType<typeof useAddAssortmentMutation>;
export type AddAssortmentMutationResult = Apollo.MutationResult<AddAssortmentMutation>;
export type AddAssortmentMutationOptions = Apollo.BaseMutationOptions<AddAssortmentMutation, AddAssortmentMutationVariables>;
export const AddBalloonDocument = gql`
    mutation AddBalloon($name: String!, $subname: String!, $price: Int!, $description: String!, $code: Int!, $image: Upload!, $categoryId: ID!, $colorId: ID!) {
  addBalloon(
    name: $name
    subname: $subname
    price: $price
    description: $description
    code: $code
    image: $image
    categoryId: $categoryId
    colorId: $colorId
  ) {
    id
    name
    subname
    price
    description
    code
    image
    category {
      id
      name
    }
    color {
      id
      name
    }
  }
}
    `;
export type AddBalloonMutationFn = Apollo.MutationFunction<AddBalloonMutation, AddBalloonMutationVariables>;

/**
 * __useAddBalloonMutation__
 *
 * To run a mutation, you first call `useAddBalloonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBalloonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBalloonMutation, { data, loading, error }] = useAddBalloonMutation({
 *   variables: {
 *      name: // value for 'name'
 *      subname: // value for 'subname'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      code: // value for 'code'
 *      image: // value for 'image'
 *      categoryId: // value for 'categoryId'
 *      colorId: // value for 'colorId'
 *   },
 * });
 */
export function useAddBalloonMutation(baseOptions?: Apollo.MutationHookOptions<AddBalloonMutation, AddBalloonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBalloonMutation, AddBalloonMutationVariables>(AddBalloonDocument, options);
      }
export type AddBalloonMutationHookResult = ReturnType<typeof useAddBalloonMutation>;
export type AddBalloonMutationResult = Apollo.MutationResult<AddBalloonMutation>;
export type AddBalloonMutationOptions = Apollo.BaseMutationOptions<AddBalloonMutation, AddBalloonMutationVariables>;
export const AddBouquetDocument = gql`
    mutation AddBouquet($name: String!, $subname: String!, $price: Int!, $description: String!, $code: Int!, $image: Upload!, $personType: Person!) {
  addBouquet(
    name: $name
    subname: $subname
    price: $price
    description: $description
    code: $code
    image: $image
    personType: $personType
  ) {
    id
    name
    subname
    price
    description
    code
    image
    personType
  }
}
    `;
export type AddBouquetMutationFn = Apollo.MutationFunction<AddBouquetMutation, AddBouquetMutationVariables>;

/**
 * __useAddBouquetMutation__
 *
 * To run a mutation, you first call `useAddBouquetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBouquetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBouquetMutation, { data, loading, error }] = useAddBouquetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      subname: // value for 'subname'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      code: // value for 'code'
 *      image: // value for 'image'
 *      personType: // value for 'personType'
 *   },
 * });
 */
export function useAddBouquetMutation(baseOptions?: Apollo.MutationHookOptions<AddBouquetMutation, AddBouquetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBouquetMutation, AddBouquetMutationVariables>(AddBouquetDocument, options);
      }
export type AddBouquetMutationHookResult = ReturnType<typeof useAddBouquetMutation>;
export type AddBouquetMutationResult = Apollo.MutationResult<AddBouquetMutation>;
export type AddBouquetMutationOptions = Apollo.BaseMutationOptions<AddBouquetMutation, AddBouquetMutationVariables>;
export const AddCategoryDocument = gql`
    mutation AddCategory($name: String!) {
  addCategory(name: $name) {
    id
    name
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddColorDocument = gql`
    mutation AddColor($name: String!, $cssName: String!) {
  addColor(name: $name, cssName: $cssName) {
    id
    name
    cssName
  }
}
    `;
export type AddColorMutationFn = Apollo.MutationFunction<AddColorMutation, AddColorMutationVariables>;

/**
 * __useAddColorMutation__
 *
 * To run a mutation, you first call `useAddColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addColorMutation, { data, loading, error }] = useAddColorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      cssName: // value for 'cssName'
 *   },
 * });
 */
export function useAddColorMutation(baseOptions?: Apollo.MutationHookOptions<AddColorMutation, AddColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddColorMutation, AddColorMutationVariables>(AddColorDocument, options);
      }
export type AddColorMutationHookResult = ReturnType<typeof useAddColorMutation>;
export type AddColorMutationResult = Apollo.MutationResult<AddColorMutation>;
export type AddColorMutationOptions = Apollo.BaseMutationOptions<AddColorMutation, AddColorMutationVariables>;
export const AddDeliveryPriceDocument = gql`
    mutation AddDeliveryPrice($price: String!) {
  addDeliveryPrice(price: $price) {
    id
    price
  }
}
    `;
export type AddDeliveryPriceMutationFn = Apollo.MutationFunction<AddDeliveryPriceMutation, AddDeliveryPriceMutationVariables>;

/**
 * __useAddDeliveryPriceMutation__
 *
 * To run a mutation, you first call `useAddDeliveryPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDeliveryPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDeliveryPriceMutation, { data, loading, error }] = useAddDeliveryPriceMutation({
 *   variables: {
 *      price: // value for 'price'
 *   },
 * });
 */
export function useAddDeliveryPriceMutation(baseOptions?: Apollo.MutationHookOptions<AddDeliveryPriceMutation, AddDeliveryPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDeliveryPriceMutation, AddDeliveryPriceMutationVariables>(AddDeliveryPriceDocument, options);
      }
export type AddDeliveryPriceMutationHookResult = ReturnType<typeof useAddDeliveryPriceMutation>;
export type AddDeliveryPriceMutationResult = Apollo.MutationResult<AddDeliveryPriceMutation>;
export type AddDeliveryPriceMutationOptions = Apollo.BaseMutationOptions<AddDeliveryPriceMutation, AddDeliveryPriceMutationVariables>;
export const AddPhoneDocument = gql`
    mutation AddPhone($number: String!) {
  addPhone(number: $number) {
    id
    number
  }
}
    `;
export type AddPhoneMutationFn = Apollo.MutationFunction<AddPhoneMutation, AddPhoneMutationVariables>;

/**
 * __useAddPhoneMutation__
 *
 * To run a mutation, you first call `useAddPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPhoneMutation, { data, loading, error }] = useAddPhoneMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useAddPhoneMutation(baseOptions?: Apollo.MutationHookOptions<AddPhoneMutation, AddPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPhoneMutation, AddPhoneMutationVariables>(AddPhoneDocument, options);
      }
export type AddPhoneMutationHookResult = ReturnType<typeof useAddPhoneMutation>;
export type AddPhoneMutationResult = Apollo.MutationResult<AddPhoneMutation>;
export type AddPhoneMutationOptions = Apollo.BaseMutationOptions<AddPhoneMutation, AddPhoneMutationVariables>;
export const AddSocialNetDocument = gql`
    mutation AddSocialNet($name: String!, $link: String!, $image: String!) {
  addSocialNet(name: $name, link: $link, image: $image) {
    id
    name
    link
    image
  }
}
    `;
export type AddSocialNetMutationFn = Apollo.MutationFunction<AddSocialNetMutation, AddSocialNetMutationVariables>;

/**
 * __useAddSocialNetMutation__
 *
 * To run a mutation, you first call `useAddSocialNetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSocialNetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSocialNetMutation, { data, loading, error }] = useAddSocialNetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      link: // value for 'link'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAddSocialNetMutation(baseOptions?: Apollo.MutationHookOptions<AddSocialNetMutation, AddSocialNetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSocialNetMutation, AddSocialNetMutationVariables>(AddSocialNetDocument, options);
      }
export type AddSocialNetMutationHookResult = ReturnType<typeof useAddSocialNetMutation>;
export type AddSocialNetMutationResult = Apollo.MutationResult<AddSocialNetMutation>;
export type AddSocialNetMutationOptions = Apollo.BaseMutationOptions<AddSocialNetMutation, AddSocialNetMutationVariables>;
export const ChangeAssortmantDocument = gql`
    mutation ChangeAssortmant($id: ID!, $name: String, $price: String, $fixed: Boolean) {
  changeAssortmant(id: $id, name: $name, price: $price, fixed: $fixed) {
    id
    name
    price
    fixed
  }
}
    `;
export type ChangeAssortmantMutationFn = Apollo.MutationFunction<ChangeAssortmantMutation, ChangeAssortmantMutationVariables>;

/**
 * __useChangeAssortmantMutation__
 *
 * To run a mutation, you first call `useChangeAssortmantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAssortmantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAssortmantMutation, { data, loading, error }] = useChangeAssortmantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      fixed: // value for 'fixed'
 *   },
 * });
 */
export function useChangeAssortmantMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAssortmantMutation, ChangeAssortmantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeAssortmantMutation, ChangeAssortmantMutationVariables>(ChangeAssortmantDocument, options);
      }
export type ChangeAssortmantMutationHookResult = ReturnType<typeof useChangeAssortmantMutation>;
export type ChangeAssortmantMutationResult = Apollo.MutationResult<ChangeAssortmantMutation>;
export type ChangeAssortmantMutationOptions = Apollo.BaseMutationOptions<ChangeAssortmantMutation, ChangeAssortmantMutationVariables>;
export const ChangeBalloonDocument = gql`
    mutation ChangeBalloon($id: String!, $name: String, $subname: String, $price: Int, $description: String, $code: Int, $image: Upload, $categoryId: ID, $colorId: ID) {
  changeBalloon(
    id: $id
    name: $name
    subname: $subname
    price: $price
    description: $description
    code: $code
    image: $image
    categoryId: $categoryId
    colorId: $colorId
  ) {
    id
    name
    subname
    price
    description
    code
    image
    category {
      id
      name
    }
    color {
      id
      name
    }
  }
}
    `;
export type ChangeBalloonMutationFn = Apollo.MutationFunction<ChangeBalloonMutation, ChangeBalloonMutationVariables>;

/**
 * __useChangeBalloonMutation__
 *
 * To run a mutation, you first call `useChangeBalloonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBalloonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBalloonMutation, { data, loading, error }] = useChangeBalloonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      subname: // value for 'subname'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      code: // value for 'code'
 *      image: // value for 'image'
 *      categoryId: // value for 'categoryId'
 *      colorId: // value for 'colorId'
 *   },
 * });
 */
export function useChangeBalloonMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBalloonMutation, ChangeBalloonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBalloonMutation, ChangeBalloonMutationVariables>(ChangeBalloonDocument, options);
      }
export type ChangeBalloonMutationHookResult = ReturnType<typeof useChangeBalloonMutation>;
export type ChangeBalloonMutationResult = Apollo.MutationResult<ChangeBalloonMutation>;
export type ChangeBalloonMutationOptions = Apollo.BaseMutationOptions<ChangeBalloonMutation, ChangeBalloonMutationVariables>;
export const ChangeBouquetDocument = gql`
    mutation ChangeBouquet($id: String!, $name: String, $subname: String, $price: Int, $description: String, $code: Int, $image: Upload, $personType: Person) {
  changeBouquet(
    id: $id
    name: $name
    subname: $subname
    price: $price
    description: $description
    code: $code
    image: $image
    personType: $personType
  ) {
    id
    name
    subname
    price
    description
    code
    image
    personType
  }
}
    `;
export type ChangeBouquetMutationFn = Apollo.MutationFunction<ChangeBouquetMutation, ChangeBouquetMutationVariables>;

/**
 * __useChangeBouquetMutation__
 *
 * To run a mutation, you first call `useChangeBouquetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBouquetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBouquetMutation, { data, loading, error }] = useChangeBouquetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      subname: // value for 'subname'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      code: // value for 'code'
 *      image: // value for 'image'
 *      personType: // value for 'personType'
 *   },
 * });
 */
export function useChangeBouquetMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBouquetMutation, ChangeBouquetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBouquetMutation, ChangeBouquetMutationVariables>(ChangeBouquetDocument, options);
      }
export type ChangeBouquetMutationHookResult = ReturnType<typeof useChangeBouquetMutation>;
export type ChangeBouquetMutationResult = Apollo.MutationResult<ChangeBouquetMutation>;
export type ChangeBouquetMutationOptions = Apollo.BaseMutationOptions<ChangeBouquetMutation, ChangeBouquetMutationVariables>;
export const ChangeDeliveryPriceDocument = gql`
    mutation ChangeDeliveryPrice($id: ID!, $price: String) {
  changeDeliveryPrice(id: $id, price: $price) {
    id
    price
  }
}
    `;
export type ChangeDeliveryPriceMutationFn = Apollo.MutationFunction<ChangeDeliveryPriceMutation, ChangeDeliveryPriceMutationVariables>;

/**
 * __useChangeDeliveryPriceMutation__
 *
 * To run a mutation, you first call `useChangeDeliveryPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDeliveryPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDeliveryPriceMutation, { data, loading, error }] = useChangeDeliveryPriceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useChangeDeliveryPriceMutation(baseOptions?: Apollo.MutationHookOptions<ChangeDeliveryPriceMutation, ChangeDeliveryPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeDeliveryPriceMutation, ChangeDeliveryPriceMutationVariables>(ChangeDeliveryPriceDocument, options);
      }
export type ChangeDeliveryPriceMutationHookResult = ReturnType<typeof useChangeDeliveryPriceMutation>;
export type ChangeDeliveryPriceMutationResult = Apollo.MutationResult<ChangeDeliveryPriceMutation>;
export type ChangeDeliveryPriceMutationOptions = Apollo.BaseMutationOptions<ChangeDeliveryPriceMutation, ChangeDeliveryPriceMutationVariables>;
export const ChangeManyPricesToBalloonsDocument = gql`
    mutation changeManyPricesToBalloons($oldPrice: Int!, $newPrice: Int!) {
  changeManyPricesToBalloons(oldPrice: $oldPrice, newPrice: $newPrice)
}
    `;
export type ChangeManyPricesToBalloonsMutationFn = Apollo.MutationFunction<ChangeManyPricesToBalloonsMutation, ChangeManyPricesToBalloonsMutationVariables>;

/**
 * __useChangeManyPricesToBalloonsMutation__
 *
 * To run a mutation, you first call `useChangeManyPricesToBalloonsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeManyPricesToBalloonsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeManyPricesToBalloonsMutation, { data, loading, error }] = useChangeManyPricesToBalloonsMutation({
 *   variables: {
 *      oldPrice: // value for 'oldPrice'
 *      newPrice: // value for 'newPrice'
 *   },
 * });
 */
export function useChangeManyPricesToBalloonsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeManyPricesToBalloonsMutation, ChangeManyPricesToBalloonsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeManyPricesToBalloonsMutation, ChangeManyPricesToBalloonsMutationVariables>(ChangeManyPricesToBalloonsDocument, options);
      }
export type ChangeManyPricesToBalloonsMutationHookResult = ReturnType<typeof useChangeManyPricesToBalloonsMutation>;
export type ChangeManyPricesToBalloonsMutationResult = Apollo.MutationResult<ChangeManyPricesToBalloonsMutation>;
export type ChangeManyPricesToBalloonsMutationOptions = Apollo.BaseMutationOptions<ChangeManyPricesToBalloonsMutation, ChangeManyPricesToBalloonsMutationVariables>;
export const ChangeManyPricesToBouquetsDocument = gql`
    mutation changeManyPricesToBouquets($oldPrice: Int!, $newPrice: Int!) {
  changeManyPricesToBouquets(oldPrice: $oldPrice, newPrice: $newPrice)
}
    `;
export type ChangeManyPricesToBouquetsMutationFn = Apollo.MutationFunction<ChangeManyPricesToBouquetsMutation, ChangeManyPricesToBouquetsMutationVariables>;

/**
 * __useChangeManyPricesToBouquetsMutation__
 *
 * To run a mutation, you first call `useChangeManyPricesToBouquetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeManyPricesToBouquetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeManyPricesToBouquetsMutation, { data, loading, error }] = useChangeManyPricesToBouquetsMutation({
 *   variables: {
 *      oldPrice: // value for 'oldPrice'
 *      newPrice: // value for 'newPrice'
 *   },
 * });
 */
export function useChangeManyPricesToBouquetsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeManyPricesToBouquetsMutation, ChangeManyPricesToBouquetsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeManyPricesToBouquetsMutation, ChangeManyPricesToBouquetsMutationVariables>(ChangeManyPricesToBouquetsDocument, options);
      }
export type ChangeManyPricesToBouquetsMutationHookResult = ReturnType<typeof useChangeManyPricesToBouquetsMutation>;
export type ChangeManyPricesToBouquetsMutationResult = Apollo.MutationResult<ChangeManyPricesToBouquetsMutation>;
export type ChangeManyPricesToBouquetsMutationOptions = Apollo.BaseMutationOptions<ChangeManyPricesToBouquetsMutation, ChangeManyPricesToBouquetsMutationVariables>;
export const DeleteAssortmantDocument = gql`
    mutation DeleteAssortmant($id: ID!) {
  deleteAssortmant(id: $id) {
    id
    name
    price
    fixed
  }
}
    `;
export type DeleteAssortmantMutationFn = Apollo.MutationFunction<DeleteAssortmantMutation, DeleteAssortmantMutationVariables>;

/**
 * __useDeleteAssortmantMutation__
 *
 * To run a mutation, you first call `useDeleteAssortmantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssortmantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssortmantMutation, { data, loading, error }] = useDeleteAssortmantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAssortmantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssortmantMutation, DeleteAssortmantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssortmantMutation, DeleteAssortmantMutationVariables>(DeleteAssortmantDocument, options);
      }
export type DeleteAssortmantMutationHookResult = ReturnType<typeof useDeleteAssortmantMutation>;
export type DeleteAssortmantMutationResult = Apollo.MutationResult<DeleteAssortmantMutation>;
export type DeleteAssortmantMutationOptions = Apollo.BaseMutationOptions<DeleteAssortmantMutation, DeleteAssortmantMutationVariables>;
export const DeleteBalloonDocument = gql`
    mutation DeleteBalloon($id: String!) {
  deleteBalloon(id: $id) {
    id
    name
    subname
    price
    description
    code
    image
    category {
      id
      name
    }
    color {
      id
      name
    }
  }
}
    `;
export type DeleteBalloonMutationFn = Apollo.MutationFunction<DeleteBalloonMutation, DeleteBalloonMutationVariables>;

/**
 * __useDeleteBalloonMutation__
 *
 * To run a mutation, you first call `useDeleteBalloonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBalloonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBalloonMutation, { data, loading, error }] = useDeleteBalloonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBalloonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBalloonMutation, DeleteBalloonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBalloonMutation, DeleteBalloonMutationVariables>(DeleteBalloonDocument, options);
      }
export type DeleteBalloonMutationHookResult = ReturnType<typeof useDeleteBalloonMutation>;
export type DeleteBalloonMutationResult = Apollo.MutationResult<DeleteBalloonMutation>;
export type DeleteBalloonMutationOptions = Apollo.BaseMutationOptions<DeleteBalloonMutation, DeleteBalloonMutationVariables>;
export const DeleteBouquetDocument = gql`
    mutation DeleteBouquet($id: String!) {
  deleteBouquet(id: $id) {
    id
    name
    subname
    price
    description
    code
    image
    personType
  }
}
    `;
export type DeleteBouquetMutationFn = Apollo.MutationFunction<DeleteBouquetMutation, DeleteBouquetMutationVariables>;

/**
 * __useDeleteBouquetMutation__
 *
 * To run a mutation, you first call `useDeleteBouquetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBouquetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBouquetMutation, { data, loading, error }] = useDeleteBouquetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBouquetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBouquetMutation, DeleteBouquetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBouquetMutation, DeleteBouquetMutationVariables>(DeleteBouquetDocument, options);
      }
export type DeleteBouquetMutationHookResult = ReturnType<typeof useDeleteBouquetMutation>;
export type DeleteBouquetMutationResult = Apollo.MutationResult<DeleteBouquetMutation>;
export type DeleteBouquetMutationOptions = Apollo.BaseMutationOptions<DeleteBouquetMutation, DeleteBouquetMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
    name
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteColorDocument = gql`
    mutation DeleteColor($id: ID!) {
  deleteColor(id: $id) {
    id
    name
    cssName
  }
}
    `;
export type DeleteColorMutationFn = Apollo.MutationFunction<DeleteColorMutation, DeleteColorMutationVariables>;

/**
 * __useDeleteColorMutation__
 *
 * To run a mutation, you first call `useDeleteColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteColorMutation, { data, loading, error }] = useDeleteColorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteColorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteColorMutation, DeleteColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteColorMutation, DeleteColorMutationVariables>(DeleteColorDocument, options);
      }
export type DeleteColorMutationHookResult = ReturnType<typeof useDeleteColorMutation>;
export type DeleteColorMutationResult = Apollo.MutationResult<DeleteColorMutation>;
export type DeleteColorMutationOptions = Apollo.BaseMutationOptions<DeleteColorMutation, DeleteColorMutationVariables>;
export const DeletePhoneDocument = gql`
    mutation DeletePhone($id: ID!) {
  deletePhone(id: $id) {
    id
    number
  }
}
    `;
export type DeletePhoneMutationFn = Apollo.MutationFunction<DeletePhoneMutation, DeletePhoneMutationVariables>;

/**
 * __useDeletePhoneMutation__
 *
 * To run a mutation, you first call `useDeletePhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhoneMutation, { data, loading, error }] = useDeletePhoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhoneMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhoneMutation, DeletePhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhoneMutation, DeletePhoneMutationVariables>(DeletePhoneDocument, options);
      }
export type DeletePhoneMutationHookResult = ReturnType<typeof useDeletePhoneMutation>;
export type DeletePhoneMutationResult = Apollo.MutationResult<DeletePhoneMutation>;
export type DeletePhoneMutationOptions = Apollo.BaseMutationOptions<DeletePhoneMutation, DeletePhoneMutationVariables>;
export const DeleteSocialNetDocument = gql`
    mutation DeleteSocialNet($id: ID!) {
  deleteSocialNet(id: $id) {
    id
    name
    link
    image
  }
}
    `;
export type DeleteSocialNetMutationFn = Apollo.MutationFunction<DeleteSocialNetMutation, DeleteSocialNetMutationVariables>;

/**
 * __useDeleteSocialNetMutation__
 *
 * To run a mutation, you first call `useDeleteSocialNetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSocialNetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSocialNetMutation, { data, loading, error }] = useDeleteSocialNetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSocialNetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSocialNetMutation, DeleteSocialNetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSocialNetMutation, DeleteSocialNetMutationVariables>(DeleteSocialNetDocument, options);
      }
export type DeleteSocialNetMutationHookResult = ReturnType<typeof useDeleteSocialNetMutation>;
export type DeleteSocialNetMutationResult = Apollo.MutationResult<DeleteSocialNetMutation>;
export type DeleteSocialNetMutationOptions = Apollo.BaseMutationOptions<DeleteSocialNetMutation, DeleteSocialNetMutationVariables>;
export const SendOrderDocument = gql`
    mutation SendOrder($order: JSON!) {
  sendOrder(order: $order)
}
    `;
export type SendOrderMutationFn = Apollo.MutationFunction<SendOrderMutation, SendOrderMutationVariables>;

/**
 * __useSendOrderMutation__
 *
 * To run a mutation, you first call `useSendOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOrderMutation, { data, loading, error }] = useSendOrderMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSendOrderMutation(baseOptions?: Apollo.MutationHookOptions<SendOrderMutation, SendOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOrderMutation, SendOrderMutationVariables>(SendOrderDocument, options);
      }
export type SendOrderMutationHookResult = ReturnType<typeof useSendOrderMutation>;
export type SendOrderMutationResult = Apollo.MutationResult<SendOrderMutation>;
export type SendOrderMutationOptions = Apollo.BaseMutationOptions<SendOrderMutation, SendOrderMutationVariables>;
export const AllBalloonsDocument = gql`
    query AllBalloons($price: Int, $categoryId: ID, $colorId: ID, $code: Int) {
  allBalloons(
    price: $price
    categoryId: $categoryId
    colorId: $colorId
    code: $code
  )
}
    `;

/**
 * __useAllBalloonsQuery__
 *
 * To run a query within a React component, call `useAllBalloonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBalloonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBalloonsQuery({
 *   variables: {
 *      price: // value for 'price'
 *      categoryId: // value for 'categoryId'
 *      colorId: // value for 'colorId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAllBalloonsQuery(baseOptions?: Apollo.QueryHookOptions<AllBalloonsQuery, AllBalloonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBalloonsQuery, AllBalloonsQueryVariables>(AllBalloonsDocument, options);
      }
export function useAllBalloonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBalloonsQuery, AllBalloonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBalloonsQuery, AllBalloonsQueryVariables>(AllBalloonsDocument, options);
        }
export type AllBalloonsQueryHookResult = ReturnType<typeof useAllBalloonsQuery>;
export type AllBalloonsLazyQueryHookResult = ReturnType<typeof useAllBalloonsLazyQuery>;
export type AllBalloonsQueryResult = Apollo.QueryResult<AllBalloonsQuery, AllBalloonsQueryVariables>;
export const AllBouquetsDocument = gql`
    query AllBouquets($price: Int, $personType: Person, $code: Int) {
  allBouquets(price: $price, personType: $personType, code: $code)
}
    `;

/**
 * __useAllBouquetsQuery__
 *
 * To run a query within a React component, call `useAllBouquetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBouquetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBouquetsQuery({
 *   variables: {
 *      price: // value for 'price'
 *      personType: // value for 'personType'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAllBouquetsQuery(baseOptions?: Apollo.QueryHookOptions<AllBouquetsQuery, AllBouquetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBouquetsQuery, AllBouquetsQueryVariables>(AllBouquetsDocument, options);
      }
export function useAllBouquetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBouquetsQuery, AllBouquetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBouquetsQuery, AllBouquetsQueryVariables>(AllBouquetsDocument, options);
        }
export type AllBouquetsQueryHookResult = ReturnType<typeof useAllBouquetsQuery>;
export type AllBouquetsLazyQueryHookResult = ReturnType<typeof useAllBouquetsLazyQuery>;
export type AllBouquetsQueryResult = Apollo.QueryResult<AllBouquetsQuery, AllBouquetsQueryVariables>;
export const AssortmentDocument = gql`
    query Assortment {
  assortment {
    id
    name
    price
    fixed
  }
}
    `;

/**
 * __useAssortmentQuery__
 *
 * To run a query within a React component, call `useAssortmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssortmentQuery(baseOptions?: Apollo.QueryHookOptions<AssortmentQuery, AssortmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssortmentQuery, AssortmentQueryVariables>(AssortmentDocument, options);
      }
export function useAssortmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssortmentQuery, AssortmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssortmentQuery, AssortmentQueryVariables>(AssortmentDocument, options);
        }
export type AssortmentQueryHookResult = ReturnType<typeof useAssortmentQuery>;
export type AssortmentLazyQueryHookResult = ReturnType<typeof useAssortmentLazyQuery>;
export type AssortmentQueryResult = Apollo.QueryResult<AssortmentQuery, AssortmentQueryVariables>;
export const BalloonDocument = gql`
    query Balloon($id: String!) {
  balloon(id: $id) {
    id
    name
    subname
    price
    description
    code
    image
    category {
      id
      name
    }
    color {
      id
      name
    }
  }
}
    `;

/**
 * __useBalloonQuery__
 *
 * To run a query within a React component, call `useBalloonQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalloonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalloonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBalloonQuery(baseOptions: Apollo.QueryHookOptions<BalloonQuery, BalloonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BalloonQuery, BalloonQueryVariables>(BalloonDocument, options);
      }
export function useBalloonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BalloonQuery, BalloonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BalloonQuery, BalloonQueryVariables>(BalloonDocument, options);
        }
export type BalloonQueryHookResult = ReturnType<typeof useBalloonQuery>;
export type BalloonLazyQueryHookResult = ReturnType<typeof useBalloonLazyQuery>;
export type BalloonQueryResult = Apollo.QueryResult<BalloonQuery, BalloonQueryVariables>;
export const BalloonsDocument = gql`
    query Balloons($skip: Int!, $take: Int!, $price: Int, $categoryId: ID, $colorId: ID, $code: Int) {
  balloons(
    skip: $skip
    take: $take
    price: $price
    categoryId: $categoryId
    colorId: $colorId
    code: $code
  ) {
    id
    name
    subname
    price
    description
    code
    image
    category {
      id
      name
    }
    color {
      id
      name
    }
  }
}
    `;

/**
 * __useBalloonsQuery__
 *
 * To run a query within a React component, call `useBalloonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalloonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalloonsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      price: // value for 'price'
 *      categoryId: // value for 'categoryId'
 *      colorId: // value for 'colorId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useBalloonsQuery(baseOptions: Apollo.QueryHookOptions<BalloonsQuery, BalloonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BalloonsQuery, BalloonsQueryVariables>(BalloonsDocument, options);
      }
export function useBalloonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BalloonsQuery, BalloonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BalloonsQuery, BalloonsQueryVariables>(BalloonsDocument, options);
        }
export type BalloonsQueryHookResult = ReturnType<typeof useBalloonsQuery>;
export type BalloonsLazyQueryHookResult = ReturnType<typeof useBalloonsLazyQuery>;
export type BalloonsQueryResult = Apollo.QueryResult<BalloonsQuery, BalloonsQueryVariables>;
export const BouquetDocument = gql`
    query Bouquet($id: String!) {
  bouquet(id: $id) {
    id
    name
    subname
    price
    description
    code
    image
    personType
  }
}
    `;

/**
 * __useBouquetQuery__
 *
 * To run a query within a React component, call `useBouquetQuery` and pass it any options that fit your needs.
 * When your component renders, `useBouquetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBouquetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBouquetQuery(baseOptions: Apollo.QueryHookOptions<BouquetQuery, BouquetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BouquetQuery, BouquetQueryVariables>(BouquetDocument, options);
      }
export function useBouquetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BouquetQuery, BouquetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BouquetQuery, BouquetQueryVariables>(BouquetDocument, options);
        }
export type BouquetQueryHookResult = ReturnType<typeof useBouquetQuery>;
export type BouquetLazyQueryHookResult = ReturnType<typeof useBouquetLazyQuery>;
export type BouquetQueryResult = Apollo.QueryResult<BouquetQuery, BouquetQueryVariables>;
export const BouquetsDocument = gql`
    query Bouquets($skip: Int!, $take: Int!, $price: Int, $personType: Person, $code: Int) {
  bouquets(
    skip: $skip
    take: $take
    price: $price
    personType: $personType
    code: $code
  ) {
    id
    name
    subname
    price
    description
    code
    image
    personType
  }
}
    `;

/**
 * __useBouquetsQuery__
 *
 * To run a query within a React component, call `useBouquetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBouquetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBouquetsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      price: // value for 'price'
 *      personType: // value for 'personType'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useBouquetsQuery(baseOptions: Apollo.QueryHookOptions<BouquetsQuery, BouquetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BouquetsQuery, BouquetsQueryVariables>(BouquetsDocument, options);
      }
export function useBouquetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BouquetsQuery, BouquetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BouquetsQuery, BouquetsQueryVariables>(BouquetsDocument, options);
        }
export type BouquetsQueryHookResult = ReturnType<typeof useBouquetsQuery>;
export type BouquetsLazyQueryHookResult = ReturnType<typeof useBouquetsLazyQuery>;
export type BouquetsQueryResult = Apollo.QueryResult<BouquetsQuery, BouquetsQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ColorsDocument = gql`
    query Colors {
  colors {
    id
    name
    cssName
  }
}
    `;

/**
 * __useColorsQuery__
 *
 * To run a query within a React component, call `useColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useColorsQuery(baseOptions?: Apollo.QueryHookOptions<ColorsQuery, ColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ColorsQuery, ColorsQueryVariables>(ColorsDocument, options);
      }
export function useColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ColorsQuery, ColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ColorsQuery, ColorsQueryVariables>(ColorsDocument, options);
        }
export type ColorsQueryHookResult = ReturnType<typeof useColorsQuery>;
export type ColorsLazyQueryHookResult = ReturnType<typeof useColorsLazyQuery>;
export type ColorsQueryResult = Apollo.QueryResult<ColorsQuery, ColorsQueryVariables>;
export const DeliveryPriceDocument = gql`
    query DeliveryPrice {
  deliveryPrice {
    id
    price
  }
}
    `;

/**
 * __useDeliveryPriceQuery__
 *
 * To run a query within a React component, call `useDeliveryPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryPriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeliveryPriceQuery(baseOptions?: Apollo.QueryHookOptions<DeliveryPriceQuery, DeliveryPriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryPriceQuery, DeliveryPriceQueryVariables>(DeliveryPriceDocument, options);
      }
export function useDeliveryPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryPriceQuery, DeliveryPriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryPriceQuery, DeliveryPriceQueryVariables>(DeliveryPriceDocument, options);
        }
export type DeliveryPriceQueryHookResult = ReturnType<typeof useDeliveryPriceQuery>;
export type DeliveryPriceLazyQueryHookResult = ReturnType<typeof useDeliveryPriceLazyQuery>;
export type DeliveryPriceQueryResult = Apollo.QueryResult<DeliveryPriceQuery, DeliveryPriceQueryVariables>;
export const MaxBalloonPriceDocument = gql`
    query MaxBalloonPrice {
  maxBalloonPrice
}
    `;

/**
 * __useMaxBalloonPriceQuery__
 *
 * To run a query within a React component, call `useMaxBalloonPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaxBalloonPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaxBalloonPriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useMaxBalloonPriceQuery(baseOptions?: Apollo.QueryHookOptions<MaxBalloonPriceQuery, MaxBalloonPriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaxBalloonPriceQuery, MaxBalloonPriceQueryVariables>(MaxBalloonPriceDocument, options);
      }
export function useMaxBalloonPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaxBalloonPriceQuery, MaxBalloonPriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaxBalloonPriceQuery, MaxBalloonPriceQueryVariables>(MaxBalloonPriceDocument, options);
        }
export type MaxBalloonPriceQueryHookResult = ReturnType<typeof useMaxBalloonPriceQuery>;
export type MaxBalloonPriceLazyQueryHookResult = ReturnType<typeof useMaxBalloonPriceLazyQuery>;
export type MaxBalloonPriceQueryResult = Apollo.QueryResult<MaxBalloonPriceQuery, MaxBalloonPriceQueryVariables>;
export const MaxBouquetPriceDocument = gql`
    query MaxBouquetPrice {
  maxBouquetPrice
}
    `;

/**
 * __useMaxBouquetPriceQuery__
 *
 * To run a query within a React component, call `useMaxBouquetPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaxBouquetPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaxBouquetPriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useMaxBouquetPriceQuery(baseOptions?: Apollo.QueryHookOptions<MaxBouquetPriceQuery, MaxBouquetPriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaxBouquetPriceQuery, MaxBouquetPriceQueryVariables>(MaxBouquetPriceDocument, options);
      }
export function useMaxBouquetPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaxBouquetPriceQuery, MaxBouquetPriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaxBouquetPriceQuery, MaxBouquetPriceQueryVariables>(MaxBouquetPriceDocument, options);
        }
export type MaxBouquetPriceQueryHookResult = ReturnType<typeof useMaxBouquetPriceQuery>;
export type MaxBouquetPriceLazyQueryHookResult = ReturnType<typeof useMaxBouquetPriceLazyQuery>;
export type MaxBouquetPriceQueryResult = Apollo.QueryResult<MaxBouquetPriceQuery, MaxBouquetPriceQueryVariables>;
export const PhonesDocument = gql`
    query Phones {
  phones {
    id
    number
  }
}
    `;

/**
 * __usePhonesQuery__
 *
 * To run a query within a React component, call `usePhonesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhonesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePhonesQuery(baseOptions?: Apollo.QueryHookOptions<PhonesQuery, PhonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PhonesQuery, PhonesQueryVariables>(PhonesDocument, options);
      }
export function usePhonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PhonesQuery, PhonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PhonesQuery, PhonesQueryVariables>(PhonesDocument, options);
        }
export type PhonesQueryHookResult = ReturnType<typeof usePhonesQuery>;
export type PhonesLazyQueryHookResult = ReturnType<typeof usePhonesLazyQuery>;
export type PhonesQueryResult = Apollo.QueryResult<PhonesQuery, PhonesQueryVariables>;
export const SocialNetsDocument = gql`
    query SocialNets {
  socialNets {
    id
    name
    link
    image
  }
}
    `;

/**
 * __useSocialNetsQuery__
 *
 * To run a query within a React component, call `useSocialNetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSocialNetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSocialNetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSocialNetsQuery(baseOptions?: Apollo.QueryHookOptions<SocialNetsQuery, SocialNetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SocialNetsQuery, SocialNetsQueryVariables>(SocialNetsDocument, options);
      }
export function useSocialNetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SocialNetsQuery, SocialNetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SocialNetsQuery, SocialNetsQueryVariables>(SocialNetsDocument, options);
        }
export type SocialNetsQueryHookResult = ReturnType<typeof useSocialNetsQuery>;
export type SocialNetsLazyQueryHookResult = ReturnType<typeof useSocialNetsLazyQuery>;
export type SocialNetsQueryResult = Apollo.QueryResult<SocialNetsQuery, SocialNetsQueryVariables>;