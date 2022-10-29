import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import {
  ChangeAssortmantMutationVariables,
  DeleteAssortmantMutationVariables,
} from "../../store/generated/graphql";
import { showSuccess } from "../../utils/showSucces";
import s from "./AssortmentList.module.css";

interface AssortmentListPropsType {
  data: {
    id: string;
    name: string;
    price: string;
    fixed: boolean;
  };
  deleteMutation: (args: DeleteAssortmantMutationVariables) => void;
  changeMutation: (args: ChangeAssortmantMutationVariables) => void;
}

const AssortmentList: React.FC<AssortmentListPropsType> = ({
  data,
  deleteMutation,
  changeMutation,
}) => {
  const [change, setChange] = useState(false);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [fixed, setFixed] = useState<string | undefined>(data.fixed ? 'true' : 'false');

  const handleChange = () => {
    const args: ChangeAssortmantMutationVariables = {
      id: data.id,
      name: name!,
      price: price!,
      fixed: fixed==='true' ? true : false
    }
    changeMutation(args);
    setChange(false);
    showSuccess('Асортимент успішно доданий');
  };

  return (
    <>
      {!change ? (
        <ListGroup.Item className={s.li}>
          <div>
            <div className={s.listWrapper}>
              <span>{data.name}</span>
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    setChange(true);
                  }}
                  className="me-2"
                >
                  Змінити
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteMutation({ id: data.id })}
                >
                  Видалити
                </Button>
              </div>
            </div>
            <div>
              <span>
                Ціна: {data.price} {"грн."}
              </span>
            </div>
            <div>
              <span>Фіксована: {data.fixed ? "так" : "ні"}</span>
            </div>
          </div>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item className={s.li2}>
          <div>
            <div className={s.listWrapper2}>
              <span>
              Ім'я:{" "}
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </span>
              <div>
                <Button
                  variant="primary"
                  onClick={handleChange}
                  className="me-2"
                >
                  Зберегти
                </Button>
                <Button variant="danger" onClick={() => setChange(false)}>
                Відмінити
                </Button>
              </div>
            </div>
            <div className='mb-2'>
              <span>
                Ціна:{" "}
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />{" "}
                {"грн."}
              </span>
            </div>
            <div>
              <span>
                Фіксована:{" "}
                <select value={fixed} onChange={(e) => setFixed(e.target.value)}>
                  <option>Виберіть чи фіксована ціна...</option>
                  <option value={"true"}>Фіксована</option>
                  <option value={"false"}>Не фіксована</option>
                </select>
              </span>
            </div>
          </div>
        </ListGroup.Item>
      )}
    </>
  );
};

export default AssortmentList;
