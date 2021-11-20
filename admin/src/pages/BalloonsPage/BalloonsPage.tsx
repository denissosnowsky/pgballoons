import s from "./BalloonsPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownBtn from "../../components/DropdownBtn/DropdownBtn";
import DropdownBtnWithColor from "../../components/DropdownBtnWithColor/DropdownBtnWithColor";
import PaginationFC from "../../components/Pagination/Pagination";
import SearchInput from "../../components/SearchInput/SearchInput";
import Button from "react-bootstrap/Button";
import CardBalloon from "../../components/CardBalloon/CardBalloon";
import cs from "classnames";
import { useCallback, useEffect, useState } from "react";
import {
  useAddBalloonMutation,
  useAllBalloonsQuery,
  useBalloonsQuery,
  useCategoriesQuery,
  useChangeBalloonMutation,
  useChangeManyPricesToBalloonsMutation,
  useColorsQuery,
  useDeleteBalloonMutation,
} from "../../store/generated/graphql";
import { NetworkStatus } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
import AddBalloonModal from "../../components/AddBalloonModal/AddBalloonModal";
import ChangeManyPricesModal from "../../components/ChangeManyPricesModal/ChangeManyPricesModal";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface BalloonsPagePropsType {}

const BalloonsPage: React.FC<BalloonsPagePropsType> = () => {
  const TAKE = 16;
  const [code, setCode] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [emptyCat, setEmptyCat] = useState<boolean>(false); //emptifies category title
  const [emptyCol, setEmptyCol] = useState<boolean>(false); //emptifies color title
  const [emptyCode, setEmptyCode] = useState<boolean>(false);
  const [addModalShowed, setAddModalShowed] = useState<boolean>(false);
  const [changePricesShowed, setChangePricesShowed] = useState<boolean>(false);

  const {
    loading: loadingBalloons,
    error: errorBalloons,
    data: dataBalloons,
    fetchMore,
    networkStatus: networkStatusBalloons,
  } = useBalloonsQuery({
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
      categoryId: category,
      colorId: color,
      code: code ? +code : undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
    fetchMore: fetchMoreCount,
    networkStatus: networkStatusCount,
  } = useAllBalloonsQuery({
    variables: {
      categoryId: category,
      colorId: color,
      code: code ? +code : undefined,
    },
  });

  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useCategoriesQuery();

  const {
    loading: loadingColor,
    error: errorColor,
    data: dataColor,
    fetchMore: fetchMoreColors,
  } = useColorsQuery({ variables: { categoryId: category } });

  const [
    deleteCard,
    { data: dataDeleteC, loading: loadingDeleteC, error: errorDeleteC },
  ] = useDeleteBalloonMutation({ refetchQueries: ["Balloons", "AllBalloons"] });

  const [
    addProduct,
    {
      data: dataAddProduct,
      loading: loadingAddProduct,
      error: errorAddProduct,
    },
  ] = useAddBalloonMutation({ refetchQueries: ["Balloons", "AllBalloons"] });

  const [
    changePrices,
    {
      data: dataChangePrices,
      loading: loadingChangePrices,
      error: errorChangePrices,
    },
  ] = useChangeManyPricesToBalloonsMutation({
    refetchQueries: ["Balloons", "AllBalloons"],
  });

  const [
    changeBalloons,
    {
      data: dataChangeBalloons,
      loading: loadingChangeBalloons,
      error: errorChangeBalloons,
    },
  ] = useChangeBalloonMutation();

  useEffect(() => {
    fetchMore({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
        categoryId: category,
        colorId: color,
        code: code ? +code : undefined,
      },
    });
  }, [page, category, color, code]);

  useEffect(() => {
    fetchMoreColors({
      variables: {
        categoryId: category,
      },
    });
  }, [category]);

  const handleFilter = useCallback(
    (type: "CATEGORY" | "COLOR") => (filter: number | string | undefined) => {
      fetchMoreCount({
        variables: {
          categoryId: type === "CATEGORY" ? filter : category,
          colorId: type === "COLOR" ? filter : color,
        },
      });
      setPage(1);
      setCode(undefined);
      setEmptyCode(true);
      setEmptyCat(false);
      setEmptyCol(false);
      type === "CATEGORY" && setCategory(filter as string);
      type === "COLOR" && setColor(filter as string);
    },
    []
  );

  const handleCodeSearch = (value: string) => {
    setCode(value);
    setCategory(undefined);
    setColor(undefined);
    setEmptyCat(true);
    setEmptyCol(true);
    setEmptyCode(false);
  };

  if (
    errorBalloons ||
    errorCount ||
    errorCategory ||
    errorColor ||
    errorDeleteC ||
    errorAddProduct ||
    errorChangePrices ||
    errorChangeBalloons
  ) {
    console.log(
      errorBalloons
        ? errorBalloons
        : errorCount
        ? errorCount
        : errorCategory
        ? errorCategory
        : errorColor
        ? errorColor
        : errorDeleteC
        ? errorDeleteC
        : errorAddProduct
        ? errorAddProduct
        : errorChangePrices
        ? errorChangePrices
        : errorChangeBalloons
    );
    showError("Error. Reload the page!");
    return;
  }

  return (
        <>
          {addModalShowed && (
            <AddBalloonModal
              isShow={addModalShowed}
              setShow={setAddModalShowed}
              addMutation={(args) =>
                addProduct({
                  variables: args,
                })
              }
              categories={dataCategory?.categories!}
              colors={dataColor?.colors!}
            />
          )}
          {changePricesShowed && (
            <ChangeManyPricesModal
              isShow={changePricesShowed}
              setShow={setChangePricesShowed}
              addMutation={(args) =>
                changePrices({
                  variables: {...args, categoryId: category},
                })
              }
            />
          )}
          <Row className={s.filters}>
            <Row className={s.rowFilters}>
              <Col
                xs={4}
                className="d-flex justify-content-center align-items-center"
              >
                <DropdownBtn
                  title={"Select a category | All"}
                  items={dataCategory?.categories!}
                  externalClb={handleFilter("CATEGORY")}
                  emptify={emptyCat}
                />
              </Col>
              <Col xs={{ span: 4, offset: 4 }}>
                <Button
                  className={s.btnRight}
                  variant="success"
                  onClick={() => setAddModalShowed(true)}
                >
                  <i className="bi bi-plus-circle"></i> Add Product
                </Button>
              </Col>
            </Row>
            <Row className={s.rowFilters}>
              <Col
                xs={4}
                className="d-flex justify-content-center align-items-center"
              >
                <DropdownBtnWithColor
                  title={"Select a color | All"}
                  items={dataColor?.colors!}
                  externalClb={handleFilter("COLOR")}
                  emptify={emptyCol}
                />
              </Col>
              <Col xs={{ span: 4, offset: 4 }}>
                <Button
                  className={s.btnRight}
                  onClick={() => setChangePricesShowed(true)}
                >
                  Change many prices
                </Button>
              </Col>
            </Row>
            <Row className={cs([s.rowFilters, s.bottomFilterInput])}>
              <Col xs={4}>
                <SearchInput
                  externalClb={handleCodeSearch}
                  emptify={emptyCode}
                />
              </Col>
            </Row>
          </Row>
          {loadingBalloons ||
          loadingCount ||
          loadingDeleteC ||
          loadingAddProduct ||
          loadingChangePrices ||
          networkStatusBalloons === NetworkStatus.refetch ||
          networkStatusCount === NetworkStatus.refetch ? (
            <Loading />
          ) : (
            <>
              {dataBalloons?.balloons && dataBalloons?.balloons?.length > 0 ? (
                <>
                  <Row className={s.catalog}>
                    {dataBalloons?.balloons?.map((item) => (
                      <CardBalloon
                        key={item?.id}
                        photo={item?.image!}
                        name={item?.name!}
                        subName={item?.subname!}
                        price={item?.price!}
                        code={item?.code!}
                        id={item?.id!}
                        measure={"$"}
                        description={item?.description!}
                        category={item?.category!}
                        color={item?.color!}
                        deleteCard={() => {
                          deleteCard({
                            variables: { id: item?.id! },
                          });
                          showSuccess("Balloon successfully removed");
                        }}
                        categories={dataCategory?.categories!}
                        colors={dataColor?.colors!}
                        addMutation={(args) =>
                          changeBalloons({
                            variables: args,
                          })
                        }
                      />
                    ))}
                  </Row>
                  <PaginationFC
                    page={page}
                    setPage={setPage}
                    pageSize={TAKE}
                    allCount={dataCount?.allBalloons!}
                  />
                </>
              ) : (
                <div className={s.empty}>There are no such balloons</div>
              )}
            </>
          )}
        </>
  );
};

export default BalloonsPage;
