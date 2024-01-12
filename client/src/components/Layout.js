import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main>{children}</main>
      <ScrollTop />
      <Footer />
    </Box>
  )
}
