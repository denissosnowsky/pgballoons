import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "./ListWithCounterAndPhoto.module.css";
import Counter from "../Counter/Counter";
import { useState, useMemo } from "react";
import cs from "classnames";
import { useCounterInitState } from "../../hooks/useCounterInitState";
import { sumOfObjectValues } from "../../utils/sumOfObjectValues";
import { counterStateChanger } from "../../utils/counterStateChanger";
import { BasketObjType } from "../../types/BasketTypes";
import { deleteFromBasket } from "../../utils/deleteFromBasket";
import { changeQuantInBasket } from "../../utils/changeQuantInBasket";

interface ListWithCounterAndPhotoProps {
  data: Array<BasketObjType>;
  measure: string;
}

const ListWithCounterAndPhoto: React.FC<ListWithCounterAndPhotoProps> = ({
  data,
  measure,
}) => {
  // make an object for initial value for useState. Made from id of the fetched data. Save here - 'id: price'
  const initialState = useCounterInitState(data);

  const [counters, setCounters] =
    useState<Record<string, number>>(initialState);
  const [sum, setSum] = useState<number>(0);

  useMemo(() => setSum(sumOfObjectValues(counters)), [counters]);

  const handleCounterPrice = (id: string, initValue: number) => {
    return (value: number) => {
      setCounters(counterStateChanger(counters, id, value, initValue));
      changeQuantInBasket && changeQuantInBasket(id, value);
    };
  };

  const handleDeleteItem = (id: string, initValue: number) => {
    setCounters(counterStateChanger(counters, id, 0, initValue));
    deleteFromBasket && deleteFromBasket(id);
  };
  return (
    <ListGroup variant="flush" className={s.group}>
      {data.map((i) => (
        <ListGroup.Item className={s.li} key={i.id}>
          <Row className={s.upRow}>
            <Col xs={3} md={2}>
              <div className={s.imageWrapper}>
                <img src={i.image} className={s.image} />
              </div>
            </Col>
            <Col xs={4} md={4} className={s.title}>
              {i.leftText}
            </Col>
            <Col xs={2} md={3}>
              <Counter
                clb={handleCounterPrice(i.id, Number(i.rightText))}
                minValue={1}
                start={i.quantity}
              />
            </Col>
            <Col xs={2} md={2} className={s.lastCol}>
              {counters[i.id]} {measure}
            </Col>
            <Col xs={1} md={1}>
              <i
                className={cs([s.bin], "bi", "bi-trash-fill")}
                onClick={() => handleDeleteItem(i.id, Number(i.rightText))}
              ></i>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Col>Composition: {i.description}</Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ListGroup.Item className={s.li}>
        <Row className={s.sumRow}>
          <Col xs={6}>TOTAL: </Col>
          <Col xs={6} className={s.lastCol}>
            {sum} {measure}
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ListWithCounterAndPhoto;
