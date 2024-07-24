import React from 'react';
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle'; 
function AppDialog(props) {

	const { title, children } = props;
	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{title && (
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			)}
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default AppDialog;
