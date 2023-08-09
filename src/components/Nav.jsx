import { useState, useEffect, useContext } from "react";
import "../App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";
import Note from "./Note";
import Skeleton from "@mui/material/Skeleton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Edit, NotesRounded, SearchRounded } from "@mui/icons-material";
import ProfileMenu from "./ProfileMenu";
import { SnackText, LabelModal } from "../contexts/HomeContext";
import AddLabelModal from "./LabelModal";
<<<<<<< HEAD
import { LabelContext } from "../contexts/LabelContext";
=======
import { UserContext } from "../contexts/UserContext";
>>>>>>> a1233254e6073b7b920a62199ae00fead6473abd

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(5.5)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ClippedDrawer(props) {
  // const theme = useTheme();
  const [value, setValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
<<<<<<< HEAD
  const [user, setUser] = useState({ ...props.user });
  const { labels, setLabels } = useContext(LabelContext);
=======
  const [user, dispatchUser] = useContext(UserContext);
>>>>>>> a1233254e6073b7b920a62199ae00fead6473abd
  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);
  const { modalOpen, setModalOpen } = useContext(LabelModal);
  const { dispatchSnack } = useContext(SnackText);
  //   console.log(modalOpen, setModalOpen);
  const handleLabelModalOpen = () => setModalOpen(true);
  function deleteItem(event, itemIndex) {
    const itemToDelete = notes[itemIndex];
    console.log(itemToDelete._id);
    axios
      .delete(`http://localhost:8081/api/${itemToDelete._id}`)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          setNotes(notes.filter((item, index) => index !== itemIndex));
          dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
        }
        else {
          dispatchSnack({ type: "OPEN_ERROR_SNACK" });
        }
      });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNavChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setTimeout(() => {
      console.log(labels)
      setNotes(props.notes);
      setLoading(false);
    }, 1000);
    console.log(props);
  }, [props.notes]);

  useEffect(() => {
    setTimeout(() => {
      dispatchUser({ type: "SET_USER" })
      setUser({ ...user, ...props.user });
    }, 100);
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900PX)");
  const isLargeScreen = useMediaQuery("(min-width:1100px)");

  const cols = isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 5 : 3;

  return (
    <div>
      {!loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            style={{ backgroundColor: "#9BABB8" }}
          >
            <Toolbar style={{ position: "relative" }}>
              <IconButton
                onClick={handleDrawerClose}
                color="inherit"
                aria-label="close drawer"
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(!open && { display: "none" }),
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <img
                  alt="logo"
                  src="Screenshot_2023-06-15_113137-removebg-preview.png"
                  className="logo"
                />
              </Typography>
              <TextField
                variant="standard"
                // label="Search"
                color="info"
                style={{
                  width: "450px",
                  margin: "0 auto",
                  outline: "none"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                }}
              />
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={profileOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : undefined}
                >
                  <Avatar sx={{ width: 50, height: 50 }}>
                    <img
                      alt="profile pic"
                      src={`data:image/png;base64,${user.profilePic}`}
                      className="profilePic"
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <ProfileMenu
                anchorEl={anchorEl}
                handleClose={handleProfileClose}
                username={`${user.firstName} ${user.lastName}`}
              />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar />
            <Box sx={{ overflowY: "scroll" }}>
              {/* {console.log(props.user)} */}

              <Tabs
                value={value}
                onChange={handleNavChange}
                orientation="vertical"
              >
                <Tab
                  key={1}
                  label="Notes"
                  onClick={props.getAllNotes}
                  icon={<NotesRounded style={{ width: "50px" }} />}
                  iconPosition="start"
                  color="secondary"
                ></Tab>
                {loading && (
                  <div>
                    <Skeleton component="li" />
                    <Skeleton component="li" />
                    <Skeleton component="li" />
                    <Skeleton component="li" />
                  </div>
                )}
                {!loading &&
                  labels.map((label, index) => (
                    <Tab
                      key={label._id}
                      label={label.key}
                      onClick={(e) => props.getLabel(e)}
                      icon={
                        <CollectionsBookmarkIcon style={{ width: "50px" }} />
                      }
                      iconPosition="start"
                      color="secondary"
                    ></Tab>
                  ))}
                <Button style={{ color: "#000", alignItems: "left" }}>
                  <Tab
                    label="Edit Labels"
                    icon={<Edit style={{ width: "50px" }} />}
                    style={{ width: "100%", flexDirection: "row" }}
                    onClick={handleLabelModalOpen}
                  >
                    Edit Labels
                  </Tab>
                </Button>
              </Tabs>
              <Divider />
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {!loading && (
              <ImageList
                variant="masonry"
                cols={cols}
                gap={2}
                className="note-container"
              >
                {notes.map((item, index) => (
                  <ImageListItem
                    component={Note}
                    key={index}
                    index={index}
                    title={item.title}
                    content={item.content}
                    handleDelete={deleteItem}
                    show={true}
                  />
                ))}
              </ImageList>
            )}
            <AddLabelModal />

          </Box>
        </Box>
      )}
    </div>
  );
}
