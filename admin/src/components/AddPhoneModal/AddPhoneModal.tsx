import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddPhoneModal.module.css";
import { useState } from "react";
import { AddPhoneMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddPhoneModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddPhoneMutationVariables) => void;
}

const AddPhoneModal: React.FC<AddPhoneModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!phone) return showError("Введіть телефон");

    const args: AddPhoneMutationVariables = {
      number: phone!,
    };
    addMutation(args);
    setShow(false);
    showSuccess('Телефон упсішно доданий');
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
        Додати телефон
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            Номер телефону (xxxxxxxxxx):
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Номер телефону"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

export default AddPhoneModal;
