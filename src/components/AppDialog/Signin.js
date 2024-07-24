import * as React from 'react'; 
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import WithAuthDefault from '../hoc/withAuthDefault'; 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'; 
import { Avatar, Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
// import { useAuthActionContext, useAuthContext } from '@context/auth';

const theme = createTheme();

 
const SignIn = ({ open, handleDialogClose }) => {
	 

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				open={open}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<Container
						component="main"
						maxWidth="xs"
					>
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography
								component="h1"
								variant="h5"
							>
								Signin
							</Typography>
							<Box
								component="form"
								sx={{
									'& .MuiTextField-root': { mb: 4 },
								}}
								noValidate
								autoComplete="off"
							>
								<TextField
									fullWidth
									id="email"
									name="email"
									label="Email"
									 
								/>
								<TextField
									fullWidth
									id="password"
									name="password"
									label="Password"
									type="password"
									 
								/>
								<FormControlLabel
									control={
										<Checkbox
											value="remember"
											color="primary"
										/>
									}
									label="Remember me"
								/>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									 
								>
									Submit
								</Button>
								<Grid container>
									<Grid
										item
										xs
									>
										<Link
											href="/forgot-password"
											variant="body2"
										>
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link
											href="/signup"
											variant="body2"
										>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						{/* {isLoading && <AppLoader />} */}
					</Container>
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};

export default SignIn;
