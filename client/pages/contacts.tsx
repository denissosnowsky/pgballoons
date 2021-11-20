import type { NextPage } from "next";
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
    return showError("Error. Please, reload the page");
  }

  return (
    <NavBar title="Contacts">
      <ContentLayout>
        {(dataPhone===undefined || dataSocial===undefined) ? (
          <Loading />
        ) : (
          <>
            <Row>
              <Col
                className="d-flex justify-content-center flex-column align-items-center"
                style={{ paddingTop: "70px", paddingBottom: "20px" }}
              >
                {dataPhone?.phones?.map((item) => (
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
                {dataSocial?.socialNets?.map((item) => (
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
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Contacts;
