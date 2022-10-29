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
    return showError("Помилка. Будь ласка, перезагрузіть сторінку");
  }

  return (
    <NavBar title="Доставка і оплата">
      <ContentLayout>
        {data === undefined ? (
          <Loading />
        ) : (
          <>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Доставка</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                Ціна доставки{" "}
                <span className={s.price}>{data?.deliveryPrice?.price}</span>{" "}
                <span className={s.price}>грн.</span>
                <br />
                <span className={s.u}>Доставка по Києву і області</span>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Оплата</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                Оплата готівкою, або карткою у нашому магазині за адресою -
                Софіївська борщагівка, проспект Героїв Небесної Сотні, 26
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Delivery;
