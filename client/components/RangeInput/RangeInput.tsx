import { ChangeEvent, memo, MouseEvent, useState } from "react";
import s from "./RangeInput.module.css";

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  title: string;
  start: number;
  externalClb?: (arg: number) => void;
}

interface MouseEventExt extends MouseEvent<HTMLInputElement> {
  target: EventTarget & HTMLInputElement;
}

function RangeInput({ min, max, step, title, start, externalClb}: RangeInputProps){
    const [price, setPrice] = useState(start);
    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(e.target.value));
    };

    const handleMouseUp = (e: MouseEventExt) => {
      externalClb && externalClb(Number(e.target.value));
    };

    return (
      <div className={s.wrapper}>
        <label htmlFor="range" className="me-1">
          {title}
        </label>
        <input
          type="range"
          style={{ cursor: "pointer" }}
          id="range"
          min={min}
          max={max}
          step={step}
          value={price}
          onChange={handlePrice}
          onMouseUp={handleMouseUp}
        />
        <div className="ms-1">0 - {price} грн.</div>
      </div>
    );
  };

export default RangeInput;
