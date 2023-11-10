import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useContext, useRef, useState } from "react";
import { login } from "../../apiCalls";
import { AppContext } from "../../AppContextProvider";

const Login = () => {
	const { setAuth, setAuthUser, snackNoti } = useContext(AppContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({username: "", password: ""});
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const handleChangeInput = (e) => {
		setFormData(prev => (
			{
				...prev,
				[e.target.name]: e.target.value
			}
		))
	}

	const handleLogin = () => {
		(async () => {
			setIsLoadingBtn(true);

			if (!formData.username || !formData.password) {
				snackNoti({ type: "error", msg: "အချက်အလက်များမပြည့်စုံပါ" });
				setIsLoadingBtn(false);
				return false;
			}
			const result = await login(formData);
			setIsLoadingBtn(false);
			if (!result.ok) {
				snackNoti({ type: "error", msg: result.err });
				return false;
			}
			setAuthUser(result.user);
			setAuth(true);
			navigate("/");
		})();
	};

	return (
		<Box
			// maxWidth="xs"
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "calc(100vh - 200px)",
				justifyContent: "center",
				color: "#cccccc",
				paddingY: "24px",
			}}>
			<Box
				sx={{
					maxWidth: "400px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
					{import.meta.env.VITE_APP_NAME}
				</Typography>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleLogin();
					}}>
					<div className="floatingCard">
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									marginBottom: "10px",
								}}>
								<Typography variant="h6">Login</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="username"
									label="Username"
									type="text"
									fullWidth
									onChange={handleChangeInput}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="password"
									label="Password"
									type="password"
									fullWidth
									onChange={handleChangeInput}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="Remember me"
								/>
							</Grid>
							<Grid item xs={12}>
								<LoadingButton
									size="small"
									type="submit"
									loading={isLoadingBtn}
									loadingIndicator="Login"
									variant="contained"
									fullWidth>
									<span>Login</span>
								</LoadingButton>
							</Grid>
							{/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
								<Typography>Forgot Password</Typography>
							</Grid> */}
						</Grid>
					</div>
				</form>
				{/* <Typography>Do not have an account?</Typography>
				<Typography
					component="span"
					onClick={() => navigate("/signup")}
					sx={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
					Create account
				</Typography> */}
			</Box>
		</Box>
	);
};

export default Login;
