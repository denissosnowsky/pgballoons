import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "./CardBouquet.module.css";
import cs from "classnames";
import { googleUrl } from "../../config";
import { ChangeEvent, useState } from "react";
import Loading from "../Loading/Loading";
import { ChangeBouquetMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface CardBouquetPropsType {
  photo: string;
  name: string;
  subName: string;
  price: number;
  code: number;
  id: string;
  measure: string;
  description: string;
  deleteCard: () => void;
  addMutation: (args: ChangeBouquetMutationVariables) => void;
}

const CardBouquet: React.FC<CardBouquetPropsType> = ({
  photo,
  name,
  subName,
  price,
  code,
  id,
  measure,
  description,
  deleteCard,
  addMutation,
}) => {
  const [change, setChange] = useState<boolean>(false);
  const [name1, setName1] = useState<string>(name);
  const [name2, setName2] = useState<string>(subName);
  const [newPrice, setNewPrice] = useState<number | undefined>(price);
  const [newCode, setNewCode] = useState<number | undefined>(code);
  const [desc, setDesc] = useState<string>(description);
  const [loadedPhoto, setLoadedPhoto] = useState<File | undefined>(undefined);
  const [preload, setPreload] = useState<string | ArrayBuffer | null>(null);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      setLoadedPhoto(event?.currentTarget?.files[0]);

      var oFReader = new FileReader();
      oFReader.readAsDataURL(event?.currentTarget?.files[0]);
      oFReader.onload = function (oFREvent) {
        setPreload(oFREvent?.target?.result!);
      };
    }
  };

  const handleCancel = () => {
    setChange(false);
    setPreload("");
  };

  const handleSave = () => {
    if (!name1) return showError("Enter Name 1");
    if (!name2) return showError("Enter Name 2");
    if (!newPrice) return showError("Enter Price");
    if (!desc) return showError("Enter Composition");
    if (!newCode) return showError("Enter Code");
    const args: ChangeBouquetMutationVariables = {
      id,
      name: name1!,
      subname: name2!,
      price: newPrice!,
      description: desc!,
      code: newCode!,
      image: loadedPhoto!,
    };
    addMutation(args);
    setChange(false);
    setPreload("");
    showSuccess('Bouquet successfully changed');
  };

  return (
    <>
      <Col className={s.card} xs={3}>
        <Card
          style={{ width: "18rem", borderRadius: "15px" }}
          className="border border-1 position-relative"
        >
          <div>
            <Card.Img
              variant="top"
              src={`${googleUrl}${photo}`}
              className={s.img}
            />
            <Card.Body className="d-flex flex-column align-items-center pb-2">
              <Card.Title className={s.title}>
                <span>Name 1: </span>
                {name}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Name 2: </span>
                {subName}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Price: </span>
                {price} {measure}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Composition: </span>
                {description}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Code: </span>
                {code}
              </Card.Title>
              <div className={s.btns}>
                <Button
                  variant="danger"
                  className={cs([s.button], "w-50", "btn-sm", "m-1")}
                  onClick={deleteCard}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  className={cs([s.button], "w-50", "btn-sm", "m-1")}
                  onClick={() => setChange(!change)}
                >
                  Change
                </Button>
              </div>
            </Card.Body>
          </div>
          {change ? (
            <div className={s.changeManu}>
              <div className={s.img}>
                <div className={s.imgHeader}>
                  <input
                    type={"file"}
                    onChange={handlePhoto}
                    name="img"
                    id="img"
                  />
                  <label htmlFor="img" className={s.imgLabel}></label>
                  <Button variant="outline-primary">Change photo</Button>
                </div>
                <div className={s.imgBody}>
                  {preload && <img src={preload as string}></img>}
                </div>
              </div>
              <Card.Body className="d-flex flex-column align-items-center pb-2">
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Name 1: </span>
                  <input
                    type={"text"}
                    className="w-50"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Name 2: </span>
                  <input
                    type={"text"}
                    className="w-50"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Price: </span>
                  <input
                    type={"number"}
                    className="w-50"
                    value={newPrice}
                    onChange={(e) =>
                      setNewPrice(e.target.value ? +e.target.value : undefined)
                    }
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Composition: </span>
                  <textarea
                    className="w-50"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Code: </span>
                  <input
                    type={"number"}
                    className="w-50"
                    value={newCode}
                    onChange={(e) =>
                      setNewCode(e.target.value ? +e.target.value : undefined)
                    }
                  />
                </Card.Title>
                <div className={s.btns}>
                  <Button
                    variant="danger"
                    className={cs([s.button], "w-50", "btn-sm", "m-1")}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className={cs([s.button], "w-50", "btn-sm", "m-1")}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </Card.Body>
            </div>
          ) : null}
        </Card>
      </Col>
    </>
  );
};

export default CardBouquet;
