import { Box, Typography, Input, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';

export default function signup() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const cookies = parseCookies();
        if(cookies.user) {
            router.push('/');
        }
    }, []);

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post('/api/login', {
                email,
                password
            });
            setCookie(null, 'user', JSON.stringify(data.user), {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });
            router.reload();
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data && error.response.data.error)
                setError(error.response.data.error);
        }
    }

    return (
        <Box sx={{
            width: '100%',
            background: '#F4F7FB',
            p: {lg: '10rem 0', xs:'6rem 0'},
        }}>
            {error && <Snackbar open={error !== ''} autoHideDuration={2000} onClose={() => setError('')} anchorOrigin={{ vertical:'top', horizontal: 'center'}} >
                    <Alert variant='filled' severity='error'>{error}</Alert>
                </Snackbar> }
            <Box sx={{
                width: {lg: '25%', xs:'70%'},
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
            }}>
                <Typography variant="h3" sx={{
                    fontWeight: '700',
                    color: '#333333',
                }}>Log In</Typography>
                <Typography variant="body1" sx={{
                    fontWeight: '500',
                    color: '#a6a9ae',
                    mt: '1rem',
                }}>
                    Log In to your Poll It account.
                </Typography>

                <Input placeholder='Email' type='email' disableUnderline
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        mt: '1.5rem',
                        p: '0.5rem 1rem',
                        border: '2px solid transparent',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                        borderRadius: '5px',
                        fontWeight: '600',
                    }} />

                <Input placeholder='Password' type='password' disableUnderline
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        mt: '1.5rem',
                        p: '0.5rem 1rem',
                        border: '2px solid transparent',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                        borderRadius: '5px',
                        fontWeight: '600',
                    }} />

                <Button variant="contained" onClick={handleSubmit} sx={{
                    textTransform: 'none',
                    width: '100%',
                    mt: '3rem',
                    fontWeight: '600',
                    fontSize: '1.5rem',
                    backgroundColor: '#41db7b',
                    ':hover': {
                        backgroundColor: '#3ecb76',
                    }
                }}>Log In</Button>
            </Box>
        </Box>
    )
}
