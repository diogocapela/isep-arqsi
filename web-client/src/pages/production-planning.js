import React, { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import styled from '@emotion/styled';

import { useAuth } from 'redux/redux-auth';
import { useOrders } from 'redux/redux-orders';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import PageTitle from 'components/page-title';

const Span = styled.span`
  word-break: break-all;
`;

const config = {
  apiKey: 'AIzaSyCwaUNlvAk6WlNqUwfXBnJbkhzgSCLh6WE',
  authDomain: 'lapr5-cacete.firebaseapp.com',
  databaseURL: 'https://lapr5-cacete.firebaseio.com',
  projectId: 'lapr5-cacete',
  storageBucket: 'lapr5-cacete.appspot.com',
  messagingSenderId: '821984935420',
  appId: '1:821984935420:web:0890c3bc843eff3a60c679',
};

function ProductionPlanning() {
  const { profile } = useAuth();
  const { orders, loadOrders } = useOrders();

  const [ordersPlanned, setOrdersPlanned] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    firebase.initializeApp(config);

    firebase
      .database()
      .ref('/')
      .on('value', function(snapshot) {
        setHistory(snapshot.val());
      });
  }, []);

  console.log(history);

  useEffect(() => {
    loadOrders();
  }, [loadOrders, profile]);

  const handleClick = (e, order) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setOrdersPlanned([
        ...ordersPlanned,
        {
          _id: order._id,
          cliente: order.createdBy._id,
          prioridade: order.createdBy.priority || 3,
          encomenda: order.products.map(o => ({
            produto: o._id,
            qnt: o.quantity,
            deadline: 80,
          })),
        },
      ]);
    } else {
      setOrdersPlanned(ordersPlanned.filter(op => op._id !== order._id));
    }
  };

  const handleSubmit = async () => {
    firebase
      .database()
      .ref('/')
      .push(ordersPlanned);

    const res = await axios({
      method: 'post',
      url: 'http://pp-prod.northeurope.cloudapp.azure.com:8080/api/submete_encomendas',
      data: ordersPlanned,
    });
  };

  const handleResend = data => {
    axios({
      method: 'post',
      url: 'http://pp-prod.northeurope.cloudapp.azure.com:8080/api/submete_encomendas',
      data: data,
    });
  };

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Production Planning" />
        {orders.map(order => (
          <div>
            <Checkbox onClick={e => handleClick(e, order)} />
            {order._id} ({order.createdBy.email}) - {order.status}
          </div>
        ))}
        <br />
        <Button onClick={handleSubmit}>Send Production Planning</Button>
        <br />
        <br />
        <h3>History</h3>
        {Object.values(history).map(x => (
          <>
            <Span>{JSON.stringify(x)}</Span>
            <br />
            <button onClick={() => handleResend(x)}>Resend</button>
            <br />
            <br />
          </>
        ))}
      </Container>
    </MainLayout>
  );
}

export default ProductionPlanning;
