import { Box, Typography, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidemenu() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{
            display: {sm: 'none'}
        }}>
            <Button onClick={() => setOpen(true)} sx={{
                pl: 0,
                justifyContent: 'flex-start',
                minWidth: 'fit-content',
                mr: '1rem'
            }}>
                <MenuIcon />
            </Button>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{ width: 200 }}
                    role="presentation"
                    onClick={() => setOpen(false)}
                    onKeyDown={() => setOpen(false)}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        justifyContent: 'center',
                        my: '0.5rem'
                    }}>
                        <Link href="/">
                            <Typography variant="body1" sx={{
                                m: '1rem',
                                fontWeight: '600',
                                color: '#666F7A',
                                ':hover': {
                                    color: '#83ffb5',
                                    cursor: 'pointer',
                                }
                            }}>Public Polls</Typography>
                        </Link>
                        <Link href="/create">
                            <Typography variant="body1" sx={{
                                m: '1rem',
                                fontWeight: '600',
                                color: '#666F7A',
                                ':hover': {
                                    color: '#83ffb5',
                                    cursor: 'pointer',
                                }
                            }}>Create Polls</Typography>
                        </Link>

                    </Box>

                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        m: '1.5rem 1rem'
                    }}>
                        <Link href="/login">
                            <Typography sx={{
                                fontWeight: '600',
                                mb: '1.5rem',
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
            </Drawer>
        </Box>
    );
}
