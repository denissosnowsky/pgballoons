import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ApolloServerContext } from "../../types/ApolloServerContext";
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
import { GraphQLUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";
import GraphQLJSON from "graphql-type-json";
import { sendTelegramMessage } from "../../../services/sendTelegramMessage";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBouquet: {
      type: BouquetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        subname: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLInt) },
        image: { type: new GraphQLNonNull(GraphQLUpload) },
        personType: { type: new GraphQLNonNull(PersonType) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        const { filename, createReadStream } = await args.image;
        const imageName = uuidv4() + filename;

        await new Promise((res) =>
          createReadStream()
            .pipe(
              ctx.googleBucket.file(imageName).createWriteStream({
                resumable: false,
                gzip: true,
              })
            )
            .on("finish", res)
        );

        const bouquet = await ctx.prisma.bouquet.create({
          data: {
            name: args.name,
            subname: args.subname,
            price: args.price,
            description: args.description,
            code: args.code,
            image: imageName,
            personType: args.personType,
          },
        });
        return bouquet;
      },
    },
    changeBouquet: {
      type: BouquetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        subname: { type: GraphQLString },
        price: { type: GraphQLInt },
        description: { type: GraphQLString },
        code: { type: GraphQLInt },
        image: { type: GraphQLUpload },
        personType: { type: PersonType },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        let imageName: string | undefined;

        if (args.image) {
          const { filename, createReadStream } = await args.image;
          imageName = uuidv4() + filename;

          await new Promise((res) =>
            createReadStream()
              .pipe(
                ctx.googleBucket.file(imageName as string).createWriteStream({
                  resumable: false,
                  gzip: true,
                })
              )
              .on("finish", res)
          );

          const oldImage = await ctx.prisma.bouquet
            .findUnique({
              where: {
                id: args.id,
              },
            })
            .then((b) => b?.image);

          oldImage &&
            ctx.googleBucket.file(oldImage) &&
            (await ctx.googleBucket.file(oldImage).delete());
        } else {
          imageName = undefined;
        }

        const bouquet = await ctx.prisma.bouquet.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            subname: args.subname,
            price: args.price,
            description: args.description,
            code: args.code,
            image: imageName,
            personType: args.personType,
          },
        });
        return bouquet;
      },
    },
    deleteBouquet: {
      type: BouquetType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const imageName = await ctx.prisma.bouquet
          .findUnique({
            where: {
              id: id,
            },
          })
          .then((b) => b?.image);

        imageName &&
          ctx.googleBucket.file(imageName) &&
          (await ctx.googleBucket.file(imageName).delete());

        const bouquet = await ctx.prisma.bouquet.delete({ where: { id: id } });
        return bouquet;
      },
    },
    addBalloon: {
      type: BalloonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        subname: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLInt) },
        image: { type: new GraphQLNonNull(GraphQLUpload) },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
        colorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        const { filename, createReadStream } = await args.image;
        const imageName = uuidv4() + filename;

        await new Promise((res) =>
          createReadStream()
            .pipe(
              ctx.googleBucket.file(imageName).createWriteStream({
                resumable: false,
                gzip: true,
              })
            )
            .on("finish", res)
        );

        const balloon = await ctx.prisma.balloon.create({
          data: {
            name: args.name,
            subname: args.subname,
            price: args.price,
            description: args.description,
            code: args.code,
            image: imageName,
            categoryId: +args.categoryId,
            colorId: +args.colorId,
          },
        });
        return balloon;
      },
    },
    changeBalloon: {
      type: BalloonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        subname: { type: GraphQLString },
        price: { type: GraphQLInt },
        description: { type: GraphQLString },
        code: { type: GraphQLInt },
        image: { type: GraphQLUpload },
        categoryId: { type: GraphQLID },
        colorId: { type: GraphQLID },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        let imageName: string | undefined;
        if (args.image) {
          const { filename, createReadStream } = await args.image;
          imageName = uuidv4() + filename;

          await new Promise((res) =>
            createReadStream()
              .pipe(
                ctx.googleBucket.file(imageName as string).createWriteStream({
                  resumable: false,
                  gzip: true,
                })
              )
              .on("finish", res)
          );

          const oldImage = await ctx.prisma.balloon
            .findUnique({
              where: {
                id: args.id,
              },
            })
            .then((b) => b?.image);

          oldImage &&
            ctx.googleBucket.file(oldImage) &&
            (await ctx.googleBucket.file(oldImage).delete());
        } else {
          imageName = undefined;
        }
        const balloon = await ctx.prisma.balloon.update({
          where: { id: args.id },
          data: {
            name: args.name,
            subname: args.subname,
            price: args.price,
            description: args.description,
            code: args.code,
            image: imageName,
            categoryId: args.categoryId && +args.categoryId, //graphql can't skip NaN, but can skip undefined for Id
            colorId: args.colorId && +args.colorId,
          },
        });
        return balloon;
      },
    },
    deleteBalloon: {
      type: BalloonType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const imageName = await ctx.prisma.balloon
          .findUnique({
            where: {
              id: id,
            },
          })
          .then((b) => b?.image);

        imageName &&
          ctx.googleBucket.file(imageName) &&
          (await ctx.googleBucket.file(imageName).delete());

        const balloon = await ctx.prisma.balloon.delete({ where: { id: id } });
        return balloon;
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { name }, ctx: ApolloServerContext) {
        const category = await ctx.prisma.category.create({
          data: {
            name,
          },
        });
        return category;
      },
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const category = await ctx.prisma.category.delete({
          where: { id: +id },
        });
        return category;
      },
    },
    addColor: {
      type: ColorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        cssName: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { name, cssName }, ctx: ApolloServerContext) {
        const color = await ctx.prisma.color.create({
          data: {
            name,
            cssName,
          },
        });
        return color;
      },
    },
    deleteColor: {
      type: ColorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const color = await ctx.prisma.color.delete({ where: { id: +id } });
        return color;
      },
    },
    addAssortment: {
      type: AssortmentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        fixed: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(_parent, { name, price, fixed }, ctx: ApolloServerContext) {
        const assortment = await ctx.prisma.assortment.create({
          data: {
            name,
            price,
            fixed,
          },
        });
        return assortment;
      },
    },
    deleteAssortmant: {
      type: AssortmentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const assortment = await ctx.prisma.assortment.delete({
          where: {
            id: +id,
          },
        });
        return assortment;
      },
    },
    changeAssortmant: {
      type: AssortmentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        fixed: { type: GraphQLBoolean },
      },
      async resolve(
        _parent,
        { id, name, price, fixed },
        ctx: ApolloServerContext
      ) {
        const assortment = await ctx.prisma.assortment.update({
          where: { id: +id },
          data: {
            name,
            price,
            fixed,
          },
        });
        return assortment;
      },
    },
    addDeliveryPrice: {
      type: DeliveryPriceType,
      args: {
        price: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { price }, ctx: ApolloServerContext) {
        return await ctx.prisma.deliveryPrice.create({
          data: {
            price,
          },
        });
      },
    },
    changeDeliveryPrice: {
      type: DeliveryPriceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        price: { type: GraphQLString },
      },
      async resolve(_parent, { id, price }, ctx: ApolloServerContext) {
        const deliveryPrice = await ctx.prisma.deliveryPrice.update({
          where: {
            id: +id,
          },
          data: {
            price,
          },
        });
        return deliveryPrice;
      },
    },
    addPhone: {
      type: PhoneType,
      args: {
        number: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { number }, ctx: ApolloServerContext) {
        const phone = await ctx.prisma.phone.create({
          data: {
            number,
          },
        });
        return phone;
      },
    },
    deletePhone: {
      type: PhoneType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const phone = await ctx.prisma.phone.delete({
          where: {
            id: +id,
          },
        });
        return phone;
      },
    },
    addSocialNet: {
      type: SocialNetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { name, link, image }, ctx: ApolloServerContext) {
        const socialNet = await ctx.prisma.socialNet.create({
          data: {
            name,
            link,
            image,
          },
        });
        return socialNet;
      },
    },
    deleteSocialNet: {
      type: SocialNetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const socialNet = await ctx.prisma.socialNet.delete({
          where: {
            id: +id,
          },
        });
        return socialNet;
      },
    },
    changeManyPricesToBalloons: {
      type: GraphQLBoolean,
      args: {
        oldPrice: { type: new GraphQLNonNull(GraphQLInt) },
        newPrice: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_parent, { oldPrice, newPrice }, ctx: ApolloServerContext) {
        try {
          const balloons = await ctx.prisma.balloon.updateMany({
            where: {
              price: oldPrice,
            },
            data: {
              price: newPrice,
            },
          });
          return true;
        } catch {
          return false;
        }
      },
    },
    changeManyPricesToBouquets: {
      type: GraphQLBoolean,
      args: {
        oldPrice: { type: new GraphQLNonNull(GraphQLInt) },
        newPrice: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_parent, { oldPrice, newPrice }, ctx: ApolloServerContext) {
        try {
          const bouquets = await ctx.prisma.bouquet.updateMany({
            where: {
              price: oldPrice,
            },
            data: {
              price: newPrice,
            },
          });
          return true;
        } catch {
          return false;
        }
      },
    },
    sendOrder: {
      type: GraphQLBoolean,
      args: {
        order: { type: new GraphQLNonNull(GraphQLJSON) },
      },
      async resolve(_parent, { order }, _ctx) {
        return await sendTelegramMessage(JSON.parse(order));
      },
    },
  },
});
