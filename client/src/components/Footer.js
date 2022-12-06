import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{
        width: '100%',
        backgroundColor: '#ffffff',
        py: '2rem',
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Box sx={{
            }}>
                <Typography variant="subtitle2" style={{
                    fontWeight: '600',
                    color: '#444444',
                }}>© 2022</Typography>
            </Box>

            <Box sx={{}}>

            </Box>
        </Box>
    </Box>
  )
}
