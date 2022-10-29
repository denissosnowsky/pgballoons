import { useMemo } from "react";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounter from "../components/ListWithCounter/ListWithCounter";
import Loading from "../components/Loading/Loading";
import { useAssortmentQuery } from "../store/generated/graphql";
import { arrayConvertor } from "../utils/arrayConvertor";
import { showError } from "../utils/showError";

const Calculator: () => void | JSX.Element = () => {
  const { loading, error, data } = useAssortmentQuery();


  if (error) {
    console.log(error);
    return showError("Помилка. Будь ласка, перезагрузіть сторінку");
  }

  return (
    <NavBar title="Калькулятор">
      <ContentLayout>
        {data === undefined ? (
          <Loading />
        ) : (
          <ListWithCounter measure={"грн."} data={arrayConvertor(data.assortment)} />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Calculator;
