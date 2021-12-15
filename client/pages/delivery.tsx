import ListGroup from "react-bootstrap/ListGroup";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import Loading from "../components/Loading/Loading";
import { useDeliveryPriceQuery } from "../store/generated/graphql";
import s from "../styles/Delivery.module.css";
import { showError } from "../utils/showError";

const Delivery: () => JSX.Element | void = () => {
  const { loading, error, data } = useDeliveryPriceQuery();

  if (error) {
    console.log(error);
    return showError("Error. Please, reload the page");
  }

  return (
    <NavBar title="Delivery and payment">
      <ContentLayout>
        {data === undefined ? (
          <Loading />
        ) : (
          <>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Delivery</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                For purchases over $100 – <span className={s.price}>free</span>{" "}
                delivery
                <br />
                For purchases under $100 – delivery cost{" "}
                <span className={s.price}>$</span>
                <span className={s.price}>
                  {data?.deliveryPrice?.price}
                </span>{" "}
                <br />
                <span className={s.u}>We work within Illinois</span>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Payment</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                You can pay for purchases by cash, transfer via Zelle on
                credit/debit card.
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>
                How to cancel and change
              </ListGroup.Item>
              <ListGroup.Item className={s.body}>
                Please send your request by email to{" "}
                <a href="mailto:PGroup.balloons@gmail.com" className={s.email}>
                  PGroup.balloons@gmail.com
                </a>
                <br />
                Please consider your order canceled or changed only when you
                have received a confirmation by email.
                <br />
                <br />
                The deadline to modify or cancel and order is 9 am, Eastern Time
                (New York), two days prior to delivery. Orders cancelled or
                changed after this deadline will not be refunded.
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Delivery;
