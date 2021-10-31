import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import s from "./CardComponent.module.css";
import cs from "classnames";
import Counter from "../Counter/Counter";
import Link from "next/link";
import { googleUrl } from "../../config";
import { useState } from "react";
import { addToBasket } from "../../utils/addToBasket";
import { BasketStatusType } from "../../types/BasketTypes";
import { deleteFromBasket } from "../../utils/deleteFromBasket";

interface CardComponentProps {
  photo: string;
  name: string;
  subName: string;
  price: number;
  code: number;
  id: string;
  measure: string;
  link: string;
  description: string;
  basketStatus: BasketStatusType;
}

const CardComponent: React.FC<CardComponentProps> = ({
  photo,
  name,
  subName,
  price,
  code,
  id,
  measure,
  link,
  description,
  basketStatus,
}) => {
  const MIN_VALUE = 1;
  const [count, setCount] = useState<number>(MIN_VALUE);

  const fetchCurrentCount = (count: number) => {
    setCount(count);
  };

  const handleDeleteItem = (id: string) => {
    deleteFromBasket && deleteFromBasket(id);
  };

  const handleAddToBasket = () => {
    addToBasket({
      name: `${name} ${subName}`,
      price,
      quantity: count,
      code,
      description,
      image: `${googleUrl}${photo}`,
      id
    });
  };

  return (
    <Col className={s.card} xs={12} lg={4} md={6} sm={6}> 
      <Card
        style={{ width: "18rem", borderRadius: "15px" }}
        className="border border-1"
      >
        <Card.Img
          variant="top"
          src={`${googleUrl}${photo}`}
          className={s.img}
        />
        <Card.Body className="d-flex flex-column align-items-center pb-2">
          <Card.Title className={s.title}>{name}</Card.Title>
          <Card.Title className={s.subTitle}>{subName}</Card.Title>
          <Card.Title className={s.price}>
            {price} {measure}
          </Card.Title>
          <Counter
            minValue={MIN_VALUE}
            clb={fetchCurrentCount}
            start={
              basketStatus!.isInBasket ? basketStatus!.basketQuantity : undefined
            }
          />
          {basketStatus!.isInBasket ? (
            <Button
              variant="success"
              className={cs([s.button], "w-50", "btn-sm", "m-1")}
              onClick={()=>handleDeleteItem(id)}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              className={cs([s.button], "w-50", "btn-sm", "m-1")}
              onClick={handleAddToBasket}
            >
            Add To Cart
            </Button>
          )}
          <Link href={`${link}/${id}`}>
            <a className={s.link}>
              <Button
                variant="outline-primary"
                className={cs([s.button], "w-50", "btn-sm", "m-1")}
              >
                Details...
              </Button>
            </a>
          </Link>
          <Card.Text className={s.code}>Code: {code}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComponent;
