import Link from 'next/link';
import { parseCookies, destroyCookie  } from 'nookies';
import avatar from '../assets/avatar.jpg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';

export default function Navbar() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        const cookies = parseCookies();
        if(cookies.user) {
            setUser(JSON.parse(cookies.user));
        }
    }, []);

    const handleLogout = () => {
        destroyCookie(null, 'user');
        setUser(null);
        router.push('/login');
    }


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

            {/* Login and Signup or User Profile */}
            {user ? (
                <>
                    <Box onClick={() => setShowMenu(!showMenu)} sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }}>
                        <Image src={avatar} width={40} height={40} style={{
                            borderRadius: '50px',
                        }} />
                        <KeyboardArrowDownIcon sx={{
                            ml: '1rem',
                        }} />
                    </Box>

                    {showMenu && (
                        <Box sx={{
                            position: 'absolute',
                            top: '5rem',
                            right: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 21px 0 rgba(49, 49, 49, 0.2)',
                            borderRadius: '5px',
                            pt: '1.5rem',
                            zIndex: '10',
                        }}>
                            <Typography variant="body1" sx={{
                                color: '#333333',
                                fontWeight: '500',
                                p: '0 2rem',
                            }}>{user.username}</Typography>
                            <Typography variant="body1" sx={{
                                color: '#A3A7B5',
                                p: '0.5rem 2rem',
                            }}>{user.email}</Typography>

                            <Divider sx={{
                                height: '2px',
                                m: '0.5rem 1rem',
                            }} />

                            <Typography variant="body1" sx={{
                                color: '#585D75',
                                fontWeight: '500',
                                p: '0.5rem 2rem',
                                ':hover': {
                                    color: '#4199FF',
                                    cursor: 'pointer',
                                }
                            }}>My Profile</Typography>
                            <Typography variant="body1" sx={{
                                color: '#585D75',
                                fontWeight: '500',
                                p: '0.5rem 2rem',
                                ':hover': {
                                    color: '#4199FF',
                                    cursor: 'pointer',
                                }
                            }}>Settings</Typography>

                            <Divider sx={{
                                width: '100%',
                                height: '4px',
                                mt: '0.5rem',
                            }} />

                            <Typography variant="body1" onClick={handleLogout} sx={{
                                color: '#FF5252',
                                fontWeight: '500',
                                backgroundColor: '#F9F9F9',
                                borderTop: '1px solid #F2F2F2',
                                p: '1rem 2rem',
                                ':hover': {
                                    color: '#b73333',
                                    cursor: 'pointer',
                                }
                            }}>Logout</Typography>
                        </Box>
                    )}
                </>
            ) : (
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
            )}
        </Box>
    )
}
