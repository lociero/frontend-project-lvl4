import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Image, FloatingLabel, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import slackLogo from '../imgs/login_img.jpeg';

import { useAuth } from '../contexts/auth';
import api from '../routes.js';

const schema = yup.object().shape({
  username: yup.string()
    .min(4, 'Слишком короткий ник!')
    .max(24, 'Слишком длинный ник!')
    .required('Обязательное поле для заполнения'),
  password: yup.string()
    .min(4, 'Слишком короткий пароль!')
    .max(256, 'Слишком длинный пароль!')
    .required('Обязательное поле для заполнения'),
});

const Login = () => {
  const { updateToken } = useAuth();
  const [isAuthSuccess, updateAuthSuccess] = useState(false);
  const [error, updateError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/');
    }
  }, [isAuthSuccess]);

  const signIn = async ({ username, password }) => {
    const payload = { username, password };
    const { token: authToken, error: authError } = await axios
      .post(api.signInPath(), payload)
      .then((res) => res.data)
      .catch((res) => res.response.data);
    updateToken(authToken);
    if (!authError) {
      updateAuthSuccess((prev) => !prev);
    } else {
      updateError(authError);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: signIn,
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
                  <Form onSubmit={formik.handleSubmit} noValidate>
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
                        isInvalid={!!error}
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
                        isInvalid={!!error}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>Неверное имя пользователя или пароль!</Form.Control.Feedback>
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
