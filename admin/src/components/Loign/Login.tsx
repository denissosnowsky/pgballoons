import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import s from "./Login.module.css";
import logo from '../../assets/logo.png';

interface LoginPropsType {
  password: string | number;
  setPassword: (arg: string | number) => void;
}

const Login: React.FC<LoginPropsType> = ({ password, setPassword }) => {
  return (
    <Row style={{height: '100vh', width: '100vw'}} className='d-flex align-items-center'>
      <Col xs={{span: 4, offset: 4}}>
        <img className={s.img} src={logo}></img>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
