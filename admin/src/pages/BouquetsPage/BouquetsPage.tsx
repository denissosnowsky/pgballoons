import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./BouquetsPage.module.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import cs from "classnames";
import { useEffect, useState } from "react";
import {
  useAddBouquetMutation,
  useAllBouquetsQuery,
  useBouquetsQuery,
  useChangeBouquetMutation,
  useChangeManyPricesToBouquetsMutation,
  useDeleteBouquetMutation,
} from "../../store/generated/graphql";
import AddBouquetModal from "../../components/AddBouquetModal/AddBouquetModal";
import ChangeManyPricesModal from "../../components/ChangeManyPricesModal/ChangeManyPricesModal";
import Loading from "../../components/Loading/Loading";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";
import CardBouquet from "../../components/CardBouquet/CardBouquet";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface BouquetsPagePropsType {}

const BouquetsPage: React.FC<BouquetsPagePropsType> = () => {
  const TAKE = 16;
  const [code, setCode] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [emptyCode, setEmptyCode] = useState<boolean>(false);
  const [addModalShowed, setAddModalShowed] = useState<boolean>(false);
  const [changePricesShowed, setChangePricesShowed] = useState<boolean>(false);

  const {
    loading: loadingBouquets,
    error: errorBouquets,
    data: dataBouquets,
    fetchMore,
    networkStatus: networkStatusBouquets,
  } = useBouquetsQuery({
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
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
  } = useAllBouquetsQuery({
    variables: {
      code: code ? +code : undefined,
    },
  });

  const [
    deleteCard,
    { data: dataDeleteC, loading: loadingDeleteC, error: errorDeleteC },
  ] = useDeleteBouquetMutation({ refetchQueries: ["Bouquets", "AllBouquets"] });

  const [
    addProduct,
    {
      data: dataAddProduct,
      loading: loadingAddProduct,
      error: errorAddProduct,
    },
  ] = useAddBouquetMutation({ refetchQueries: ["Bouquets", "AllBouquets"] });

  const [
    changePrices,
    {
      data: dataChangePrices,
      loading: loadingChangePrices,
      error: errorChangePrices,
    },
  ] = useChangeManyPricesToBouquetsMutation({
    refetchQueries: ["Bouquets", "AllBouquets"],
  });

  const [
    changeBouquets,
    {
      data: dataChangeBouquets,
      loading: loadingChangeBouquets,
      error: errorChangeBouquets,
    },
  ] = useChangeBouquetMutation();

  useEffect(() => {
    fetchMore({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
        code: code ? +code : undefined,
      },
    });
  }, [page, code]);

  const handleCodeSearch = (value: string) => {
    setCode(value);
    setEmptyCode(false);
  };

  if (
    errorBouquets ||
    errorCount ||
    errorDeleteC ||
    errorAddProduct ||
    errorChangePrices ||
    errorChangeBouquets
  ) {
    console.log(
      errorBouquets
        ? errorBouquets
        : errorCount
        ? errorCount
        : errorDeleteC
        ? errorDeleteC
        : errorAddProduct
        ? errorAddProduct
        : errorChangePrices
        ? errorChangePrices
        : errorChangeBouquets
    );
    showError("Помилка. Перезагрузіть сторінку!");
    return;
  }

  return (
    <>
      {addModalShowed && (
        <AddBouquetModal
          isShow={addModalShowed}
          setShow={setAddModalShowed}
          addMutation={(args) =>
            addProduct({
              variables: args,
            })
          }
        />
      )}
      {changePricesShowed && (
        <ChangeManyPricesModal
          isShow={changePricesShowed}
          setShow={setChangePricesShowed}
          addMutation={(args) =>
            changePrices({
              variables: args,
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
            <SearchInput externalClb={handleCodeSearch} emptify={emptyCode} />
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <Button
              className={s.btnRight}
              variant="success"
              onClick={() => setAddModalShowed(true)}
            >
              <i className="bi bi-plus-circle"></i> Додати продукт
            </Button>
          </Col>
        </Row>
        <Row className={cs([s.rowFilters, s.bottomFilterInput])}>
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          ></Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <Button
              className={s.btnRight}
              onClick={() => setChangePricesShowed(true)}
            >
              Змінити багато цін
            </Button>
          </Col>
        </Row>
      </Row>
      {loadingBouquets ||
      loadingCount ||
      loadingDeleteC ||
      loadingAddProduct ||
      loadingChangePrices ||
      loadingChangeBouquets ||
      networkStatusBouquets === NetworkStatus.refetch ||
      networkStatusCount === NetworkStatus.refetch ? (
        <Loading />
      ) : (
        <>
          {dataBouquets?.bouquets && dataBouquets?.bouquets?.length > 0 ? (
            <>
              <Row className={s.catalog}>
                {dataBouquets?.bouquets?.map((item) => (
                  <CardBouquet
                    key={item?.id}
                    photo={item?.image!}
                    name={item?.name!}
                    subName={item?.subname!}
                    price={item?.price!}
                    code={item?.code!}
                    id={item?.id!}
                    measure={"$"}
                    description={item?.description!}
                    deleteCard={() => {
                      deleteCard({
                        variables: { id: item?.id! },
                      });
                      showSuccess("Букет успішно видалений");
                    }}
                    addMutation={(args) =>
                      changeBouquets({
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
                allCount={dataCount?.allBouquets!}
              />
            </>
          ) : (
            <div className={s.empty}>Немає таких букетів</div>
          )}
        </>
      )}
    </>
  );
};

export default BouquetsPage;
