import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ListItem from 'components/list-item';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListGroup = props => {
  const { items = [], endpoint, deleteAction } = props;

  const classes = useStyles();

  if (items.length === 0) {
    return <p>No items were found...</p>;
  }

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {items.map((item, i) => {
        return <ListItem key={i} item={item} endpoint={endpoint} deleteAction={deleteAction} />;
      })}
    </List>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
  deleteAction: PropTypes.func.isRequired,
};

export default ListGroup;
