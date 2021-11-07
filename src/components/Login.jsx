import React from 'react';
import {
  Container, Row, Col, Card, Image, FloatingLabel, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import slackLogo from '../imgs/login_img.jpeg';

const schema = yup.object().shape({
  username: yup.string()
    .min(4, 'Слишком короткий ник!')
    .max(24, 'Слишком длинный ник!')
    .required('Обязательное поле для заполнения'),
  password: yup.string()
    .min(6, 'Слишком короткий пароль!')
    .max(256, 'Слишком длинный пароль!')
    .required('Обязательное поле для заполнения'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="10">
          <Card className="text-center shadow-sm m-2">
            <Card.Body className="p-5">
              <Row>
                <Col xs={12} md={6} className="d-flex justify-content-center align-content-center p-5">
                  <Image src={slackLogo} roundedCircle />
                </Col>
                <Col xs={12} md={6}>
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="mb-4">Войти</h1>
                    <FloatingLabel
                      controlId="username"
                      label="Ваш ник"
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        type="text"
                        required
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        autoComplete="off"
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label="Пароль" className="mb-4">
                      <Form.Control
                        name="password"
                        type="password"
                        required
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </FloatingLabel>
                    <Button className="w-100" variant="outline-primary" size="lg" type="submit">
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">Нет аккаунта? Регистрация</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
