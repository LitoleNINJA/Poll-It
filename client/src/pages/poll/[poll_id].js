import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Post() {
    const router = useRouter()
    const { poll_id } = router.query;
    const poll = {
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
        category: 'Social',
        visibility: 'Public',
        settings: ['Allow multiple votes', 'Allow comments'],
        voters: ['1', '2'],
        user: 'John Doe'
    }
    const variants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(o => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
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
                    width: "67%",
                    display: 'flex',
                    outline: '1px solid blue',
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
                    }}>What's the nature of your involvement in crypto/blockchain?</Typography>

                    <Typography variant="body1" sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: "#b1b1b1",
                        fontWeight: "500",
                        mt: "2rem",
                        mb: "1rem",
                    }}>
                        Asked by  <Typography variant="body1" sx={{
                            color: "#575757",
                            m: "0 0.5rem",
                        }}> {poll.user} </Typography>
                        about 9 hours ago
                    </Typography>

                    {poll.options.map((option, index) => (
                        <motion.div key={index}
                            variants={variants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Box onClick={handleOptionSelect} sx={{
                                boxShadow: '0 7px 14px 0 rgba(0, 0, 0, 0.07)',
                                borderRadius: "7px",
                                p: "2rem 4rem",
                                backgroundColor: "#ffffff",
                                m: "1rem 0",
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0px 10px 44px 10px rgb(233, 235, 243)'
                                }
                            }}
                            >
                                <svg height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" fillRule="evenodd" height="32.5" rx="16.25" stroke="#e4e4e4" strokeWidth="3.5" width="32.5" x="1.75" y="1.75" /></svg>
                                <Typography variant="h4" sx={{
                                    color: "#333333",
                                    fontWeight: "700",
                                    ml: "1rem",
                                }}> {option.text} </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </Box>

                <Box sx={{
                    width: "28%",
                    display: 'flex',
                    flexDirection: 'column',
                    outline: '1px solid red',
                }}></Box>
            </Box>
        </Box>
    )
};