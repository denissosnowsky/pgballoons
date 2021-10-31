import { useRouter } from "next/router";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import Product from "../../components/Product/Product";
import { useBalloonQuery } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";


const BouqItem: () => void | JSX.Element = () => {
  const router = useRouter();

  const { loading, error, data } = useBalloonQuery({
    ssr: false,
    variables: {
      id: router.query.id! as string,
    },
  });

  if (error) {
    console.log(error);
    return showError("Error. Please, reload the page"); 
  }

  const balloon = data?.balloon!;

  return (
    <NavBar title={"Balloons"}>
      <ContentLayout>
        {loading ? <Loading /> : (
          <Product
            title={balloon!.name}
            subTitle={balloon!.subname}
            desc={balloon!.description}
            code={balloon!.code}
            img={balloon!.image}
            price={balloon!.price}
            measure={"$"}
            id={balloon!.id}
            basketStatus={balloon!.basketStatus!}
          />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default BouqItem;
