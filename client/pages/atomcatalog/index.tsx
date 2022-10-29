import type { GetServerSideProps, NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import DropdownBtn from "../../components/DropdownBtn/DropdownBtn";
import DropdownBtnWithColor from "../../components/DropdownBtnWithColor/DropdownBtnWithColor";
import { useCallback, useEffect, useMemo, useState } from "react";
import RangeInput from "../../components/RangeInput/RangeInput";
import {
  useAllBalloonsQuery,
  useBalloonsQuery,
  useCategoriesQuery,
  useColorsQuery,
  useMaxBalloonPriceQuery,
} from "../../store/generated/graphql";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";
import { showError } from "../../utils/showError";
import s from "../../styles/AtomCatalog.module.css";
import { useSynchronizeUrl } from "../../hooks/useSynchronizeUrl";

interface AtomCatalogPropsType {
  priceQuery: string | null;
  categoryQuery: string | null;
  colorQuery: string | null;
  pageQuery: string | null;
}

const AtomCatalog: ({
  priceQuery,
  categoryQuery,
  colorQuery,
  pageQuery,
}: React.PropsWithChildren<AtomCatalogPropsType>) => void | JSX.Element = ({
  priceQuery,
  categoryQuery,
  colorQuery,
  pageQuery,
}) => {
  const TAKE = 15;
  const PRICE_STEP = 10;

  const params =
    typeof window != "undefined"
      ? new URLSearchParams(window.location.search)
      : undefined;

  const router = useRouter();

  const [page, setPage] = useState(Number(pageQuery) ? Number(pageQuery) : 1);
  const [price, setPrice] = useState<number | undefined>(
    Number(priceQuery) ? Number(priceQuery) : undefined
  );
  const [category, setCategory] = useState<string | undefined>(
    categoryQuery ? categoryQuery : undefined
  );
  const [color, setColor] = useState<string | undefined>(
    colorQuery ? colorQuery : undefined
  );

  useSynchronizeUrl(params!, [
    { value: page, queryName: "page" },
    { value: category, queryName: "category" },
    { value: price, queryName: "price" },
    { value: color, queryName: "color" },
  ]);

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
      price: price,
      categoryId: category,
      colorId: color,
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
      price: price,
      categoryId: category,
      colorId: color,
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

  const {
    loading: loadingMaxPrice,
    error: errorMaxPrice,
    data: dataMaxPrice,
  } = useMaxBalloonPriceQuery();

  const categoryInitName = useMemo(() => {
    return dataCategory?.categories?.find((o) => o?.id === category)?.name
      ? dataCategory?.categories?.find((o) => o?.id === category)?.name
      : "Категорії | Всі";
  }, []);

  const colorInitName = useMemo(() => {
    return dataColor?.colors?.find((o) => o?.id === color)?.name
      ? dataColor?.colors?.find((o) => o?.id === color)?.name
      : "Кольори | Всі";
  }, []);

  useEffect(() => {
    fetchMore({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
        price: price,
        categoryId: category,
        colorId: color,
      },
    });
  }, [page, price, category, color]);

  useEffect(() => {
    fetchMoreColors({
      variables: {
        categoryId: category,
      },
    });
  }, [category]);

  const handleFilter = useCallback(
    (type: "RANGE" | "CATEGORY" | "COLOR") =>
      (filter: number | string | undefined) => {
        fetchMoreCount({
          variables: {
            price: type === "RANGE" ? filter : price,
            categoryId: type === "CATEGORY" ? filter : category,
            colorId: type === "COLOR" ? filter : color,
          },
        });
        setPage(1);
        type === "RANGE" && setPrice(filter as number);
        type === "CATEGORY" && setCategory(filter as string);
        type === "COLOR" && setColor(filter as string);
      },
    []
  );

  if (
    errorBalloons ||
    errorCount ||
    errorCategory ||
    errorColor ||
    errorMaxPrice
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
        : errorMaxPrice
    );
    return showError("Помилка. Будь ласка, перезагрузіть сторінку");
  }

  const maxPrice =
    dataMaxPrice &&
    (dataMaxPrice?.maxBalloonPrice! % PRICE_STEP === 0
      ? dataMaxPrice.maxBalloonPrice
      : dataMaxPrice?.maxBalloonPrice! +
        (PRICE_STEP - (dataMaxPrice?.maxBalloonPrice! % PRICE_STEP)));

  return (
    <NavBar title="Скласти букет">
      <ContentLayout>
        <>
          <Row>
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={4}
              xs={12}
            >
              <DropdownBtn
                title={categoryInitName!}
                items={dataCategory?.categories!}
                externalClb={handleFilter("CATEGORY")}
              />
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={4}
              xs={12}
            >
              {dataMaxPrice && (
                <RangeInput
                  title="Макс. ціна"
                  min={PRICE_STEP}
                  max={maxPrice!}
                  step={PRICE_STEP}
                  start={price ? price : maxPrice!}
                  externalClb={handleFilter("RANGE")}
                />
              )}
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={4}
              xs={12}
            >
              <DropdownBtnWithColor
                title={colorInitName!}
                items={dataColor?.colors}
                externalClb={handleFilter("COLOR")}
              />
            </Col>
          </Row>
          {networkStatusBalloons === NetworkStatus.fetchMore ||
          networkStatusCount === NetworkStatus.fetchMore ? (
            <Loading />
          ) : (
            <>
              <Row>
                {dataCount === undefined ? (
                  <Loading />
                ) : dataCount && dataCount.allBalloons > 0 ? (
                  dataBalloons?.balloons?.map((item) => (
                    <CardComponent
                      key={item?.id}
                      name={item?.name!}
                      subName={item?.subname!}
                      price={item?.price!}
                      code={item?.code!}
                      id={item?.id!}
                      photo={item?.image!}
                      measure={"грн."}
                      link={router.pathname}
                      description={item?.description!}
                      basketStatus={item?.basketStatus!}
                    />
                  ))
                ) : (
                  <div className={s.emptyData}>Немає таких кульок</div>
                )}
              </Row>
              <PaginationFC
                page={page}
                setPage={setPage}
                pageSize={TAKE}
                allCount={dataCount?.allBalloons!}
              />
            </>
          )}
        </>
      </ContentLayout>
    </NavBar>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const priceQuery = query.price ? query.price : null;
  const categoryQuery = query.category ? query.category : null;
  const colorQuery = query.color ? query.color : null;
  const pageQuery = query.page ? query.page : null;
  return {
    props: {
      priceQuery,
      categoryQuery,
      colorQuery,
      pageQuery,
    },
  };
};

export default AtomCatalog;
