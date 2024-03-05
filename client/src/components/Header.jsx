import * as React from 'react';
import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Container, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { AppContext } from '../AppContextProvider';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
});

export default function Header() {
	const { auth, setAuth, setAuthUser } = useContext(AppContext);

	const navigate = useNavigate();
	const APP_NAME = import.meta.env.VITE_APP_NAME;

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const profileMenuList = [
		{
			name: "Login",
			path: "/login",
			icon: <LoginRoundedIcon sx={{ mr: 1 }} />,
			auth: false,
		},
		{
			name: "Signup",
			path: "/signup",
			icon: <ExitToAppRoundedIcon sx={{ mr: 1 }} />,
			auth: false,
		},
		{
			name: "Logout",
			path: "/",
			icon: <LoginRoundedIcon sx={{ mr: 1 }} />,
			auth: true,
		},
	]

	return (
		<React.Fragment>
			{/* top */}
			<AppBar position="fixed" color="primary" sx={{ backgroundColor: "appbar.background" }}>
				<Container maxWidth="md">
					<Toolbar>
						<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
							{APP_NAME}
						</Typography>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								{/* {
									profileMenuList.filter((i) => i.auth === auth).map((p) => {
										return (
											<MenuItem
												key={p.path}
												onClick={() => {
													handleCloseUserMenu();
													navigate(p.path);
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													{p.icon}
													{p.name}
												</Typography>
											</MenuItem>
										)
									})
								} */}
								{
									auth ? (
										[
											<MenuItem
												key={1}
												onClick={() => {
													handleCloseUserMenu();
													localStorage.removeItem("token");
													setAuth(false);
													setAuthUser({});
													navigate("/");
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													<LoginRoundedIcon sx={{ mr: 1 }} />
													Logout
												</Typography>
											</MenuItem>,
											<MenuItem
												key={2}
												onClick={() => {
													handleCloseUserMenu();
													navigate("/villages");
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													<LocationCityIcon sx={{ mr: 1 }} />
													Villages
												</Typography>
											</MenuItem>,
											<MenuItem
												key={2}
												onClick={() => {
													handleCloseUserMenu();
													navigate("/in_out_report");
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													<CalendarMonthIcon sx={{ mr: 1 }} />
													Reports
												</Typography>
											</MenuItem>
										]
									) : (
										[
											<MenuItem
												key={3}
												onClick={() => {
													handleCloseUserMenu();
													navigate("/login");
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													<LoginRoundedIcon sx={{ mr: 1 }} />
													Login
												</Typography>
											</MenuItem>,
											<MenuItem
												key={4}
												onClick={() => {
													handleCloseUserMenu();
													navigate("/signup");
												}}>
												<Typography sx={{ display: "flex", justifyContent: "center" }}>
													<ExitToAppRoundedIcon sx={{ mr: 1 }} />
													Signup
												</Typography>
											</MenuItem>
										]
									)
								}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			{/* bottom */}
			<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "appbar.background" }}>
				<Container maxWidth="md">
					<Toolbar>
						<Grid container>
							<Grid item xs={5} sx={{ display: "flex", justifyContent: "center" }}>
								<IconButton color="inherit" aria-label="open drawer" onClick={() => navigate("/")}>
									<HomeRoundedIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2}>
								<StyledFab color="secondary" aria-label="add" onClick={() => navigate("/add")}>
									<AddIcon />
								</StyledFab>
							</Grid>
							<Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
								<IconButton color="inherit" onClick={() => navigate("/search")}>
									<SearchIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
								<IconButton color="inherit" onClick={() => navigate("/albums")}>
									<FolderCopyOutlinedIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</React.Fragment>
	);
}