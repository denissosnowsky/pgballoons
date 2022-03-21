import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import AddColorModal from "../../components/AddColorModal/AddColorModal";
import Loading from "../../components/Loading/Loading";
import {
  useAddColorMutation,
  useColorsQuery,
  useDeleteColorMutation,
} from "../../store/generated/graphql";
import s from "./ColorsPage.module.css";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface ColorsPagePropsType {}

const ColorsPage: React.FC<ColorsPagePropsType> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const {
    loading: loadingColQ,
    error: errorColQ,
    data: dataColQ,
  } = useColorsQuery();

  const [
    deleteColors,
    {
      data: dataDeleteColors,
      loading: loadingDeleteColors,
      error: errorDeleteColors,
    },
  ] = useDeleteColorMutation({
    refetchQueries: ["Colors"],
  });

  const [
    addColors,
    { data: dataAddColors, loading: loadingAddColors, error: errorAddColors },
  ] = useAddColorMutation({
    refetchQueries: ["Colors"],
  });

  if (errorColQ || errorDeleteColors || errorAddColors) {
    console.log(
      errorColQ
        ? errorColQ
        : errorDeleteColors
        ? errorDeleteColors
        : errorAddColors
    );
    showError("Error. Reload the page!");
    return;
  }

  if (loadingColQ || loadingDeleteColors || loadingAddColors)
    return <Loading />;
    
console.log(dataColQ);
  return (
    <>
      {isShowed && (
        <AddColorModal
          isShow={isShowed}
          setShow={setIsShowed}
          addMutation={(args) =>
            addColors({
              variables: args,
            })
          }
        />
      )}
      <ListGroup variant="flush" className={s.ul}>
        {dataColQ &&
          (dataColQ!.colors!.length > 0
            ? dataColQ!.colors!.map((i) => (
                <>
                  <ListGroup.Item className={s.li} key={i.id!}>
                    <div className="d-flex align-items-center">
                      <span className="me-3">{i?.name}</span>
                      <span
                        className={s.color}
                        style={{ backgroundColor: i?.cssName }}
                      ></span>
                    </div>
                    <span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          deleteColors({
                            variables: {
                              id: i.id!,
                            },
                          });
                          showSuccess("Color successfully removed");
                        }}
                      >
                        Delete
                      </Button>
                    </span>
                  </ListGroup.Item>
                </>
              ))
            : null)}
        <div className="w-100 d-flex justify-content-center mt-2 mb-3">
          <Button variant="success" onClick={() => setIsShowed(true)}>
            <i className="bi bi-plus-circle"></i> Add
          </Button>
        </div>
      </ListGroup>
    </>
  );
};

export default ColorsPage;
