import s from './Container.module.css';

const Container: React.FC = ( {children} ) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}

export default Container;