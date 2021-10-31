import ListGroup from "react-bootstrap/ListGroup";
import { ArrayConvertorResultType } from "../../types/arrayConvertorTypes";
import s from "./List.module.css";

interface ListProps {
  data: ArrayConvertorResultType;
  measure: string;
}

const List: React.FC<ListProps> = ({ data, measure }) => {
  return (
    <ListGroup variant="flush" className={s.ul}>
      {data && (data.length > 0 &&
        data.map((i) => (
          <ListGroup.Item className={s.li} key={i.id}>
            <span>{i.leftText}</span>
            <span>
              {i.rightText} {measure}
            </span>
          </ListGroup.Item>
        )))}
    </ListGroup>
  );
};

export default List;
