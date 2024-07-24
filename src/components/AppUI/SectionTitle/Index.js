import Typography from '@mui/material/Typography';
const SectionTitle = (props) => {
	const {color = '#003975', primaryText, defaultText, sx} = props;
	return (
		<Typography
			component={'h1'}
			sx={{ mb: 2, fontSize:'10px', mt:-5, textTransform: 'uppercase', color: '#003975' }}
		>
			<Typography
				component={'span'}
				variant={'h1'}
				color={color}
				sx={{
					marginRight: '5px',
				}}
			>
				{primaryText}
			</Typography>
			<Typography
				component={'span'}
				variant={'h5'}
			>
				{defaultText}
			</Typography>
		</Typography>
	);
};

export default SectionTitle;
