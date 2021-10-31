import s from "./CategoriesPage.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../store/generated/graphql";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface CategoriesPagePropsType {}

const CategoriesPage: React.FC<CategoriesPagePropsType> = ({}) => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const {
    loading: loadingCatQ,
    error: errorCatQ,
    data: dataCatQ,
  } = useCategoriesQuery();

  const [
    deleteCategories,
    {
      data: dataDeleteCategories,
      loading: loadingDeleteCategories,
      error: errorDeleteCategories,
    },
  ] = useDeleteCategoryMutation({
    refetchQueries: ["Categories"],
  });

  const [
    addCategories,
    {
      data: dataAddCategories,
      loading: loadingAddCategories,
      error: errorAddCategories,
    },
  ] = useAddCategoryMutation({
    refetchQueries: ["Categories"],
  });

  if (errorCatQ || errorDeleteCategories || errorAddCategories) {
    console.log(
      errorCatQ
        ? errorCatQ
        : errorDeleteCategories
        ? errorDeleteCategories
        : errorAddCategories
    );
    showError("Error. Reload the page!");
    return;
  }

  if (loadingCatQ || loadingDeleteCategories || loadingAddCategories)
    return <Loading />;

  return (
    <>
      {isShowed && (
        <AddCategoryModal
          isShow={isShowed}
          setShow={setIsShowed}
          addMutation={(args) =>
            addCategories({
              variables: args,
            })
          }
        />
      )}
      <ListGroup variant="flush" className={s.ul}>
        {dataCatQ &&
          (dataCatQ!.categories!.length > 0
            ? dataCatQ!.categories!.map((i) => (
                <>
                  <ListGroup.Item className={s.li} key={i.id!}>
                    <span>{i?.name}</span>
                    <span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          deleteCategories({
                            variables: {
                              id: i.id!,
                            },
                          });
                          showSuccess("Category successfully removed");
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

export default CategoriesPage;
