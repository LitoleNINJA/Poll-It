import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import scrollUp from '../assets/scroll-up.png';

export default function Footer() {
  return (
    <Box sx={{
        backgroundColor: '#ffffff',
        py: '2rem',
        mx: '5rem',
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Box sx={{
            }}>
                <Typography variant="subtitle2" style={{
                    fontWeight: '600',
                    color: '#444444',
                }}>© 2022</Typography>
            </Box>

            <Box sx={{}}>
                <Typography variant="subtitle2" style={{
                    fontWeight: '600',
                    color: '#444444',
                }}>Terms of Use . Privacy Policy</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '10rem',
                ':hover': {
                    cursor: 'pointer',
                }
            }}>
                <Image src={scrollUp} alt="scroll up" width={20} height={20} />
                <Typography variant="subtitle2" style={{
                    ml: '1rem',
                    fontWeight: '600',
                    color: '#444444',
                }}>Back to Top</Typography>
            </Box>
        </Box>
    </Box>
  )
}
