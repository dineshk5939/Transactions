import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    background: '#f5f5f5',
    height: '100vh',
  },
  grid: {
    margin: '20px 0',
  },
  tableContainer: {
    margin: '20px 0',
    boxShadow: '1px 2px 7px 2px rgba(0,0,0,0.2)',
  },
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export { useStyles, StyledTableCell, StyledTableRow };
