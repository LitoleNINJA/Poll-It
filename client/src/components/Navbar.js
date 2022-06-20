import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Navbar() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: '2rem'
        }}>
            {/* Logo */}
            <Box sx={{
            }}>
                <Typography variant="h4" style={{
                    fontWeight: '700',
                }}>Poll It</Typography>
            </Box>

            {/* Public poll and Create poll */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Link href="/">
                    <Typography variant="body1" sx={{
                        marginRight: '4rem',
                        fontWeight: '600',
                        color: '#666F7A',
                        ':hover': {
                            color: '#444444',
                            cursor: 'pointer',
                        }
                    }}>Public Polls</Typography>
                </Link>
                <Link href="/create">
                    <Typography variant="body1" sx={{
                        fontWeight: '600',
                        color: '#666F7A',
                        ':hover': {
                            color: '#444444',
                            cursor: 'pointer',
                        }
                    }}>Create Polls</Typography>
                </Link>

            </Box>

            {/* Login and Signup */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Link href="/login">
                    <Typography sx={{
                        fontWeight: '600',
                        marginRight: '1rem',
                        color: '#444444',
                        ':hover': {
                            color: '#000000',
                            cursor: 'pointer',
                        }
                    }}>Login</Typography>
                </Link>
                <Link href="/signup">
                    <Button variant="contained" color="primary">
                        <Typography style={{
                            fontWeight: '600',
                        }}>Sign Up</Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
