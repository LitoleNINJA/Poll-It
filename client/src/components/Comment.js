import { Box, Divider, Typography, Input, Button } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import avatar from '../assets/avatar.jpg';

export default function Comment() {

    const [comment, setComment] = useState('');

    const handleComment = () => {
        console.log(comment);
    };

    return (
        <Box sx={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: '30rem',
        }}>
            <Box sx={{
                width: '60%',
                m: '5rem auto',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography variant="h4" sx={{
                        color: '#333333',
                        fontWeight: '700',
                    }}>Comments</Typography>
                    <Typography variant='body1' sx={{
                        color: '#aeaeae',
                        fontWeight: '400',
                    }}>0 comments</Typography>
                </Box>

                <Divider sx={{
                    mt: '1rem',
                    width: '100%',
                    height: '4px',
                }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: '3rem',
                }}>
                    <Box>
                        <Image src={avatar} width='64px' height='64px' style={{
                            borderRadius: '60px',
                        }} />
                    </Box>

                    <Box sx={{
                        ml: '2rem',
                        flexGrow: '1',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Input placeholder='Write Comment' disableUnderline multiline rows={4}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                p: '1rem',
                                border: '2px solid #EBEBEB',
                                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                borderRadius: '5px',
                                fontWeight: '600',
                            }} />

                        <Button variant='contained' size='large' onClick={handleComment}
                            sx={{
                                width: 'fit-content',
                                textTransform: 'none',
                                backgroundColor: '#41db7b',
                                m: '2rem 0',
                                p: '1rem 2.5rem',
                                ':hover': {
                                    backgroundColor: '#3bbd6c',
                                }
                            }}><Typography variant='h5' sx={{
                                fontWeight: '600',
                            }}>Post Comment</Typography></Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
