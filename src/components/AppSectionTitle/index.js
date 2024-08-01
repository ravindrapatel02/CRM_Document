import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { motion } from "framer-motion";
const AppSectionTitle = (props) => {
	const {
		color = "#424242",
		primaryText,
		secondaryText,
		subHeader,
		headerSx,
		subHeaderSx,
	} = props;

	const headerVariants = {
		offscreen: {
			y: 20,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			// rotate: -10,
			transition: {
				type: "spring",
				// bounce: 0.4,
				duration: 1,
			},
		},
	};
	const subHeaderVariants = {
		offscreen: {
			y: 10,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			// rotate: -10,
			transition: {
				type: "spring",
				// bounce: 0.4,
				duration: 1,
				delay: 0.2,
			},
		},
	};
	return (
		<>
			<Box
				// component={motion.div}
				initial="offscreen"
				whileinview="onscreen"
				viewport={{ once: true, amount: 0.2 }}
				variants={headerVariants}
				sx={{
					mb: 2,
					textTransform: "capitalize",
					...headerSx
				}}
			>
				<Typography
					// component={"span"}
					variant={"h5"}
					color={color}
					sx={{
						marginRight: "5px",
					}}
				>
					{primaryText}
				</Typography>
				<Typography
					component={"span"}
					variant={"h2"}
					sx={{
						color: "secondary.main",
					}}
				>
					{secondaryText}
				</Typography>
			</Box>
			{!!subHeader && (
				<Box
					// component={motion.div}
					initial="offscreen"
					whileinview="onscreen"
					viewport={{ once: true, amount: 0.2 }}
					variants={subHeaderVariants}
					sx={{
						mb: 2,
					}}
				>
					<Typography
						component={"p"}
						variant={"subtitle2"}
						sx={{
							...subHeaderSx,
						}}
					>
						{subHeader}
					</Typography>
				</Box>
			)}
		</>
	);
};

export default AppSectionTitle;
