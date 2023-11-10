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
import { AppContext } from "../../AppContextProvider";
import { signup } from "../../apiCalls";

const Signup = () => {
	const { setAuth, setAuthUser, snackNoti } = useContext(AppContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({name: "", username: "", password: "", confirmPassword: ""});
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const handleChangeInput = (e) => {
		setFormData(prev => (
			{
				...prev,
				[e.target.name]: e.target.value
			}
		))
	}

	const handleSignup = () => {
		(async () => {
			setIsLoadingBtn(true);

			if (!formData.name || !formData.username || !formData.password || !formData.confirmPassword) {
				snackNoti({ type: "warning", msg: "အချက်အလက်များမပြည့်စုံပါ" });
				setIsLoadingBtn(false);
				return false;
			}
			const result = await signup(formData);
			setIsLoadingBtn(false);
			if (!result.ok) {
				snackNoti({ type: "error", msg: result.err });
				return false;
			}
			snackNoti({ type: "success", msg: result.msg });
			// setAuthUser(result.user);
			// setAuth(true);
			// navigate("/");
		})();
	};

	return (
		<Box
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
						handleSignup();
					}}>
					<div className="floatingCard">
						<Grid container spacing={2}>
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
								<Typography variant="h6">Create Account</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Name"
									type="text"
									name="name"
									fullWidth
									onChange={handleChangeInput}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Username"
									name="username"
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
								<TextField
									name="confirmPassword"
									label="Confirm Password"
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
									<span>Create Account</span>
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

export default Signup;
