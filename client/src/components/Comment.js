import { Box, Divider, Typography, Input, Button } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import avatar from '../assets/avatar.jpg';
import axios from 'axios';

export default function Comment({ pollId, userId, username }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const getComments = async () => {
        const { data } = await axios.get(`/api/comment/${pollId}`);
        setComments(data);
    };

    useState(() => {
        getComments();
    }, []);

    const handleComment = async () => {
        await axios.post(`/api/comment/${pollId}`, {
            comment: newComment,
            user_id: userId,
            username: username,
        });
        getComments();
        setNewComment('');

    };

    const getTime = (t) => {
        const date = new Date(t);
        const now = new Date();
        const diff = now - date;
        const minutes = diff / (1000 * 60);
        if (minutes < 60) {
            return `${Math.round(minutes)} minutes ago`;
        }
        const hours = minutes / 60;
        if (hours < 24) {
            return `${Math.round(hours)} hours ago`;
        }
        const days = hours / 24;
        return `${Math.round(days)} days ago`;
    }

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
                {/* Comments Heading */}
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

                {/* All Comments */}
                {comments.map((comment) => (
                    <Box key={comment.id}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: '3rem',
                            mb: '2rem',
                        }}>
                            {/* comment img */}
                            <Box>
                                <Image src={avatar} width='64px' height='64px' style={{
                                    borderRadius: '60px',
                                }} />
                            </Box>
                            
                            {/* comment text */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                ml: '2rem',
                            }}>
                                <Typography variant='h5' sx={{
                                    color: '#333333',
                                    fontWeight: '700',
                                }}>{comment.username}</Typography>
                                <Typography variant='p' sx={{
                                    fontWeight: '500',
                                    mt: '1rem',
                                }}>{comment.comment_text}</Typography>
                                <Typography variant='body1' sx={{
                                    color: '#bababa',
                                    fontWeight: '600',
                                    mt: '1.5rem',
                                }}>{getTime(comment.timestamp)}</Typography>
                            </Box>  
                        </Box>

                        <Divider sx={{
                            mt: '1rem',
                            width: '100%',
                            height: '4px',
                        }} />
                    </Box>
                ))}

                

                {/* Comment Box */}
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
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
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
