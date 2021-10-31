import type { GetServerSideProps, NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import RangeInput from "../../components/RangeInput/RangeInput";
import {
  useAllBouquetsQuery,
  useBouquetsQuery,
  useMaxBouquetPriceQuery,
} from "../../store/generated/graphql";
import { useEffect, useState, useCallback } from "react";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";
import { showError } from "../../utils/showError";
import s from "../../styles/BouqCatalog.module.css";
import { useSynchronizeUrl } from "../../hooks/useSynchronizeUrl";

interface BouqCatalogPropsType {
  priceQuery: string | null;
  pageQuery: string | null;
}

const BouqCatalog: ({
  priceQuery,
  pageQuery,
}: React.PropsWithChildren<BouqCatalogPropsType>) => void | JSX.Element = ({
  priceQuery,
  pageQuery,
}) => {
  const TAKE = 15;
  const PRICE_STEP = 50;

  const params =
    typeof window != "undefined"
      ? new URLSearchParams(window.location.search)
      : undefined;

  const [page, setPage] = useState(Number(pageQuery) ? Number(pageQuery) : 1);
  const [price, setPrice] = useState<number | undefined>(
    Number(priceQuery) ? Number(priceQuery) : undefined
  );

  const router = useRouter();

  useSynchronizeUrl(params!, [
    { value: page, queryName: "page" },
    { value: price, queryName: "price" },
  ]);

  const {
    loading: loadingBouquets,
    error: errorBouquets,
    data: dataBouquets,
    fetchMore: fetchMoreBouquets,
    networkStatus: networkStatusBouquets,
  } = useBouquetsQuery({
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
      price: price,
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
      price: price,
    },
  });

  const {
    loading: loadingMaxPrice,
    error: errorMaxPrice,
    data: dataMaxPrice,
  } = useMaxBouquetPriceQuery();

  useEffect(() => {
    fetchMoreBouquets({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
        price: price,
      },
    });
  }, [page, price]);

  const handlePrice = useCallback(
    (price: number) => {
      fetchMoreCount({
        variables: {
          price: price,
        },
      });
      setPrice(price);
      setPage(1);
    },
    [price]
  );

  if (errorBouquets || errorCount || errorMaxPrice) {
    console.log(
      errorBouquets ? errorBouquets : errorCount ? errorCount : errorMaxPrice
    );
    return showError("Error. Please, reload the page");
  }

  const maxPrice =
    dataMaxPrice &&
    (dataMaxPrice?.maxBouquetPrice! % PRICE_STEP === 0
      ? dataMaxPrice.maxBouquetPrice
      : dataMaxPrice?.maxBouquetPrice! +
        (PRICE_STEP - (dataMaxPrice?.maxBouquetPrice! % PRICE_STEP)));

  return (
    <NavBar title="Bouquets">
      <ContentLayout>
        {networkStatusBouquets === NetworkStatus.fetchMore ||
        networkStatusCount === NetworkStatus.fetchMore ? (
          <Loading />
        ) : (
          <>
            <Row style={{ height: "60px" }}>
              <Col
                className="d-flex justify-content-center align-items-center"
                lg={4}
                xs={12}
              ></Col>
              <Col
                className="d-flex justify-content-center align-items-center"
                lg={4}
                xs={12}
              >
                {dataMaxPrice && (
                  <RangeInput
                    title="Max. price"
                    min={PRICE_STEP}
                    max={maxPrice!}
                    step={PRICE_STEP}
                    start={price ? price : maxPrice!}
                    externalClb={handlePrice}
                  />
                )}
              </Col>
              <Col
                className="d-flex justify-content-center align-items-center"
                lg={4}
                xs={12}
              ></Col>
            </Row>
            <Row>
              {dataCount === undefined ? (
                <Loading />
              ) : dataCount && dataCount.allBouquets > 0 ? (
                dataBouquets?.bouquets?.map((item) => (
                  <CardComponent
                    key={item?.id}
                    name={item?.name!}
                    subName={item?.subname!}
                    price={item?.price!}
                    code={item?.code!}
                    id={item?.id!}
                    photo={item?.image!}
                    measure={"$"}
                    link={router.pathname}
                    description={item?.description!}
                    basketStatus={item?.basketStatus!}
                  />
                ))
              ) : (
                <div className={s.emptyData}>There are no such bouquets</div>
              )}
            </Row>
            <PaginationFC
              page={page}
              setPage={setPage}
              pageSize={TAKE}
              allCount={dataCount?.allBouquets!}
            />
          </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const priceQuery = query.price ? query.price : null;
  const pageQuery = query.page ? query.page : null;
  return {
    props: {
      priceQuery,
      pageQuery,
    },
  };
};

export default BouqCatalog;
