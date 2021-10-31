import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import Product from "../../components/Product/Product";
import { useBouquetQuery } from "../../store/generated/graphql";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";
import { showError } from "../../utils/showError";


const BouqItem: () => void | JSX.Element = () => {
  const router = useRouter();

  const { loading, error, data } = useBouquetQuery({
    ssr: false,
    variables: {
      id: router.query.id! as string,
    },
  });

  if (error) {
    console.log(error);
    return showError("Error. Please, reload the page");
  }

  const bouquet = data && data?.bouquet;
console.log(data?.bouquet);
  return (
    <NavBar title={"Bouquets"}>
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
          <Product
            title={bouquet!.name}
            subTitle={bouquet!.subname}
            desc={bouquet!.description}
            code={bouquet!.code}
            img={bouquet!.image}
            price={bouquet!.price}
            measure={"$"}
            id={bouquet!.id}
            basketStatus={bouquet!.basketStatus!}
          />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default BouqItem;
