import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./ChangeManyPricesModal.module.css";
import { useState } from "react";
import { ChangePriceFromOldToNew } from "../../types/types";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface ChangeManyPricesModalPropsType {
    isShow: boolean;
    setShow: (value: boolean) => void;
    addMutation: (args: ChangePriceFromOldToNew) => void;
}

const ChangeManyPricesModal: React.FC<ChangeManyPricesModalPropsType> = ({isShow, setShow, addMutation}) => {
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleChangePrices = () => {
    if (!oldPrice) return showError("Enter old price");
    if (!newPrice) return showError("Enter new price");

    const args: ChangePriceFromOldToNew = {
        oldPrice: oldPrice!,
        newPrice: newPrice!
    };
    console.log(args);
    addMutation(args);
    setShow(false);
    showSuccess('Prices successfully changed');
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
        Change prices
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            Old price:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter old price"
                value={oldPrice}
                onChange={(e) =>
                  setOldPrice(e.target.value ? +e.target.value : undefined)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
            New price:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter new price"
                value={newPrice}
                onChange={(e) =>
                  setNewPrice(e.target.value ? +e.target.value : undefined)
                }
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
              Cancel
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={handleChangePrices}
            >
              Change
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeManyPricesModal;
