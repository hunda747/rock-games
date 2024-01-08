import { useContext, useEffect, useState } from "react";
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
  CircularProgress,
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
import EditShopOwner from "../../dialogBoxs/EditShopOwner";
import EditShop from "../../dialogBoxs/shop/EditShop";
import ChangeOwnerPassword from "../../dialogBoxs/ChangeOwnerPassword";
import AddShop from "../../dialogBoxs/shop/AddShop";
import AddShopOwner from "../../dialogBoxs/AddShopOwner";
// mock
import USERLIST from "../../_mock/user";
import OWNERLIST from '../../_mock/shopOwner.json';
import { getShopOwners } from "../../data/fetchShopOwner";
import { CampaignContext } from "../../layouts/dashboard/DashboardLayout";

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
      (_user) => _user?.name?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
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
  const [openPasswordId, setOpenPasswordId] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditData, setOpenEditData] = useState({});

  const { data, dispatch } = useContext(CampaignContext);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(false);
  const [owner, setOwner] = useState([]);

  const handleOpenPassword = (id) => {
    setOpenPasswordId(id);
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
  const handleFetchData = () => {
    getShopOwners(owner, setOwner, dispatch, setLoader);

  }
  useEffect(() => {
    handleFetchData();
  }, []);


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
      const newSelecteds = owner.map((n) => n.name);
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
      id: row.id,
      name: row.name,
      username: row.username,
      status: row.status
    })
    setOpenEdit(true);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - owner.length) : 0;

  const filteredUsers = applySortFilter(
    owner,
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
                  rowCount={owner.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {
                    loader ? (<div style={{ height: '50px' }}><CircularProgress /></div>) :
                      filteredUsers && filteredUsers
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const {
                            id,
                            name,
                            username,
                            status,
                          } = row;

                          return (
                            <TableRow
                              hover
                              key={id}
                            // tabIndex={-1}
                            // role="checkbox"
                            // selected={selectedUser}
                            >
                              <TableCell>
                                {(index + 1)}
                              </TableCell>

                              <TableCell component="th" scope="row" padding="none">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{username}</TableCell>

                              <TableCell align="left">
                                <Label
                                  color={
                                    (status && "success") || "error"
                                  }
                                >
                                  {/* {status} */}
                                  {sentenceCase(status ? 'active' : 'inactive')}
                                </Label>
                              </TableCell>

                              <TableCell align="left">
                                <Grid container spacing={3} row rowGap={3}>
                                  <Grid item xs={6}>
                                    <Button variant="outlined" color="primary" fullWidth startIcon={<Https />} onClick={() => handleOpenPassword(id)}>change password</Button>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Button variant="outlined" color="secondary" fullWidth startIcon={<Edit />} onClick={() => handleEdit(row)}>edit</Button>
                                  </Grid>
                                  {/* <Grid item xs={4}>
                                    {'status' === "active" ? (
                                      <Button variant="contained" color="error" fullWidth startIcon={<NotificationsOff />}>diactivate</Button>
                                    ) : (
                                      <Button variant="contained" color="success" fullWidth startIcon={<Notifications />}>activate</Button>
                                    )}
                                  </Grid> */}
                                </Grid>
                              </TableCell>
                            </TableRow>
                          );
                        })
                  }
                  {(filteredUsers.length <= 0 && !loader) && (
                    <TableRow
                      style={{
                        height: '40px',
                      }}
                    >
                      <TableCell
                        colSpan={8}
                        align="center"
                        style={{
                          height: "paddingHeight",
                          padding: "40px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        No Shop owner Found
                      </TableCell>
                    </TableRow>
                  )}
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
            count={owner.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <AddShopOwner open={open} setOpen={setOpen} handleFetchData={handleFetchData} />
      {openPassword && <ChangeOwnerPassword open={openPassword} setOpen={setOpenPassword} id={openPasswordId} />}
      {
        openEdit && <EditShopOwner open={openEdit} setOpen={setOpenEdit} editItem={openEditData} handleFetchData={handleFetchData} />
      }
    </>
  );
};
