import s from './Loading.module.css';

const Loading = () => {
    return(
        <div className={s.wrapper}>
            <img className={s.img} src={'/loading.gif'}></img>
        </div>
    )
};

export default Loading;