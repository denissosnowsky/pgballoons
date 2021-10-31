import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";
import { ApolloServerContext } from "../../types/ApolloServerContext";

export const BouquetType: GraphQLObjectType = new GraphQLObjectType({
  name: "Bouquet",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLString) },
    createdAt: { type: new GraphQLNonNull (GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull (GraphQLDateTime) },
    name: { type: new GraphQLNonNull (GraphQLString) },
    subname: { type: new GraphQLNonNull (GraphQLString) },
    price: { type: new GraphQLNonNull (GraphQLInt) },
    description: { type: new GraphQLNonNull (GraphQLString) },
    code: { type: new GraphQLNonNull (GraphQLInt) },
    image: { type: new GraphQLNonNull (GraphQLString) },
    personType: { type: new GraphQLNonNull (PersonType) },
  }),
});

export const PersonType: GraphQLEnumType = new GraphQLEnumType({
  name: "Person",
  values: {
    MAN: { value: "MAN" },
    WOMAN: { value: "WOMAN" },
    CHILD: { value: "CHILD" },
  },
});

export const BalloonType: GraphQLObjectType = new GraphQLObjectType({
  name: "Balloon",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLString) },
    createdAt: { type: new GraphQLNonNull (GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull (GraphQLDateTime) },
    name: { type: new GraphQLNonNull (GraphQLString) },
    subname: { type: new GraphQLNonNull (GraphQLString) },
    price: { type: new GraphQLNonNull (GraphQLInt) },
    description: { type: new GraphQLNonNull (GraphQLString) },
    code: { type: new GraphQLNonNull (GraphQLInt) },
    image: { type: new GraphQLNonNull (GraphQLString) },
    category: {
      type: CategoryType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.category.findUnique({where: {id: +parent.categoryId}});
      },
    },
    color: {
      type: ColorType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.color.findUnique({where: {id: +parent.colorId}});
      },
    },
  }),
});

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLID) },
    name: { type: new GraphQLNonNull (GraphQLString) },
    balloons: {
      type: GraphQLList(BalloonType),
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.balloon.findMany({where: {categoryId: +parent.id}});
      },
    },
  }),
});

export const ColorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Color",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLID) },
    name: { type: new GraphQLNonNull (GraphQLString) },
    cssName: { type: new GraphQLNonNull (GraphQLString) },
    balloons: {
      type: GraphQLList(BalloonType),
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.balloon.findMany({where: {colorId: +parent.id}});
      },
    },
  }),
});

export const AssortmentType: GraphQLObjectType = new GraphQLObjectType({
  name: "Assortment",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLID) },
    name: { type:new GraphQLNonNull ( GraphQLString) },
    price: { type: new GraphQLNonNull (GraphQLString) },
    fixed: { type: new GraphQLNonNull (GraphQLBoolean) },
  }),
});

export const PhoneType: GraphQLObjectType = new GraphQLObjectType({
  name: "Phone",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLID) },
    number: { type: new GraphQLNonNull (GraphQLString) },
  }),
});

export const SocialNetType: GraphQLObjectType = new GraphQLObjectType({
  name: "SocialNet",
  fields: () => ({
    id: { type: new GraphQLNonNull (GraphQLID) },
    name: { type: new GraphQLNonNull (GraphQLString) },
    link: { type: new GraphQLNonNull (GraphQLString) },
    image: { type: new GraphQLNonNull (GraphQLString) },
  }),
});

export const DeliveryPriceType: GraphQLObjectType = new GraphQLObjectType({
    name: "DeliveryPrice",
    fields: () => ({
        id: { type: new GraphQLNonNull (GraphQLID) },
        price: { type: new GraphQLNonNull (GraphQLString) }
    }),
});
