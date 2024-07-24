import { Box } from '@mui/system';

const AppSectionContainer = ({ children, sx }) => {
	return (
		<>
			<Box
				sx={{
					px: { lg: 8, md: 6, xs: 3 },
					py: { lg: 8, md: 6, xs: 4 },
					...sx,
				}}
			>
				{children}
			</Box>
		</>
	);
};
export default AppSectionContainer;
