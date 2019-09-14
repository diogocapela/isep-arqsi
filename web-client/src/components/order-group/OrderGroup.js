import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import OrderItem from 'components/order-item';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const OrderGroup = props => {
  const { items = [], endpoint, cancelAction } = props;

  const classes = useStyles();

  if (items.length === 0) {
    return <p>No items were found...</p>;
  }

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {items.map((item, i) => {
        return <OrderItem key={i} item={item} endpoint={endpoint} cancelAction={cancelAction} />;
      })}
    </List>
  );
};

OrderGroup.propTypes = {
  items: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
  cancelAction: PropTypes.func.isRequired,
};

export default OrderGroup;
