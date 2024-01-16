'use client'
import { Box, Typography, Button, Divider, LinearProgress, Alert, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import router from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../assets/icon-link.png';
import qrIcon from '../../assets/icon-qr-code.png';
import whatsappIcon from '../../assets/icon-whatsapp.png';
import axios from 'axios';
import Comment from '../../components/Comment';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import ShareLink from '../../components/ShareLink';
import ShareQRCode from '../../components/ShareQR';
import { io } from 'socket.io-client';
import crypto from 'crypto';

export async function getServerSideProps(context) {
    try{
        const { poll_id } = context.query;
        const res = await axios.get(`/api/polls/${poll_id}`);
        const poll = res.data;
        if(poll.visibility === 'private' && poll_id.length !== 32) 
            return { props: { poll: null }};
        const { data: options } = await axios.get(`/api/option/${poll.id}`);
        poll.options = options;
        return { props: { poll } };
    } catch(err) {
        console.log(err);
        return { props: { poll: null }};
    }
}

export default function Post({ poll }) {
    
    const [socket, setSocket] = useState(null);
    if(!poll) {
        router.push('/');
        return;
    }
    
    const cookies = parseCookies();
    const [user, setUser] = useState(null);

    const [linkModal, setLinkModal] = useState(false);
    const [qrModal, setQrModal] = useState(false);

    const colors = ['#4AD97F', '#FF9E72', '#4199FF', '#FF5252', '#FFd06e']
    colors.sort(() => Math.random() - 0.5);

    const variants = {
        open: {
            x: 20,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        },
        closed: {
            x: 0,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        }
    };

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [largestIndex, setLargestIndex] = useState(0);
    const [totalVotes, setTotalVotes] = useState(poll.total_votes);
    const [pollOptions, setPollOptions] = useState(poll.options);
    const [error, setError] = useState('');
    const multi = poll.settings.includes('Allow multiple votes');
    const comments = poll.settings.includes('Allow comments');

    const handleOptionSelect = (i) => {
        if (!multi) {
            if (selectedOptions[0] === i) {
                setSelectedOptions([]);
            } else {
                setSelectedOptions([i]);
            }
        } else {
            if (!selectedOptions.includes(i)) {
                setSelectedOptions([...selectedOptions, i]);
            } else {
                setSelectedOptions(selectedOptions.filter(option => option !== i));
            }
        }
    }

    const isSelected = (i) => {
        return selectedOptions.includes(i);
    }

    useEffect(() => {
        if (cookies.user) {
            setUser(JSON.parse(cookies.user));
        } else if(cookies.sessionId) {
            setUser(cookies.sessionId);
        } else {
            const sessionId = crypto.randomBytes(16).toString('hex');
            setUser(sessionId);
            setCookie(null, 'sessionId', sessionId, {
                maxAge: 10 * 24 * 60 * 60,
                path: '/'
            });
        }
        
        const new_socket = io("http://localhost:3001");
        setSocket(new_socket);
        new_socket.on('connect', () => console.log('connected',new_socket.id));
        new_socket.emit('join', poll.id);

        return () => {
            console.log('disconnected');
            new_socket.disconnect();
            destroyCookie(null, 'sessionId');
        };
    }, []);

    useEffect(() => {
        if (user) {
            if (poll.voters.includes(user.username ? user.username : user)) {
                setSubmitted(true);
            }
        }
    }, [user]);

    useEffect(() => {
        if(socket === null)
            return;
        socket.on('vote', (vote, options) => {
            console.log('votes recieved', vote, options);
            poll.total_votes = vote;
            options.forEach(optionId => {
                pollOptions.find(o => o.id === optionId).votes += 1
            });
            setTotalVotes(vote);
            setPollOptions(pollOptions);
        });
    }, [socket]);

    useEffect(() => {
        let largest = 0;
        for (let i = 0; i < pollOptions.length; i++) {
            const percentVotes = Math.round((pollOptions[i].votes / totalVotes) * 100);
            if (percentVotes > largest) {
                largest = percentVotes;
                setLargestIndex(pollOptions[i].id);
            }
        }
    }, [totalVotes, pollOptions]);

    const addVote = async (optionId) => {
        try {
            const { data } = await axios.post(`/api/option/${optionId}`, {
                pollId: poll.id,
            });
            data.forEach(option => {
                poll.options.find(o => o.id === option.id).votes = option.votes;
            });
            router.replace(router.asPath);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async () => {
        if (selectedOptions.length === 0) {
            setError('Please select an option');
            return;
        }
        selectedOptions.forEach(optionId => {
            addVote(optionId);
        });
        await axios.put(`/api/polls/${poll.id}`, {
            voter: user.username ? user.username : user
        });

        console.log('adding vote');
        socket.emit('vote', poll, selectedOptions);
        setTotalVotes(totalVotes+1);
        setSelectedOptions([]);
        setSubmitted(true);
    }

    const getPercentVotes = (n) => {
        return Math.round((n / totalVotes) * 100);
    }

    const getTime = () => {
        const date = new Date(poll.timestamp);
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
        <>
            <Box sx={{
                width: "100%",
                pt: {md: "5rem", xs:'1rem'},
                backgroundColor: "#fafafa",
                pb: {lg: "6rem", xs: '3rem'},
            }}>
                {error && <Snackbar open={error !== ''} autoHideDuration={2000} onClose={() => setError('')} anchorOrigin={{ vertical:'top', horizontal: 'center'}} >
                    <Alert variant='filled' severity='error'>{error}</Alert>
                </Snackbar> }
                <Box sx={{
                    width: {lg: "70%", xs:'80%'},
                    m: "0 auto",
                    display: 'flex',
                    flexDirection: {md: 'row', xs: 'column'},
                    justifyContent: 'space-between',
                }}>
                    {/* Poll Details */}
                    <Box sx={{
                        width: {lg: "65%", md: '55%'},
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box sx={{
                            width: 'fit-content',
                            borderRadius: "6px",
                            p: "0.5rem",
                            backgroundColor: "#83ffb5",
                            mb: "1rem",
                        }}>
                            <Typography variant="body1" sx={{
                                fontWeight: "700",
                                color: "#333333",
                            }}> Category </Typography>
                        </Box>

                        <Typography variant="h3" sx={{
                            fontWeight: "700",
                            color: "#333333",
                        }}>{poll.question}</Typography>

                        <Typography variant="body1" sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: "#b1b1b1",
                            fontWeight: "500",
                            mt: {md: "2rem", xs: '0.5rem'},
                            mb: "1rem",
                        }}>
                            Asked by <b style={{
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                                color: "#666666",
                            }}>{poll.username}</b> {getTime()}
                        </Typography>

                        {submitted ? (
                            <Box>
                                {pollOptions.map((option) => (
                                    <Box key={option.id} sx={{
                                        boxShadow: largestIndex === option.id ? '0 7px 14px 0 rgba(118, 236, 233, 0.2)' : '0 7px 14px 0 rgba(0, 0, 0, 0.07)',
                                        borderRadius: "7px",
                                        p: {lg: "2rem 4rem", xs:'1rem'},
                                        backgroundColor: "#ffffff",
                                        m: "2rem 0",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        ml: largestIndex === option.id && "2.5rem",
                                        transform: largestIndex === option.id ? 'scale(1.05)' : 'scale(1)',
                                        border: largestIndex === option.id && `3px solid ${colors[option.id % colors.length]}`,
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Typography variant="h4" sx={{
                                                color: "#333333",
                                                fontWeight: "700",
                                                mb: "1rem",
                                            }}> {option.option_text} </Typography>
                                            <Typography variant="h4" sx={{
                                                color: "#333333",
                                                fontWeight: "700",
                                            }}>{getPercentVotes(option.votes)} %</Typography>
                                        </Box>

                                        <LinearProgress variant="determinate" value={getPercentVotes(option.votes)} sx={{
                                            width: "100%",
                                            height: "8px",
                                            borderRadius: "5px",
                                            backgroundColor: "#efefef",
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: colors[option.id % colors.length],
                                            }
                                        }} />


                                        <Typography variant="body1" sx={{
                                            color: "#acacac",
                                            fontWeight: "500",
                                            mt: "1rem",
                                        }}>{option.votes} votes</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box>
                                {poll.options.map((option) => (
                                    <motion.div key={option.id}
                                        variants={variants}
                                        animate={isSelected(option.id) ? "open" : "closed"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Box onClick={() => handleOptionSelect(option.id)} sx={{
                                            boxShadow: isSelected(option.id) ? '0 7px 14px 0 rgba(74, 217, 127, 0.2)' : '0 7px 14px 0 rgba(0, 0, 0, 0.07)',
                                            borderRadius: "7px",
                                            p: {lg: "2rem 4rem", xs:'1rem'},
                                            backgroundColor: "#ffffff",
                                            m: {lg: "2rem 0", xs:'1rem 0'},
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            border: isSelected(option.id) && '2.5px solid #4AD97F',
                                            ':hover': {
                                                cursor: 'pointer',
                                                boxShadow: '0px 10px 44px 10px rgb(233, 235, 243)'
                                            }
                                        }}
                                        >
                                            {isSelected(option.id) ? (
                                                <svg height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect fill="#4ad97f" height="36" rx="18" width="36" /><path d="m11.8703205 17.5433483-.1-.1v-4.8452366c0-1.049341-.850659-1.9-1.90000002-1.9s-1.9.850659-1.9 1.9v6.3833313c0 .0378714.00110676.0756044.00328903.125259-.00218958.0350713-.00328903.0703132-.00328903.1056937 0 .9217894.74725795 1.6690473 1.66904733 1.6690473h16.46190539c.9217893 0 1.6690473-.7472579 1.6690473-1.6690473s-.747258-1.6690474-1.6690473-1.6690474z" fill="#fff" stroke="#4ad97f" strokeWidth=".2" transform="matrix(.66913061 -.74314483 .74314483 .66913061 -5.655914 18.876162)" /></g></svg>
                                            ) : (
                                                <svg height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" fillRule="evenodd" height="32.5" rx="16.25" stroke="#e4e4e4" strokeWidth="3.5" width="32.5" x="1.75" y="1.75" /></svg>
                                            )}
                                            <Typography variant="h4" sx={{
                                                color: "#333333",
                                                fontWeight: "700",
                                                ml: "1rem",
                                            }}> {option.option_text} </Typography>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Poll Options */}
                    <Box sx={{
                        width: {lg: "28%", md: "35%"},
                        display: 'flex',
                        flexDirection: 'column',
                        pt: {lg: "4rem"}
                    }}>
                        {submitted ? (
                            <Box sx={{
                                backgroundColor: '#E7F5FF',
                                p: '1rem 2rem',
                                m: '2rem 0',
                            }}><Typography variant='body1' sx={{
                                fontWeight: '500',
                            }}>You voted on this poll</Typography></Box>
                        ) : (
                            <Button variant='contained' size='large' onClick={handleSubmit}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#41db7b',
                                    m: '2rem 0',
                                    p: '1rem 2.5rem',
                                    ':hover': {
                                        backgroundColor: '#3bbd6c',
                                    }
                                }}><Typography variant='h4' sx={{
                                    fontWeight: '600',
                                }}>Submit Vote</Typography></Button>
                        )}

                        {/* Votes and Share links */}
                        <Box sx={{
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                p: '2rem 3rem 1rem',
                            }}>
                                <Typography variant='h6' sx={{
                                    color: '#b1b1b1',
                                    fontWeight: '600',
                                }}>Votes</Typography>
                                <Typography variant='h2' sx={{
                                    color: '#333333',
                                    fontWeight: '700',
                                    mt: '1rem',
                                }}>{totalVotes}</Typography>
                            </Box>

                            <Divider sx={{
                                width: '100%',
                                height: '5px',
                            }} />

                            {/* Share */}
                            <Box sx={{
                                p: {md: '2rem 3rem', xs:'2rem'},
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <ShareIcon />
                                    <Typography variant='h6' sx={{
                                        color: '#b1b1b1',
                                        fontWeight: '600',
                                        ml: '1rem'
                                    }}>Share</Typography>
                                </Box>

                                {/* Link */}
                                <Box onClick={() => setLinkModal(true)} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '1rem',
                                    alignItems: 'center',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                    <Image src={linkIcon} sx={{}} />
                                    <Typography variant='body1' sx={{
                                        fontWeight: '600',
                                        ml: '1rem',
                                        color: '#307fd7',
                                    }}>Share Link</Typography>
                                </Box>
   
                                {linkModal && (
                                    <Box sx={{
                                        width: '100vw',
                                        height: '100vh',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        zIndex: '10',
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                    }}>
                                        <ShareLink setLinkModal={setLinkModal} poll={poll} />
                                    </Box>
                                )}
                               
                                {/* QR */}
                                <Box onClick={() => setQrModal(true)} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '1rem',
                                    alignItems: 'center',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                    <Image src={qrIcon} sx={{}} />
                                    <Typography variant='body1' sx={{
                                        fontWeight: '600',
                                        ml: '1rem',
                                        color: '#a46cff',
                                    }}>Share QR Code</Typography>
                                </Box>

                                {qrModal && (
                                    <Box sx={{
                                        width: '100vw',
                                        height: '100vh',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        zIndex: '10',
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                    }}>
                                        <ShareQRCode setQrModal={setQrModal} />
                                    </Box>
                                )}

                                {/* Whatsapp */}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '1rem',
                                    alignItems: 'center',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                    <Image src={whatsappIcon} sx={{}} />
                                    <Typography variant='body1' sx={{
                                        fontWeight: '600',
                                        ml: '1rem',
                                        color: '#00d856',
                                    }}>Share on Whatsapp</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {comments && (submitted ?  (<Comment pollId={poll.id} userId={user ? user.id : null} username={user ? user.username : null} />) : (<Box sx={{
                width: '100%',
                px: 'auto'
            }}>Vote to view Comments !</Box>))}
        </>

    )
};