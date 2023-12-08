import { useState } from "react";
import {
  Button, Container, Grid, Typography, useTheme, Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { Edit, Https, Notifications, NotificationsOff } from "@mui/icons-material";
// components
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import Iconify from "../../components/iconify";
import { AppWidgetSummary } from "../../sections/@dashboard/app";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import AddShopOwner from "../../dialogBoxs/AddShopOwner";
import EditShopOwner from "../../dialogBoxs/EditShopOwner";
import ChangeOwnerPassword from "../../dialogBoxs/ChangeOwnerPassword";
// mock
import USERLIST from "../../_mock/user";
import OWNERLIST from '../../_mock/shopOwner.json';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user?.fname.toLowerCase().indexOf(query?.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const TABLE_HEAD = [
  // { id: "id", label: "Id", alignRight: false },
  { id: "fname", label: "Full name", alignRight: false },
  { id: "username", label: "Username", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  // { id: "isVerified", label: "Action", alignRight: false },
  // { id: "isVerifieffd", label: "Verified", alignRight: false },
  // { id: "status", label: "Status", alignRight: false },
  { id: "", label: "Action", alignRight: false },
];

export default function ManageShopOwner(params) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditData, setOpenEditData] = useState({});

  const handleOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleOpen = () => {
    console.log('handle');
    setOpen(true);
  };

  const handleOpenEdit = () => {
    console.log('handle');
    setOpenEdit(true);
  };

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = OWNERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEdit = (row) => {
    console.log('row', row);
    setOpenEditData({
      fname: row.fname,
      lastName: row.lname,
      username: row.username,
    })
    setOpenEdit(true);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OWNERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    OWNERLIST,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Manage Shop Owners
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"
          />} onClick={handleOpen}>
            New Shop Owner
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={OWNERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        id,
                        fname,
                        lname,
                        username,
                        status,
                      } = row;
                      const selectedUser = selected.indexOf(fname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                        // tabIndex={-1}
                        // role="checkbox"
                        // selected={selectedUser}
                        >
                          {/* <TableCell padding="checkbox">{ }
                          </TableCell> */}
                          <TableCell>
                            {id}
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {fname} {lname}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{username}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === "inactive" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            {/* <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton> */}
                            <Grid container spacing={3} row rowGap={3}>
                              <Grid item xs={5}>
                                <Button variant="outlined" color="primary" fullWidth startIcon={<Https />} onClick={handleOpenPassword}>change password</Button>
                              </Grid>
                              <Grid item xs={3}>
                                <Button variant="outlined" color="secondary" fullWidth startIcon={<Edit />} onClick={() => handleEdit(row)}>edit</Button>
                              </Grid>
                              <Grid item xs={4}>
                                {status === "active" ? (
                                  <Button variant="contained" color="error" fullWidth startIcon={<NotificationsOff />}>diactivate</Button>
                                ) : (
                                  <Button variant="contained" color="success" fullWidth startIcon={<Notifications />}>activate</Button>
                                )}
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={OWNERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <AddShopOwner open={open} setOpen={setOpen} />
      {openPassword && <ChangeOwnerPassword open={openPassword} setOpen={setOpenPassword} />}
      {
        openEdit && <EditShopOwner open={openEdit} setOpen={setOpenEdit} editItem={openEditData} />
      }
    </>
  );
};
