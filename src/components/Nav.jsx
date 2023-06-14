import React, { useState, useEffect } from 'react';
import "../App.css"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import Note from './Note';
import Skeleton from '@mui/material/Skeleton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, useMediaQuery } from '@mui/material';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(5.5)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function ClippedDrawer(props) {
    // const theme = useTheme();
    const [value, setValue] = useState(0);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({ ...props.user });
    function deleteItem(event, itemIndex) {
        const itemToDelete = notes[itemIndex]
        console.log(itemToDelete._id);
        axios.delete(`http://localhost:8081/api/${itemToDelete._id}`)
            .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                    setNotes(notes.filter((item, index) => index !== itemIndex));
                }
                props.showAlert(response.data.status);
            })
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
    useEffect(() => {
        setTimeout(() => {
            setNotes(props.notes);
            setLoading(false);
        }, 1000)
        console.log(props)
    }, [props.notes])

    useEffect(() => {
        setTimeout(() => {
            setUser({ ...user, ...props.user });
        }, 100)
    }, [props.user])

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:900PX)');
    const isLargeScreen = useMediaQuery('(min-width:1100px)');

    const cols = isSmallScreen ? 1 : (isMediumScreen ? 2 : (isLargeScreen ? 5 : 3));

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                style={{ backgroundColor: "#9BABB8" }}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerClose}
                        color="inherit"
                        aria-label="close drawer"
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(!open && { display: "none" })
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
                            ...(open && { display: "none" })
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        ShediKeep
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar />
                <Box sx={{ overflow: "hidden" }}>
                    {console.log(props.user)}

                    <Tabs value={value} onChange={handleNavChange}
                        orientation="vertical"
                        indicatorColor='primary'
                    >
                        {(loading) &&
                            <div>
                                <Skeleton component="li" />
                                <Skeleton component="li" />
                                <Skeleton component="li" />
                                <Skeleton component="li" />
                            </div>
                        }
                        {!(loading) &&
                            [...user.labels].map((label, index) => (
                                <Tab key={label._id} disablePadding label={label.key}
                                    icon={<CollectionsBookmarkIcon />}
                                    iconPosition='start'
                                    color='secondary'
                                >
                                </Tab>
                            ))
                        }
                    </Tabs>
                    <Divider />

                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {(loading) &&
                    <div style={{ display: "flex", flexDirection: "row", gap: "50px", flexWrap: "wrap" }}>
                        <Skeleton variant="rectangular" width="40%" height={100} sx={{ bgcolor: "#eee" }} />
                        <Skeleton variant="rectangular" width="40%" height={100} sx={{ bgcolor: "#eee" }} />
                        <Skeleton variant="rectangular" width="40%" height={100} sx={{ bgcolor: "#eee" }} />
                        <Skeleton variant="rectangular" width="40%" height={100} sx={{ bgcolor: "#eee" }} />
                    </div>
                }

                {(!loading) &&
                    <ImageList variant="masonry" cols={cols} gap={2} className="note-container">
                        {notes.map((item, index,) =>
                            <ImageListItem component={Note} key={index} index={index} title={item.title} content={item.content} handleDelete={deleteItem} show={true} />
                        )}
                    </ImageList>

                }
            </Box>
        </Box>
    );
}
