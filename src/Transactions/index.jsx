import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useStyles, StyledTableRow, StyledTableCell } from './styles';
import axios from 'axios';
import map from 'lodash/map';

const baseUrl = 'http://localhost:5000/api';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const Transactions = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('select');
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [totalRewardsPoints, setTotalRewardsPoints] = useState(0);

  const calculateRewardPoints = (transaction) => {
    let { amount } = transaction,
      rewardPoints = 0;

    if (amount > 50) {
      rewardPoints += amount < 100 ? amount - 50 : 50;
    }

    if (amount > 100) {
      rewardPoints += (amount - 100) * 2;
    }

    return {
      ...transaction,
      rewardPoints,
    };
  };

  const fetchUsers = () => {
    axios.get(`${baseUrl}/users`).then(({ data: { users } }) => {
      setUsers(users);
      setSelectedUser(users[0].id);
    });
  };

  const fetchTransactions = () => {
    axios
      .get(`${baseUrl}/transactions/${selectedUser}`)
      .then(({ data: { transactions } }) => {
        const monthlyTotals = {};
        let totalRewardsPoints = 0;
        const transactionsWithRewardPoints = map(transactions, (transaction) =>
          calculateRewardPoints(transaction),
        );
        map(transactionsWithRewardPoints, (transaction) => {
          const month = new Date(transaction.transactionDate).getMonth();
          monthlyTotals[month] = monthlyTotals[month] || 0;
          monthlyTotals[month] += transaction.rewardPoints;
          totalRewardsPoints += transaction.rewardPoints;
        });
        setTransactions(transactionsWithRewardPoints);
        setMonthlyTotals(monthlyTotals);
        setTotalRewardsPoints(totalRewardsPoints);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid className={classes.root}>
      <Grid item sm={12} className={classes.grid}>
        <Select
          value={selectedUser}
          onChange={({ target: { value } }) => {
            setSelectedUser(value);
          }}
        >
          {map(users, ({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button sm={6} color="primary" onClick={fetchTransactions}>
          {' '}
          Click to fetch the details of user{' '}
        </Button>
      </Grid>

      <Grid item sm={12} className={classes.grid}>
        <Typography>Total Reward Points: {totalRewardsPoints}</Typography>
      </Grid>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Transaction Date</TableCell>
              <TableCell align="right">Reward Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(transactions, (transaction, i) => (
              <StyledTableRow key={`${transaction.id}_${i}`}>
                <StyledTableCell component="th" scope="row">
                  {' '}
                  {transaction.name}{' '}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {transaction.amount}{' '}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {transaction.transactionDate}{' '}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {transaction.rewardPoints}{' '}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Reward Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(monthlyTotals, (points, month) => (
              <StyledTableRow key={`${month}`}>
                <StyledTableCell align="center" component="th" scope="row">
                  {' '}
                  {months[month]}{' '}
                </StyledTableCell>
                <StyledTableCell align="center">{points} </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Transactions;
