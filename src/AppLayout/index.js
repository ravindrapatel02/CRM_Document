import AppLoader from "@components/CustomLoader";
import { TopHeader } from "./Navbar/TopHeader";
import { BottomHeader } from "./Navbar/BottomHeader";
import { useAuthUser } from "src/hooks/AuthHooks";
import { Box } from "@mui/material";
import Footer from "./Footer";

export const AppLayout = ({ children }) => {
  const { isLoading, user } = useAuthUser();

  if (isLoading) {
    return <AppLoader />;
  }
  if (isLoading && !user) {
    return <AppLoader />;
  }

  return (
    <>
      <TopHeader />
      <BottomHeader />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};
