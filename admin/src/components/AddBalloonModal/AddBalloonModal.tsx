import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import s from "./AddBalloonModal.module.css";
import cs from "classnames";
import { ChangeEvent, useState } from "react";
import { AddBalloonMutationVariables } from "../../store/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddBalloonModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddBalloonMutationVariables) => void;
  categories: Array<
    Maybe<{
      id: string;
      name: string;
    }>
  >;
  colors: Array<
    Maybe<{
      id: string;
      name: string;
      cssName: string;
    }>
  >;
}

const AddBalloonModal: React.FC<AddBalloonModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
  categories,
  colors,
}) => {
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [code, setCode] = useState<number | undefined>(undefined);
  const [desc, setDesc] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [col, setCol] = useState<string>("");
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
    if (!name1) return showError("Введіть перше ім'я");
    if (!name2) return showError("Введіть друге ім'я");
    if (!price) return showError("Введіть ціну");
    if (!desc) return showError("Введіть опис");
    if (!code) return showError("Введіть артикул");
    if (!cat) return showError("Виберіть категорію");
    if (!col) return showError("Виберіть колір");
    if (!photo) return showError("Загрузіть фото");
    const args: AddBalloonMutationVariables = {
      name: name1!,
      subname: name2!,
      price: price!,
      description: desc!,
      code: code!,
      categoryId: cat!,
      colorId: col!,
      image: photo!,
    };
    addMutation(args);
    setShow(false);
    showSuccess('Кулька успішно додана');
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
        Додати кульку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-5">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName1">
            <Form.Label column sm="2">
            Перше ім'я:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Перше ім'я"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName2">
            <Form.Label column sm="2">
            Друге ім'я:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Друге ім'я"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Ціна:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Введіть ціну"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value ? +e.target.value : undefined)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextDesc">
            <Form.Label column sm="2">
              Опис:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                placeholder="Введіть опис"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextCode">
            <Form.Label column sm="2">
              Артикул:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Введіть артикул"
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
            controlId="formPlaintextCat"
          >
            <Form.Control
              as="select"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option>Виберіть категорію...</option>
              {categories &&
                categories.map((obj) => (
                  <option value={obj?.id!}>{obj?.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            as={Row}
            className={cs([s.select], "mb-3")}
            controlId="formPlaintextCol"
          >
            <Form.Control
              as="select"
              value={col}
              onChange={(e) => setCol(e.target.value)}
            >
              <option>Виберіть колір...</option>
              {colors &&
                colors.map((obj) => (
                  <option value={obj?.id!}>{obj?.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Загрузіть фото:</Form.Label>
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
              Відмінити
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={handleAddProduct}
            >
              Додати
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddBalloonModal;
