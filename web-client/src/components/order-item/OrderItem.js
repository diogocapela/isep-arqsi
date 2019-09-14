import React, { div } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import MaterialListItem from '@material-ui/core/ListItem';
import MaterialListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import get from 'lodash/get';

import Link from 'components/link';

const FlexDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: block;
  flex-grow: 1;
  text-decoration: none;
  color: black;
  padding-right: 1rem;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const OrderItem = props => {
  const { item, endpoint, cancelAction } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FlexDiv>
        <StyledLink to={`${endpoint}/${item._id}`}>
          <MaterialListItem button>
            <MaterialListItemText
              primary={`${item._id}: ${get(item, 'createdBy.email')} (${item.status})`}
            />
          </MaterialListItem>
        </StyledLink>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
          onClick={handleClickOpen}
        >
          Cancel
        </Button>
      </FlexDiv>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to cancel the order <b>{item.name}</b> with id number <b>{item._id}</b>?
            <br />
            <br />
            <b>Details:</b>
            <br />
            {Object.keys(item).map((key, i) => (
              <div key={i}>
                {typeof item[key] !== 'object' && (
                  <span>
                    <b>{key}:</b> {item[key]}
                  </span>
                )}
                <br />
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button
            onClick={async () => {
              await cancelAction(item._id);
              handleClose();
              window.location.reload();
            }}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  endpoint: PropTypes.string.isRequired,
  cancelAction: PropTypes.func.isRequired,
};

export default OrderItem;
