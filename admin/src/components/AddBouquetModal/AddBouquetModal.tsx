import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import s from "./AddBouquetModal.module.css";
import cs from "classnames";
import { ChangeEvent, useState } from "react";
import { AddBouquetMutationVariables, Person } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddBalloonModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddBouquetMutationVariables) => void;
}

const AddBouquetModal: React.FC<AddBalloonModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [code, setCode] = useState<number | undefined>(undefined);
  const [desc, setDesc] = useState<string>("");
  const [personType, setPersonType] = useState<undefined | Person>(undefined);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [preload, setPreload] = useState<string | ArrayBuffer | null>(null);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      setPhoto(event?.currentTarget?.files[0]);

      var oFReader = new FileReader();
      oFReader.readAsDataURL(event?.currentTarget?.files[0]);
      oFReader.onload = function (oFREvent) {
        setPreload(oFREvent?.target?.result!);
      };
    }
  };
  
  const handleCancel = () => {
    setShow(false);
  };

  const handleAddProduct = () => {
    if (!name1) return showError("Enter Name 1");
    if (!name2) return showError("Enter Name 2");
    if (!price) return showError("Enter Price");
    if (!desc) return showError("Enter Composition");
    if (!code) return showError("Enter Code");
    if (!personType) return showError("Choose the type of person");
    if (!photo) return showError("Upload Photo");
    const args: AddBouquetMutationVariables = {
      name: name1!,
      subname: name2!,
      price: price!,
      description: desc!,
      code: code!,
      personType: personType!,
      image: photo!,
    };
    addMutation(args);
    setShow(false);
    showSuccess('Bouquet successfully added');
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
        Add Bouquet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-5">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName1">
            <Form.Label column sm="2">
              Name 1:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Name 1"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName2">
            <Form.Label column sm="2">
            Name 2:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Name 2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Price:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value ? +e.target.value : undefined)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextDesc">
            <Form.Label column sm="2">
              Composition:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                placeholder="Enter Composition"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextCode">
            <Form.Label column sm="2">
              Code:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter Code"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value ? +e.target.value : undefined)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className={cs([s.select], "mb-3")}
            controlId="formPlaintextCol"
          >
            <Form.Control
              as="select"
              value={personType}
              onChange={(e) => setPersonType(e.target.value as Person)}
            >
              <option>Choose the type of person...</option>
                  <option value={'MAN'}>Men</option>
                  <option value={'WOMAN'}>Women</option>
                  <option value={'CHILD'}>Children</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload photo:</Form.Label>
            <Form.Control type="file" className="mx-3" onChange={handlePhoto} />
          </Form.Group>
          {preload ? (
            <div className="d-flex flex-column align-items-center w-100 mb-3">
              <div className={s.preload}>
                <img src={preload as string}></img>
              </div>
            </div>
          ) : null}
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
              onClick={handleAddProduct}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddBouquetModal;
