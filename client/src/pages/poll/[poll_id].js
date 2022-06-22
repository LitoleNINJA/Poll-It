import { Box, Typography, Button, Divider, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../assets/icon-link.png';
import qrIcon from '../../assets/icon-qr-code.png';
import whatsappIcon from '../../assets/icon-whatsapp.png';

export default function Post() {

    const controls = useAnimation();
    const router = useRouter()
    const { poll_id } = router.query;
    let poll = {
        id: 1,
        question: 'India will Win ?',
        options: [
            {
                text: 'Yes',
                votes: 10
            },
            {
                text: 'No',
                votes: 20
            }
        ],
        totalVotes: 30,
        category: 'Social',
        visibility: 'Public',
        settings: ['Allow multiple votes', 'Allow comments'],
        voters: ['1', '2'],
        user: 'John Doe'
    }
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
    const multi = poll.settings.includes('Allow multiple votes');

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
        let largest = 0;
        for (let i = 0; i < poll.options.length; i++) {
            const percentVotes = Math.round((poll.options[i].votes / poll.totalVotes) * 100);
            if (percentVotes > largest) {
                largest = percentVotes;
                setLargestIndex(i);
            }
        }
    }, []);

    const handleSubmit = () => {
        setSelectedOptions([]);
        setSubmitted(true);
    }

    const getPercentVotes = (n) => {
        return Math.round((n / poll.totalVotes) * 100);
    }

    return (
        <Box sx={{
            width: "100%",
            pt: "5rem",
            height: "100vh",
            backgroundColor: "#fafafa",
        }}>
            <Box sx={{
                width: "70%",
                m: "0 auto",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    width: "65%",
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
                        }}> {poll.category} </Typography>
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
                        mt: "2rem",
                        mb: "1rem",
                    }}>
                        Asked by {poll.user} about 9 hours ago
                    </Typography>

                    {submitted ? (
                        <Box>
                            {poll.options.map((option, i) => (
                                <Box key={i} sx={{
                                    boxShadow: largestIndex===i ? '0 7px 14px 0 rgba(118, 236, 233, 0.2)' : '0 7px 14px 0 rgba(0, 0, 0, 0.07)',
                                    borderRadius: "7px",
                                    p: "2rem 4rem",
                                    backgroundColor: "#ffffff",
                                    m: "2rem 0",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    ml: largestIndex===i && "2.5rem",
                                    transform: largestIndex===i ? 'scale(1.05)' : 'scale(1)',
                                    border: largestIndex===i && '3px solid #76ECE9',
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
                                        }}> {option.text} </Typography>
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
                            {poll.options.map((option, index) => (
                                <motion.div key={index}
                                    variants={variants}
                                    animate={isSelected(index) ? "open" : "closed"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Box onClick={() => handleOptionSelect(index)} sx={{
                                        boxShadow: isSelected(index) ? '0 7px 14px 0 rgba(74, 217, 127, 0.2)' : '0 7px 14px 0 rgba(0, 0, 0, 0.07)',
                                        borderRadius: "7px",
                                        p: "2rem 4rem",
                                        backgroundColor: "#ffffff",
                                        m: "2rem 0",
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        border: isSelected(index) && '2.5px solid #4AD97F',
                                        ':hover': {
                                            cursor: 'pointer',
                                            boxShadow: '0px 10px 44px 10px rgb(233, 235, 243)'
                                        }
                                    }}
                                    >
                                        {isSelected(index) ? (
                                            <svg height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect fill="#4ad97f" height="36" rx="18" width="36" /><path d="m11.8703205 17.5433483-.1-.1v-4.8452366c0-1.049341-.850659-1.9-1.90000002-1.9s-1.9.850659-1.9 1.9v6.3833313c0 .0378714.00110676.0756044.00328903.125259-.00218958.0350713-.00328903.0703132-.00328903.1056937 0 .9217894.74725795 1.6690473 1.66904733 1.6690473h16.46190539c.9217893 0 1.6690473-.7472579 1.6690473-1.6690473s-.747258-1.6690474-1.6690473-1.6690474z" fill="#fff" stroke="#4ad97f" strokeWidth=".2" transform="matrix(.66913061 -.74314483 .74314483 .66913061 -5.655914 18.876162)" /></g></svg>
                                        ) : (
                                            <svg height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" fillRule="evenodd" height="32.5" rx="16.25" stroke="#e4e4e4" strokeWidth="3.5" width="32.5" x="1.75" y="1.75" /></svg>
                                        )}
                                        <Typography variant="h4" sx={{
                                            color: "#333333",
                                            fontWeight: "700",
                                            ml: "1rem",
                                        }}> {option.text} </Typography>
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{
                    width: "28%",
                    display: 'flex',
                    flexDirection: 'column',
                    pt: "4rem",
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


                    <Box sx={{
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box sx={{
                            p: '2rem 3rem 1rem',
                        }}>
                            <Typography variant='body1' sx={{
                                color: '#b1b1b1',
                                fontWeight: '600',
                            }}>Votes</Typography>
                            <Typography variant='h3' sx={{
                                color: '#333333',
                                fontWeight: '700',
                                mt: '1rem',
                            }}>{poll.totalVotes}</Typography>
                        </Box>

                        <Divider sx={{
                            width: '100%',
                            height: '5px',
                        }} />

                        <Box sx={{
                            p: '2rem 3rem',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant='body1' sx={{
                                color: '#b1b1b1',
                                fontWeight: '600',
                            }}>Share</Typography>

                            <Box sx={{
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

                            <Box sx={{
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
    )
};