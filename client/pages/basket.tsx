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
        ? showSuccess("The order has been sent! Our manager will contact you")
        : showError("Error. The order has not been sent!");
    },
    onError(error) {
      showError("Error. The order has not been sent!");
      console.log(error);
    },
  });

  const initFormState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    code: null,
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
    if (!state.name) return showError("Enter your name");
    if (!state.phone) return showError("Enter your phone");
    if (!state.email) return showError("Enter your e-mail");
    if (!state.address) return showError("Enter your address");
    if (!state.code) return showError("Enter your code");
    if (!state.date) return showError("Enter the date");
    if (!state.time) return showError("Enter the time");
    sendOrder({
      variables: {
        order: JSON.stringify(completeOrder),
      },
    });

    emptifyBasket();
    setState(initFormState);
  };

  return (
    <NavBar title="Cart">
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
        <>
          {convertedBasket &&
            (convertedBasket.length > 0 ? (
              <>
                <ListWithCounterAndPhoto measure={"$"} data={convertedBasket} />
                <Form
                  className={cs(
                    [s.form],
                    "d-flex",
                    "align-items-center",
                    "flex-column"
                  )}
                >
                  <div className={s.header}>Application for deliveries:</div>
                  <FloatingLabel
                    controlId="name"
                    label="Enter your name"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={state.name}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="phone"
                    label="Enter your phone"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone"
                      name="phone"
                      value={state.phone}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="text"
                    label="Enter your e-mail"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your e-mail"
                      name="email"
                      value={state.email}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="address"
                    label="Enter your address"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={state.address}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="ZIP code"
                    label="Enter your ZIP code"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="number"
                      placeholder="Enter your ZIP code"
                      name="code"
                      value={state.code}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="date"
                    label="Enter the date"
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="date"
                      placeholder="Enter the date"
                      name="date"
                      value={state.date}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="time"
                    label="Enter the time"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      type="time"
                      placeholder="Enter the time"
                      name="time"
                      value={state.time}
                      onChange={handleInputs}
                    />
                  </FloatingLabel>
                  {/* <div className={s.attention}>
                    *Указаное время может быть занято, менеджер уточнит во время
                    звонка
                  </div> */}
                  <Button
                    variant="primary"
                    className={s.submitBtn}
                    onClick={handleOrder}
                  >
                    Confirm the order
                  </Button>
                </Form>
              </>
            ) : (
              <div className={s.emptyBaskettext}>Cart is empty</div>
            ))}
        </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Basket;
