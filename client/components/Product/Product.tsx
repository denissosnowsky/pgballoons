import s from "./Product.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Counter from "../../components/Counter/Counter";
import Button from "react-bootstrap/Button";
import cs from "classnames";
import { googleUrl } from "../../config";
import { BasketStatusType } from "../../types/BasketTypes";
import { deleteFromBasket } from "../../utils/deleteFromBasket";
import { addToBasket } from "../../utils/addToBasket";
import { useState } from "react";

interface ProductProps {
  title: string;
  subTitle: string;
  desc: string;
  code: number;
  img: string;
  price: number;
  measure: string;
  basketStatus: BasketStatusType;
  id: string;
}

const Product: React.FC<ProductProps> = ({
  title,
  subTitle,
  desc,
  code,
  img,
  price,
  measure,
  basketStatus,
  id
}) => {
  const [count, setCount] = useState<number>(1);

  const handleDeleteItem = (id: string) => {
    deleteFromBasket && deleteFromBasket(id);
  };

  const handleAddToBasket = () => {
    addToBasket({
      name: `${title} ${subTitle}`,
      price,
      quantity: count,
      code,
      description: desc,
      image: `${googleUrl}${img}`,
      id
    });
  };

  const fetchCurrentCount = (count: number) => {
    setCount(count);
  };

  return (
    <Row>
      <Col className={cs([s.imageCol], "d-flex", "justify-content-center")} lg={6} md={6} sm={6}>
        <div className={s.imgWrapper}>
          <img src={`${googleUrl}${img}`} className={s.image} />
        </div>
      </Col>
      <Col className="d-flex flex-column" lg={6} md={6} sm={6}>
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <div className={s.price}>
          {price} {measure}
        </div>
        <div className={s.desc}>
          <span>Composition</span>: {desc}
        </div>
        <div>
          <Counter
            minValue={1}
            start={
              basketStatus && (basketStatus.isInBasket ? basketStatus.basketQuantity : undefined)
            }
            clb={fetchCurrentCount}
          />
        </div>
        <div className={s.btnWrapper}>
          {(basketStatus && basketStatus.isInBasket) ? (
            <Button
              variant="success"
              className={cs([s.button], "m-1")}
              onClick={() => handleDeleteItem(id)}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="danger"
              className={cs([s.button], "m-1")}
              onClick={handleAddToBasket}
            >
              Add To Cart
            </Button>
          )}
        </div>
        <div className={s.code}>Code: {code}</div>
      </Col>
    </Row>
  );
};

export default Product;
