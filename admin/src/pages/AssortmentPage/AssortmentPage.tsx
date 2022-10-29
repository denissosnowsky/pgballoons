import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import AddAssortmentModal from "../../components/AddAssortmentModal/AddAssortmentModal";
import AssortmentList from "../../components/AssortmentList/AssortmentList";
import Loading from "../../components/Loading/Loading";
import {
  useAddAssortmentMutation,
  useAssortmentQuery,
  useChangeAssortmantMutation,
  useDeleteAssortmantMutation,
} from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";
import s from "./AssortmentPage.module.css";

interface AssortmentPagePropsType {}

const AssortmentPage: React.FC<AssortmentPagePropsType> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const {
    loading: loadingAssortQ,
    error: errorAssortQ,
    data: dataAssortQ,
  } = useAssortmentQuery();

  const [
    deleteAssort,
    {
      data: dataDeleteAssort,
      loading: loadingDeleteAssort,
      error: errorDeleteAssort,
    },
  ] = useDeleteAssortmantMutation({
    refetchQueries: ["Assortment"],
  });

  const [
    addAssort,
    { data: dataAddAssort, loading: loadingAddAssort, error: errorAddAssort },
  ] = useAddAssortmentMutation({
    refetchQueries: ["Assortment"],
  });

  const [
    changeAssort,
    {
      data: dataChangeAssort,
      loading: loadingChangeAssort,
      error: errorChangeAssort,
    },
  ] = useChangeAssortmantMutation({
    refetchQueries: ["Assortment"],
  });

  if (
    errorAssortQ ||
    errorDeleteAssort ||
    errorAddAssort ||
    errorChangeAssort
  ) {
    console.log(
      errorAssortQ
        ? errorAssortQ
        : errorDeleteAssort
        ? errorDeleteAssort
        : errorAddAssort
        ? errorAddAssort
        : errorChangeAssort
    );
    showError("Помилка. Перезагрузіть сторінку!");
    return;
  }

  if (
    loadingAssortQ ||
    loadingDeleteAssort ||
    loadingAddAssort ||
    loadingChangeAssort
  )
    return <Loading />;

  return (
    <>
      {isShowed && (
        <AddAssortmentModal
          isShow={isShowed}
          setShow={setIsShowed}
          addMutation={(args) =>
            addAssort({
              variables: args,
            })
          }
        />
      )}
      <ListGroup variant="flush" className={s.ul}>
        {dataAssortQ &&
          dataAssortQ.assortment.length > 0 &&
          dataAssortQ.assortment.map((obj) => (
            <AssortmentList
              key={obj.id}
              data={obj}
              deleteMutation={(args) => {
                deleteAssort({
                  variables: args,
                });
                showSuccess("Асортимент успішно видалений");
              }}
              changeMutation={(args) =>
                changeAssort({
                  variables: args,
                })
              }
            />
          ))}
      </ListGroup>
      <div className="w-100 d-flex justify-content-center mt-2 mb-3">
        <Button variant="success" onClick={() => setIsShowed(true)}>
          <i className="bi bi-plus-circle"></i> Додати
        </Button>
      </div>
    </>
  );
};

export default AssortmentPage;
