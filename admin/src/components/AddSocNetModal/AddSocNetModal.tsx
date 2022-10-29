import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddSocNetModal.module.css";
import { useState } from "react";
import { AddSocialNetMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddSocNetModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddSocialNetMutationVariables) => void;
}

const AddSocNetModal: React.FC<AddSocNetModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [link, setLink] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!name) return showError("Введіть ім'я соц. мережі");
    if (!link) return showError("Введіть посилання");
    if (!image) return showError("Введіть ім'я картинки");

    const args: AddSocialNetMutationVariables = {
      name: name!,
      image: image!,
      link: link!,
    };
    addMutation(args);
    setShow(false);
    showSuccess('Соц. мережа успішно додана');
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
        Додати соц. мережу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            Ім'я соц. мережі:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Ім'я соц. мережі"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            Посилання соц. мережі:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Посилання соц. мережі"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            Ім'я картинки (/name.png):
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Ім'я картинки"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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

export default AddSocNetModal;
