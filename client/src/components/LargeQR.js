import { Box, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
    }}>
      <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: '3rem',
      }}>
        <Image src={qr} width='450px' height='450px' />

        <Button variant="contained" onClick={() => setLarge(false)} sx={{
          width: { xs: '100%', sm: 'auto' },
          textTransform: 'none',
          backgroundColor: '#009AFF',
          m: '4rem',
          p: '1rem 4rem',
          ':hover': {
            backgroundColor: '#0085dd',
          }
        }}>Show Smaller Preview</Button>
      </Box>

      <CloseIcon onClick={() => setLarge(false)} sx={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        cursor: 'pointer',
        color: '#009AFF',
        fontSize: '2rem',
      }} />
    </Box>
  )
};
