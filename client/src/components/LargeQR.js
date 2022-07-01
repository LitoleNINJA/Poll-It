import { Box } from "@mui/material";
import Image from "next/image";

export default function LargeQR({ qr, setLarge }) {
  return (
    <Box sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        bgcolor: '#fff',
        // p: '3rem',
    }}>
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // m: '3rem',
        }}>
            <Image src={qr} layout='responsive' width='450px' height='450px' />
        </Box>
    </Box>  
  )
}
