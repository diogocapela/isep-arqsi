import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

import { useUsers } from 'redux/redux-users';
import { useAuth } from 'redux/redux-auth';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(email, name, role, acceptMarketing, createdAt) {
  return { email, name, role, acceptMarketing, createdAt };
}

export default () => {
  const classes = useStyles();
  const { loadUsers, users } = useUsers();
  const { isAdmin } = useAuth();

  useEffect(() => {
    isAdmin && loadUsers();
  }, [isAdmin, loadUsers]);

  console.log(users);

  const rows = Object.values(users).map(user =>
    createData(
      user.email,
      user.firstName,
      user.role,
      get(user, 'settings.acceptMarketing', false),
      user.createdAt
    )
  );

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Users" />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Accepts Marketing</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                console.log(row);
                return (
                  <TableRow key={row.email}>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{startCase(row.role)}</TableCell>
                    <TableCell>{startCase(row.acceptMarketing.toString())}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainLayout>
  );
};
