import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "./AddAssortmentModal.module.css";
import cs from "classnames";
import { ChangeEvent, useState } from "react";
import Loading from "../Loading/Loading";
import { AddAssortmentMutationVariables } from "../../store/generated/graphql";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddAssortmentModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddAssortmentMutationVariables) => void;
}

const AddAssortmentModal: React.FC<AddAssortmentModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [fixed, setFixed] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!name) return showError("Введіть категорію");
    if (!price) return showError("Введіть ціну категорії");
    if (!fixed) return showError("Виберіть чи ціна фіксована");

    const args: AddAssortmentMutationVariables = {
      name: name!,
      price: price!,
      fixed: fixed==='true' ? true : false,
    };
    console.log(args);
    addMutation(args);
    setShow(false);
    showSuccess('Категорія успішно додана');
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShow}
        onHide={() => {}}
        aria-labelledby="example-modal-sizes-title-lg"
        className={s.wrapper}
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
          Додати асортимент
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPrice"
            >
              <Form.Label column sm="2">
              Ім'я категорії:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Ім'я категорії"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPrice"
            >
              <Form.Label column sm="2">
              Введіть ціну:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Введіть ціну"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className={cs([s.select], "m-3")}
              controlId="formPlaintextFixed"
            >
              <Form.Control
                as="select"
                value={fixed}
                onChange={(e) => setFixed(e.target.value)}
              >
                <option>Виберіть чи фіксована ціна ...</option>
                <option value={"true"}>Фіксована</option>
                <option value={"false"}>Не фіксована</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                variant="danger"
                className="my-2 w-75"
                onClick={handleCancel}
              >
                Відмінити
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button
                variant="success"
                className="my-2 w-75"
                onClick={handleAdd}
              >
                Зберегти
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAssortmentModal;
