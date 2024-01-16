import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_URL;

    const theme = createTheme({
        typography: {
            fontFamily: `'Inter','san-serif'`,
        },
    });
    theme.typography.h2 = {
        [theme.breakpoints.up("md")]: {
            fontSize: "3.75vw",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "8.5vw",
        },
    };
    theme.typography.h3 = {
        [theme.breakpoints.up("md")]: {
            fontSize: "3vw",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "6vw",
        },
    };
    theme.typography.h4 = {
        [theme.breakpoints.down("sm")]: {
            fontSize: "5vw",
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: "2rem",
        },
    };
    theme.typography.h5 = {
        [theme.breakpoints.up("md")]: {
            fontSize: "1.5vw",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "3vw",
        },
    };
    theme.typography.h6 = {
        [theme.breakpoints.up("md")]: {
            fontSize: "1.25rem",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "2.5vw",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "4vw",
        },
    };
    theme.typography.body1 = {
        [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "3vw",
        },
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {!loading ? (
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default MyApp;
