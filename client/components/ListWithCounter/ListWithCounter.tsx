import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "./ListWithCounter.module.css";
import Counter from "../Counter/Counter";
import { useState, useEffect } from "react";
import { priceInputValidator } from "../../utils/priceInputValidator";
import Input from "../Input/Input";
import { useCounterInitState } from "../../hooks/useCounterInitState";
import { counterStateChanger } from "../../utils/counterStateChanger";
import { inputStateChanger } from "../../utils/inputStateChanger";
import { sumOfObjectValues } from "../../utils/sumOfObjectValues";
import { ArrayConvertorResultType } from "../../types/arrayConvertorTypes";

interface ListWithCounterProps {
  data: ArrayConvertorResultType;
  measure: string;
}

const ListWithCounter: React.FC<ListWithCounterProps> = ({ data, measure }) => {
  // make an object for initial valeu for useState. Made from id of the fetched data

  const initialState = useCounterInitState(data);

  const [counters, setCounters] =
    useState<Record<string, number>>(initialState);
  const [sum, setSum] = useState<number>(0);

  useEffect(()=>{
    setSum(sumOfObjectValues(counters));
  }, [counters]);

  const handleCounterPrice = (property: string, initValue: number) => {
    return (value: number) => {
      setCounters(counterStateChanger(counters, property, value, initValue));
    };
  };

  const handleInputPrice = (property: string) => {
    return (value: number | string) => {
      setCounters(inputStateChanger(counters, property, value));
    };
  };

  return (
    <ListGroup variant="flush" style={{ padding: "10px" }}>
      {data && (data.length > 0 &&
        data.map((i) => (
          <ListGroup.Item
            className={s.li}
            key={i.id}
            style={{ padding: "0px" }}
          >
            <Row>
              <Col xs={6} md={6}>{i.leftText}</Col>
              <Col xs={3} md={4}>
                {i.fixed ? (
                  <Counter
                    clb={handleCounterPrice(i.id, Number(i.rightText))}
                    minValue={0}
                  />
                ) : (
                  <Input
                    type="number"
                    className={s.input}
                    placeholder={"Enter the price"}
                    value={priceInputValidator(+counters[i.id!])}
                    onChange={handleInputPrice(i.id!)}
                  />
                )}
              </Col>
              <Col xs={3} md={2} className={s.lastCol}>
                {counters[i.id!]} {measure}
              </Col>
            </Row>
          </ListGroup.Item>
        )))}
      <ListGroup.Item className={s.li}>
        <Row className={s.sumRow}>
          <Col xs={6}>ВСЬОГО: </Col>
          <Col xs={6} className={s.lastCol}>
            {sum} {measure}
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ListWithCounter;
