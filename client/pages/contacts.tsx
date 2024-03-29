import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import Loading from "../components/Loading/Loading";
import PhoneBlock from "../components/PhoneBlock/PhoneBlock";
import SocialNetBlock from "../components/SocialNetBlock/SocialNetBlock";
import { usePhonesQuery, useSocialNetsQuery } from "../store/generated/graphql";
import { showError } from "../utils/showError";

const Contacts: () => JSX.Element | void = () => {
  const {
    loading: loadingPhone,
    error: errorPhone,
    data: dataPhone,
  } = usePhonesQuery();
  const {
    loading: loadingSocial,
    error: errorSocial,
    data: dataSocial,
  } = useSocialNetsQuery();

  if (errorPhone || errorSocial) {
    console.log(errorPhone);
    console.log(errorSocial);
    return showError("Помилка. Будь ласка, перезагрузіть сторінку");
  }
  if (loadingPhone || loadingSocial) return <Loading />;

  console.log("page: \n" + JSON.stringify(dataPhone));
  console.log("page: \n" + JSON.stringify(dataSocial));

  return (
    <NavBar title="Контакти">
      <ContentLayout>
        <>
          <Row>
            <Col
              className="d-flex justify-content-center flex-column align-items-center"
              style={{ paddingTop: "70px", paddingBottom: "20px" }}
            >
              {dataPhone &&
                dataPhone.phones.length > 0 &&
                dataPhone.phones.map((item) => (
                  <PhoneBlock
                    fontSize="30px"
                    number={item!.number}
                    key={item?.id}
                  />
                ))}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {dataSocial &&
                dataSocial.socialNets.length > 0 &&
                dataSocial.socialNets.map((item) => (
                  <SocialNetBlock
                    key={item?.id}
                    size="70px"
                    margin="10px"
                    title={item!.name}
                    href={item!.link}
                    image={item!.image}
                  />
                ))}
            </Col>
          </Row>
        </>
      </ContentLayout>
    </NavBar>
  );
};

export default Contacts;
