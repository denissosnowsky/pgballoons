-- AlterTable
CREATE SEQUENCE "deliveryprice_id_seq";
ALTER TABLE "DeliveryPrice" ALTER COLUMN "id" SET DEFAULT nextval('deliveryprice_id_seq');
ALTER SEQUENCE "deliveryprice_id_seq" OWNED BY "DeliveryPrice"."id";
