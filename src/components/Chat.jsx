import React, { useEffect } from 'react';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Nav,
  Row,
  Col,
  Card,
  InputGroup, FormControl,
  Button,
} from 'react-bootstrap';
import { fetchChatData, changeCurrentChannel } from '../store/chatSlice.js';
import { useAuth } from '../contexts/auth.js';
// import api from '../routes.js';

const Chat = () => {
  const { token } = useAuth();
  const channels = useSelector(({ chat }) => chat.channels);
  const currentChannelId = useSelector(({ chat }) => chat.currentChannelId);
  const dispatch = useDispatch();

  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  useEffect(() => {
    dispatch(fetchChatData(token));
  }, []);

  // channels:
  // [{"id":1,"name":"general","removable":false},{"id":2,"name":"random","removable":false}]

  return (
    <Container className="pt-5 h-100">
      <Row className="h-100 flex-nowrap">
        <Col sm={4} lg={2}>
          <Nav className="flex-column bg-light border rounded h-100">
            <Nav.Item className="p-2 mt-4 border-bottom"><strong>Каналы</strong></Nav.Item>
            {channels.map(({ name, id, removable }) => (
              removable ? <></> : (
                <Nav.Item key={id} className="w-100">
                  <Button
                    variant={currentChannelId === id ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => dispatch(changeCurrentChannel(id))}
                  >
                    {`# ${name}`}
                  </Button>
                </Nav.Item>
              )
            ))}
          </Nav>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Header className="bg-light">
              <strong>{`# ${currentChannel?.name}`}</strong>
              <br />
              <span className="text-muted">0 сообщений</span>
            </Card.Header>
            <Card.Body className="overflow-auto">
              <Card.Text>
                admin: message!!!
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-ligth">
              <InputGroup className="">
                <FormControl
                  placeholder="Напишите сообщение"
                  aria-label="Сообщение"
                  aria-describedby="basic-addon2"
                />
                <Button aria-label="Отправить" variant="outline-secondary">
                  Отправить
                </Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
