import { Box } from "@mui/system";
import React from "react";

const AppPageContainer = ({ children, sx }) => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: "#f6f6f6",
                    // p: { md: 6, xs: 2 },
                    p: { md: '16px 48px 48px 48px', xs: 2 },
                    "& > .MuiBox-root:not(:first-of-type)": {
                        mt: { md: 6, xs: 2 },
                    },
                    ...sx,
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
};
export default AppPageContainer;
