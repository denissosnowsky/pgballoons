import { Button } from "react-bootstrap";
import { showError } from "../../utils/showError";
import s from "./ErrorPage.module.css";

interface ErrorPagePropsType {

};

const ErrorPage: React.FC<ErrorPagePropsType> = () => {
    return(
        <>
        <div className={s.errorMsg}>Not Found | 404</div>
        </>
    )
};

export default ErrorPage;