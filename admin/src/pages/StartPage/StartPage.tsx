import s from "./StartPage.module.css";
import logo from "../../assets/logo.png";

interface StartPagePropsType {

};

const StartPage: React.FC<StartPagePropsType> = () => {
    return(
        <div className={s.wrapper}>
            <img src={logo}></img>
        </div>
    )
};

export default StartPage;