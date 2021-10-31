import s from "./AlertComponent.module.css";
import Alert from "react-bootstrap/Alert";
import { useGetErrorStatus } from "../../../hooks/useGetErrorStatus";
import { useGetSuccessStatus } from "../../../hooks/useGetSuccessStatus";

interface ErrorProps {}

const AlertComponent: React.FC<ErrorProps> = ({ children }) => {
  const error = useGetErrorStatus();
  const success = useGetSuccessStatus();

  return (
    <>
      {error && (
        <Alert variant="danger" className={s.alertError}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className={s.alertSuccess}>
          {success}
        </Alert>
      )}
      {children}
    </>
  );
};

export default AlertComponent;
