import "../../styles/globals.css";
import "../../styles/css/style.css";
import "../../styles/css/bootstrap.min.css";
import "../../styles/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { Suspense } from "react";
import { Provider } from "react-redux";
// import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppLayout } from "src/AppLayout";
import JWTAuthAuthProvider from "src/services/auth/JWTAuthProvider";
import AppLoader from "@components/CustomLoader";
import { store } from "@redux/store";
const MyApp = ({ Component, pageProps }) => {

  
  return (
    <>
      <Head>
        <title>CRM</title>
        <meta name="description" content="GMR FMS SURVEY" />
        <link rel="icon" href="/favi.ico" />
      </Head>
      <Provider store={store}>
        <JWTAuthAuthProvider>
          <AppLayout>
            <Suspense fallback={<AppLoader />}>
              <Component {...pageProps} />
            </Suspense>
            <ToastContainer />
          </AppLayout>
        </JWTAuthAuthProvider>
      </Provider>
    </>
  );
};
export default MyApp;
