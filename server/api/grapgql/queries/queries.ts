import { ApolloServerContext } from "../../types/ApolloServerContext";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import {
  AssortmentType,
  BalloonType,
  BouquetType,
  CategoryType,
  ColorType,
  DeliveryPriceType,
  PersonType,
  PhoneType,
  SocialNetType,
} from "../types/types";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bouquet: {
      type: BouquetType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(_parent, { id }, ctx: ApolloServerContext) {
        return ctx.prisma.bouquet.findUnique({ where: { id: id } });
      },
    },
    bouquets: {
      type: new GraphQLList(BouquetType),
      args: {
        price: { type: GraphQLInt },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        take: { type: new GraphQLNonNull(GraphQLInt) },
        personType: { type: PersonType },
        code: { type: GraphQLInt },
      },
      resolve(
        _parent,
        { price, skip, take, personType, code },
        ctx: ApolloServerContext
      ) {
        return ctx.prisma.bouquet.findMany({
          skip,
          take,
          where: { price: { lte: price }, personType, code },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    },
    balloon: {
      type: BalloonType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(_parent, { id }, ctx: ApolloServerContext) {
        return ctx.prisma.balloon.findUnique({ where: { id: id } });
      },
    },
    balloons: {
      type: new GraphQLList(BalloonType),
      args: {
        price: { type: GraphQLInt },
        categoryId: { type: GraphQLID },
        colorId: { type: GraphQLID },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        take: { type: new GraphQLNonNull(GraphQLInt) },
        code: { type: GraphQLInt },
      },
      resolve(
        _parent,
        { price, categoryId, colorId, skip, take, code },
        ctx: ApolloServerContext
      ) {
        return ctx.prisma.balloon.findMany({
          skip,
          take,
          where: {
            price: { lte: price },
            categoryId: categoryId && +categoryId,
            colorId: colorId && +colorId,
            code,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.category.findMany();
      },
    },
    colors: {
      type: new GraphQLList(ColorType),
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.color.findMany();
      },
    },
    assortment: {
      type: new GraphQLList(AssortmentType),
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.assortment.findMany(
          {orderBy: {
            createdAt: "asc",
          }}
        );
      },
    },
    phones: {
      type: new GraphQLList(PhoneType),
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.phone.findMany();
      },
    },
    socialNets: {
      type: new GraphQLList(SocialNetType),
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.socialNet.findMany();
      },
    },
    deliveryPrice: {
      type: DeliveryPriceType,
      resolve(_parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.deliveryPrice.findFirst();
      },
    },
    allBouquets: {
      type: GraphQLInt,
      args: {
        price: { type: GraphQLInt },
        personType: { type: PersonType },
        code: { type: GraphQLInt },
      },
      resolve(_parent, { price, personType, code }, ctx: ApolloServerContext) {
        return ctx.prisma.bouquet.count({
          where: {
            price: { lte: price },
            personType,
            code,
          },
        });
      },
    },
    allBalloons: {
      type: GraphQLInt,
      args: {
        price: { type: GraphQLInt },
        categoryId: { type: GraphQLID },
        colorId: { type: GraphQLID },
        code: { type: GraphQLInt },
      },
      resolve(
        _parent,
        { price, code, categoryId, colorId },
        ctx: ApolloServerContext
      ) {
        return ctx.prisma.balloon.count({
          where: {
            price: { lte: price },
            code,
            categoryId: categoryId && +categoryId,
            colorId: colorId && +colorId,
          },
        });
      },
    },
    maxBouquetPrice: {
      type: GraphQLInt,
      async resolve(_parent, _argx, ctx: ApolloServerContext) {
        return ctx.prisma.bouquet
          .aggregate({
            _max: {
              price: true,
            },
          })
          .then((res) => res._max.price);
      },
    },
    maxBalloonPrice: {
      type: GraphQLInt,
      async resolve(_parent, _argx, ctx: ApolloServerContext) {
        return ctx.prisma.balloon
          .aggregate({
            _max: {
              price: true,
            },
          })
          .then((res) => res._max.price);
      },
    },
  },
});
