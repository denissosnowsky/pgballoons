import { useState } from "react";
import { Button, Col, ListGroup, Nav, Row } from "react-bootstrap";
import AddPhoneModal from "../../components/AddPhoneModal/AddPhoneModal";
import AddSocNetModal from "../../components/AddSocNetModal/AddSocNetModal";
import Loading from "../../components/Loading/Loading";
import {
  useAddPhoneMutation,
  useAddSocialNetMutation,
  useDeletePhoneMutation,
  useDeleteSocialNetMutation,
  usePhonesQuery,
  useSocialNetsQuery,
} from "../../store/generated/graphql";
import s from "./ContactsPage.module.css";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface ContactsPagePropsType {}

const ContactsPage: React.FC<ContactsPagePropsType> = () => {
  const [switchPhone, setSwitchPhone] = useState(true);
  const [addModalPhoneShowed, setAddModalPhoneShowed] =
    useState<boolean>(false);
  const [addModalSocNetShowed, setAddModalSocNetShowed] =
    useState<boolean>(false);

  const {
    loading: loadingPhones,
    error: errorPhones,
    data: dataPhones,
  } = usePhonesQuery();
  const {
    loading: loadingSoc,
    error: errorSoc,
    data: dataSoc,
  } = useSocialNetsQuery();

  const [
    addPhone,
    { data: dataAddPhone, loading: loadingAddPhone, error: errorAddPhone },
  ] = useAddPhoneMutation({
    refetchQueries: ["Phones"],
  });

  const [
    addSoc,
    { data: dataAddSoc, loading: loadingAddSoc, error: errorAddSoc },
  ] = useAddSocialNetMutation({
    refetchQueries: ["SocialNets"],
  });

  const [
    deletePhone,
    {
      data: dataDeletePhone,
      loading: loadingDeletePhone,
      error: errorDeletePhone,
    },
  ] = useDeletePhoneMutation({
    refetchQueries: ["Phones"],
  });

  const [
    deleteSoc,
    { data: dataDeleteSoc, loading: loadingDeleteSoc, error: errorDeleteSoc },
  ] = useDeleteSocialNetMutation({
    refetchQueries: ["SocialNets"],
  });

  if (
    errorAddPhone ||
    errorAddSoc ||
    errorDeletePhone ||
    errorDeleteSoc ||
    errorPhones ||
    errorSoc
  ) {
    console.log(
      errorAddPhone
        ? errorAddPhone
        : errorAddSoc
        ? errorAddSoc
        : errorDeletePhone
        ? errorDeletePhone
        : errorDeleteSoc
        ? errorDeleteSoc
        : errorPhones
        ? errorPhones
        : errorSoc
    );
    showError("Помилка. Перезагрузіть сторінку!");
    return;
  }

  if (
    loadingPhones ||
    loadingSoc ||
    loadingAddPhone ||
    loadingAddSoc ||
    loadingDeletePhone ||
    loadingDeleteSoc
  )
    return <Loading />;

  return (
    <>
      <Row className="mb-3">
        <Col
          xs={{ span: 4, offset: 4 }}
          className="d-flex justify-content-center align-items-center"
        >
          <Button className="m-2" onClick={() => setSwitchPhone(true)}>
          Змінити номера
          </Button>
          <Button className="m-2" onClick={() => setSwitchPhone(false)}>
          Змінити соц. мережі
          </Button>
        </Col>
      </Row>
      <Row>
        {switchPhone ? (
          <>
            {addModalPhoneShowed && (
              <AddPhoneModal
                isShow={addModalPhoneShowed}
                setShow={setAddModalPhoneShowed}
                addMutation={(args) =>
                  addPhone({
                    variables: args,
                  })
                }
              />
            )}
            {dataPhones &&
              dataPhones.phones.length > 0 &&
              dataPhones.phones.map((obj) => (
                <ListGroup.Item className={s.li}>
                  <div className={s.listWrapper}>
                    <span>{`Телефон: ${obj.number}`}</span>
                    <div>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deletePhone({ variables: { id: obj.id } });
                          showSuccess("Телефон успішно видалений");
                        }}
                      >
                        Видалити
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            <div className="w-100 d-flex justify-content-center mt-2 mb-3">
              <Button
                variant="success"
                onClick={() => setAddModalPhoneShowed(true)}
              >
                <i className="bi bi-plus-circle"></i> Додати
              </Button>
            </div>
          </>
        ) : (
          <>
            {addModalSocNetShowed && (
              <AddSocNetModal
                isShow={addModalSocNetShowed}
                setShow={setAddModalSocNetShowed}
                addMutation={(args) =>
                  addSoc({
                    variables: args,
                  })
                }
              />
            )}
            {dataSoc &&
              dataSoc.socialNets.length > 0 &&
              dataSoc.socialNets.map((obj) => (
                <ListGroup.Item className={s.li}>
                  <div className={s.listWrapper}>
                    <span>{`Соц. мережа: ${obj.name}`}</span>
                    <div>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteSoc({ variables: { id: obj.id } });
                          showSuccess("Соц. мережа успішно видалена");
                        }}
                      >
                        Видалити
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span>Посилання: {obj.link}</span>
                  </div>
                  <div>
                    <span>Ім'я картинки: {obj.image}</span>
                  </div>
                </ListGroup.Item>
              ))}
            <div className="w-100 d-flex justify-content-center mt-2 mb-3">
              <Button
                variant="success"
                onClick={() => setAddModalSocNetShowed(true)}
              >
                <i className="bi bi-plus-circle"></i> Додати
              </Button>
            </div>
          </>
        )}
      </Row>
    </>
  );
};

export default ContactsPage;
