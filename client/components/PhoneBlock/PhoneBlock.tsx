import { formatNumber } from "../../utils/formatNumber";
import s from './PhoneBlock.module.css';

interface PhoneBlockProps {
    fontSize?: string;
    margin?: string;
    number: string
}

const PhoneBlock: React.FC<PhoneBlockProps> = ( {fontSize, number, margin}) => {
  return (
    <div style={{ width: "fit-content", fontSize: fontSize, margin: margin }} className={s.phone}>
      <a href={`tel:${number}`}>{formatNumber(number)}</a>
    </div>
  );
};

export default PhoneBlock;
