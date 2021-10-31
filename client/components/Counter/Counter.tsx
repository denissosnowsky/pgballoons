import { Maybe } from "graphql/jsutils/Maybe";
import { memo, useEffect, useState } from "react";
import s from './Counter.module.css';
import cs from 'classnames';

interface CounterProps {
  minValue: number;
  start?: number | undefined | Maybe<number> ;
  clb?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ clb, minValue, start }) => {
  const [count, setCount] = useState<number>(start ? start : minValue);

  useEffect(() => {
    clb && clb(count);
  }, []);

  const handlePlus = () => {
    setCount((count) => count + 1);
    clb && clb(count + 1);
  };

  const handleMinus = () => {
    setCount((count) => (count > minValue ? count - 1 : count));
    clb && clb(count > minValue ? count - 1 : count);
  };

  return (
    <div className={cs([s.wrapper], "counter", "w-50", "d-flex", "justify-content-center")}>
      <i className="bi bi-dash px-2" onClick={handleMinus}></i>
      <span>{count}</span>
      <i className="bi bi-plus px-2" onClick={handlePlus}></i>
    </div>
  );
};

export default memo(Counter);
