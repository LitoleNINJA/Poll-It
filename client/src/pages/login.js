import { Box, Typography, Input, Button } from '@mui/material';

export default function signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log(email, password);
    }

    return (
        <Box sx={{
            width: '100%',
            background: '#F4F7FB',
            p: '10rem 0',
        }}>
            <Box sx={{
                width: '25%',
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

                <Input placeholder='Email' disableUnderline
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
