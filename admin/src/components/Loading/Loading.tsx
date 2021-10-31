import s from './Loading.module.css';
import loading from '../../assets/loading.gif';

const Loading = () => {
    return(
        <div className={s.wrapper}>
            <img className={s.img} src={loading}></img>
        </div>
    )
};

export default Loading;