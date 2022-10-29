import type { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounterAndPhoto from "../components/ListWithCounterAndPhoto/ListWithCounterAndPhoto";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import cs from "classnames";
import s from "../styles/Basket.module.css";
import { ChangeEvent, useMemo, useState } from "react";
import { basketArrConvertor } from "../utils/basketArrConvertor";
import { v4 as uuidv4 } from "uuid";
import { useGetBasketValues } from "../hooks/useGetBasketValues";
import { BasketObjType, FormType } from "../types/BasketTypes";
import { showError } from "../utils/showError";
import { showSuccess } from "../utils/showSucces";
import { emptifyBasket } from "../utils/emptifyBasket";
import { useSendOrderMutation } from "../store/generated/graphql";
import Loading from "../components/Loading/Loading";

const Basket: NextPage = () => {
  const basket = useGetBasketValues();
  const convertedBasket: Array<BasketObjType> = basketArrConvertor(basket);

  const [sendOrder, { data, loading, error }] = useSendOrderMutation({
    onCompleted(data) {
      console.log(data.sendOrder);
      data.sendOrder
        ? showSuccess("Замовлення прийнято! Наш менеджер сконтактує з Вами")
        : showError("Помилка. Замовлення не прийнято!");
    },
    onError(error) {
      showError("Помилка. Замовлення не прийнято!");
      console.log(error);
    },
  });

  const initFormState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    code: 0,
    date: "",
    time: "",
  };

  const [state, setState] = useState<FormType>(initFormState);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const completeOrder = useMemo(
    () => ({
      name: state.name,
      phone: state.phone,
      email: state.email,
      address: state.address,
      code: state.code,
      date: state.date,
      time: state.time,
      totalPrice: basket.reduce(
        (sum, obj) => sum + obj.price * obj.quantity,
        0
      ),
      userId: uuidv4(),
      orders: basket,
    }),
    [state, basket]
  );

  const handleOrder = () => {
    if (!state.name) return showError("Ваше ім'я");
    if (!state.phone) return showError("Ваш телефон");
    if (!state.email) return showError("Ваш e-mail");
    if (!state.address) return showError("Ваша адреса");
    if (!state.date) return showError("Дата");
    if (!state.time) return showError("Час");
    sendOrder({
      variables: {
        order: JSON.stringify(completeOrder),
      },
    });

    emptifyBasket();
    setState(initFormState);
  };

  return (
    <NavBar title="Кошик">
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
        <>
          {convertedBasket &&
            (convertedBasket.length > 0 ? (
              <>
                <ListWithCounterAndPhoto measure={"грн."} data={convertedBasket} />
                <Form
                  className={cs(
                    [s.form],
                    "d-flex",
                    "align-items-center",
                    "flex-column"
                  )}
                >
                  <div className={s.header}>Замовлення:</div>
                  <FloatingLabel
                    controlId="name"
                    label="Введіть ім'я"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Введіть ім'я"
                      name="name"
                      value={state.name}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="phone"
                    label="Введіть телефон"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Введіть телефон"
                      name="phone"
                      value={state.phone}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="text"
                    label="Введіть e-mail"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Введіть e-mail"
                      name="email"
                      value={state.email}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="address"
                    label="Введіть адресу"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Введіть адресу"
                      name="address"
                      value={state.address}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="date"
                    label="Введіть дату"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="date"
                      placeholder="Введіть дату"
                      name="date"
                      value={state.date}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="time"
                    label="Введіть час"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="time"
                      placeholder="Введіть час"
                      name="time"
                      value={state.time}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <div className={s.attention}>
                    *Вказаний час може бути зайнятим. Менеджер сконтактує з Вами
                  </div>
                  <Button
                    variant="primary"
                    className={s.submitBtn}
                    onClick={handleOrder}
                  >
                    Підтвердити замовлення
                  </Button>
                </Form>
              </>
            ) : (
              <div className={s.emptyBaskettext}>Кошик пустий</div>
            ))}
        </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Basket;
