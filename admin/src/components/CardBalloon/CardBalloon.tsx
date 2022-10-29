import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import s from "./CardBalloon.module.css";
import cs from "classnames";
import { googleUrl } from "../../config";
import { ChangeEvent, useState } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import Loading from "../Loading/Loading";
import { ChangeBalloonMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface CardBalloonPropsType {
  photo: string;
  name: string;
  subName: string;
  price: number;
  code: number;
  id: string;
  measure: string;
  description: string;
  category: { id: string; name: string };
  color: { id: string; name: string };
  deleteCard: () => void;
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
  addMutation: (args: ChangeBalloonMutationVariables) => void;
}

const CardBalloon: React.FC<CardBalloonPropsType> = ({
  photo,
  name,
  subName,
  price,
  code,
  id,
  measure,
  description,
  category,
  color,
  deleteCard,
  categories,
  colors,
  addMutation,
}) => {
  const [change, setChange] = useState<boolean>(false);
  const [name1, setName1] = useState<string>(name);
  const [name2, setName2] = useState<string>(subName);
  const [newPrice, setNewPrice] = useState<number | undefined>(price);
  const [newCode, setNewCode] = useState<number | undefined>(code);
  const [desc, setDesc] = useState<string>(description);
  const [cat, setCat] = useState<string>(category.id);
  const [col, setCol] = useState<string>(color.id);
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
    if (!name1) return showError("Введіть перше ім'я");
    if (!name2) return showError("Введіть друге ім'я");
    if (!newPrice) return showError("Введіть ціну");
    if (!desc) return showError("Введіть опис");
    if (!cat) return showError("Введіть категорію");
    if (!col) return showError("Введіть колір");
    if (!newCode) return showError("Введіть артикул");
    const args: ChangeBalloonMutationVariables = {
      id,
      name: name1!,
      subname: name2!,
      price: newPrice!,
      description: desc!,
      code: newCode!,
      categoryId: cat!,
      colorId: col!,
      image: loadedPhoto!,
    };
    addMutation(args);
    setChange(false);
    setPreload("");
    showSuccess('Кулька успішно додана');
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
                <span>Перше ім'я: </span>
                {name}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Друге ім'я: </span>
                {subName}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Ціна: </span>
                {price} {measure}
              </Card.Title>
              <Card.Title className={s.title}>
                <span>Опис: </span>
                {description}
              </Card.Title>
              {true && (
                <Card.Title className={s.title}>
                  <span>Категорія: </span>
                  {category.name}
                </Card.Title>
              )}
              {true && (
                <Card.Title className={s.title}>
                  <span>Ціна: </span>
                  {color.name}
                </Card.Title>
              )}
              <Card.Title className={s.title}>
                <span>Артикул: </span>
                {code}
              </Card.Title>
              <div className={s.btns}>
                <Button
                  variant="danger"
                  className={cs([s.button], "w-50", "btn-sm", "m-1")}
                  onClick={deleteCard}
                >
                  Видалити
                </Button>
                <Button
                  variant="primary"
                  className={cs([s.button], "w-50", "btn-sm", "m-1")}
                  onClick={() => setChange(!change)}
                >
                  Змінити
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
                  <Button variant="outline-primary">Змінити фото</Button>
                </div>
                <div className={s.imgBody}>
                  {preload && <img src={preload as string}></img>}
                </div>
              </div>
              <Card.Body className="d-flex flex-column align-items-center pb-2">
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Перше ім'я: </span>
                  <input
                    type={"text"}
                    className="w-50"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Друге ім'я: </span>
                  <input
                    type={"text"}
                    className="w-50"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                  />
                </Card.Title>
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Ціна: </span>
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
                  <span className="w-50">Опис: </span>
                  <textarea
                    className="w-50"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Card.Title>
                {true && (
                  <Card.Title className={cs([s.title], "d-flex")}>
                    <span className="w-50">Категорія: </span>
                    <select
                      className="w-50"
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                    >
                      <option>Виберіть категорію...</option>
                      {categories &&
                        categories.map((obj) => (
                          <option value={obj?.id!}>{obj?.name}</option>
                        ))}
                    </select>
                  </Card.Title>
                )}
                {true && (
                  <Card.Title className={cs([s.title], "d-flex")}>
                    <span className="w-50">Колір: </span>
                    <select
                      className="w-50"
                      value={col}
                      onChange={(e) => setCol(e.target.value)}
                    >
                      <option>Виберіть колір...</option>
                      {colors &&
                        colors.map((obj) => (
                          <option value={obj?.id!}>{obj?.name}</option>
                        ))}
                    </select>
                  </Card.Title>
                )}
                <Card.Title className={cs([s.title], "d-flex")}>
                  <span className="w-50">Артикул: </span>
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
                    Відмінити
                  </Button>
                  <Button
                    variant="primary"
                    className={cs([s.button], "w-50", "btn-sm", "m-1")}
                    onClick={handleSave}
                  >
                    Зберегти
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

export default CardBalloon;
