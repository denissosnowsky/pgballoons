import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./ChangeDeliveryModal.module.css";
import { useState } from "react";
import { ChangeDeliveryPriceMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface ChangeDeliveryModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: ChangeDeliveryPriceMutationVariables) => void;
  id: string
}

const ChangeDeliveryModal: React.FC<ChangeDeliveryModalPropsType> = ({
  isShow,
  setShow,
  id,
  addMutation,
}) => {
  const [price, setPrice] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!price) return showError("Введіть ціну");

    const args: ChangeDeliveryPriceMutationVariables = {
      price: price!,
      id: id!
    };
    addMutation(args);
    setShow(false);
    showSuccess('Ціна успішно додана');
  };

  return (
    <Modal
      size="lg"
      show={isShow}
      onHide={() => {}}
      aria-labelledby="example-modal-sizes-title-lg"
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
        Змінити ціну доставки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Нова ціна:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Нова ціна"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
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
            <Button variant="success" className="my-2 w-75" onClick={handleAdd}>
              Зберегти
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeDeliveryModal;
