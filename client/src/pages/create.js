import { useState, useEffect, useRef } from 'react';
import { Button, Divider, Box, Typography, Input, Menu, MenuItem, Checkbox, TextField, Alert } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Link from 'next/link';

export default function create() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const ref = useRef(null);
    useEffect(() => {
        const cookies = parseCookies();
        if (cookies.user) {
            setUser(JSON.parse(cookies.user));
        }
    }, []);

    const [question, setQuestion] = useState('');
    const [optionCount, setOptionCount] = useState(2);
    const [options, setOptions] = useState([]);
    const [visibility, setVisibility] = useState('Private');
    const [multipleVotes, setMultipleVotes] = useState(false);
    const [loginVote, setLoginVote] = useState(false);
    const [comments, setComments] = useState(false);
    const [formError, setFormError] = useState(null);

    const validateForm = () => {
        var error = {}
        console.log(options)
        if(!question) 
            error.question = 'Question is required !';
        if(options.length < 2)
            error.option = 'At least 2 options required !'
        setFormError(error);
        if(Object.keys(error).length > 0)
            return false;
        return true;
    }


    const handleSubmit = async () => {
        if(!validateForm()) {
            setTimeout(() => setFormError(null), 5000);
            return;
        }
        let settings = [];
        if (multipleVotes) {
            settings.push('Allow multiple votes');
        }
        if (loginVote) {
            settings.push('Login vote');
        }
        if (comments) {
            settings.push('Allow comments');
        }

        const { data } = await axios.post('/api/polls', {
            question: question,
            visibility: visibility,
            settings: settings,
            username: user ? user.username : null,
            voters: [],
        });
        await axios.post('/api/option', {
            options: options,
            pollId: data.id
        });

        router.push('/poll/[id]', `/poll/${data.id}`);
    }

    return (
        <>
            <Divider />
            <Box sx={{
                pt: { lg: '5rem', xs: '2rem' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
            }}>
                <Box sx={{
                    width: { lg: '53rem', xs: '80%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>
                    <Typography variant="h3" sx={{
                        fontWeight: '700',
                        mb: { lg: '1rem', xs: '0.5rem' },
                    }}>Create a Poll</Typography>
                    <Typography variant="body1" sx={{
                        fontWeight: '500',
                        color: '#b1b1b1',
                        mb: '2rem',
                    }}>
                        Fill the fields below to create a poll.
                    </Typography>

                    {/* Poll Question */}
                    <Box ref={ref} sx={{
                        width: '100%',
                    }}>
                        <Typography variant="body1" sx={{
                            fontWeight: '600',
                            color: '#929292',
                            mb: '0.5rem',
                        }}>
                            Poll Question
                        </Typography>
                        {Boolean(formError) && ref.current.scrollIntoView({ behavior: 'smooth' })}
                        <TextField placeholder='Eg. Who will win today ?' multiline rows={4}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            error={Boolean(formError) && Boolean(formError.question)}
                            helperText={Boolean(formError) && Boolean(formError.question) && formError.question}
                            FormHelperTextProps={{
                                style: {
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    border: 0,
                                }
                            }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                borderRadius: '5px',
                                fontWeight: '600',
                            }} />
                    </Box>


                    {/* Poll Options */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: '1rem',
                        width: '100%',
                    }}>
                        {[...Array(optionCount)].map((_, i) => (
                            <Box key={i} sx={{
                                mt: { lg: '2rem', xs: '1rem' },
                            }}>
                                <Typography variant="body1" sx={{
                                    fontWeight: '600',
                                    color: '#929292',
                                    mb: '0.5rem',
                                }}>
                                    Poll Option
                                </Typography>
                                <Input placeholder={'Option ' + (i + 1)} disableUnderline
                                    onChange={(e) => { options[i] = e.target.value; setOptions(options); }}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#ffffff',
                                        p: { md: '1rem', xs: '0.5rem' },
                                        border: '2px solid transparent',
                                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                        borderRadius: '5px',
                                        fontWeight: '500',
                                    }} />
                            </Box>
                        ))}
                        {Boolean(formError) && Boolean(formError.option) && (
                            <Alert variant='filled' severity='error' sx={{
                                fontSize: {xs: '0.6rem', md: '0.85rem'},
                                p: {xs: '0 6px', md: '16px 6px'},
                                width: 'max-content',
                                mt: '1rem',
                            }}>{formError.option}</Alert>
                        )}
                    </Box>


                    {/* Add / Remove Options */}
                    <Box sx={{
                        width: {xs: '100%', md: 'auto'},
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Button variant='contained' size='large'
                            onClick={() => { setOptionCount(optionCount + 1) }}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#4199ff',
                                m: '2rem 0',
                            }}><Typography variant='body1' sx={{
                                fontWeight: '600',
                            }}>+ Add Option</Typography>
                        </Button>

                        {optionCount > 2 && (
                            <Button variant='contained' size='large'
                                onClick={() => {
                                    if (optionCount > 2) {
                                        setOptionCount(optionCount - 1)
                                    }
                                }}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#ff5252',
                                    m: {md: '2rem 4rem', xs:'2rem 1rem'},
                                    ':hover': {
                                        backgroundColor: '#c62f2f',
                                    }
                                }}><Typography variant='body1' sx={{
                                    fontWeight: '600',
                                }}>Remove Option -</Typography></Button>
                        )}
                    </Box>

                    <Divider sx={{
                        width: '100%',
                        height: '5px',
                    }} />


                    {/* Poll Visibility */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        mt: '2rem',
                    }}>
                        <Box sx={{
                            width: { lg: '48%', xs: '50%' },
                        }}>
                            <Typography variant="body1" sx={{
                                fontWeight: '600',
                                color: '#929292',
                                mb: '0.5rem',
                            }}>
                                Poll Visibility
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                name='visibility'
                                margin='dense'
                                variant='outlined'
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                            >
                                {!user ? (
                                    <Link href='login'>
                                        <MenuItem>Public (Login to create Public Polls)</MenuItem>
                                    </Link>
                                ) : (
                                    <MenuItem value='Public'>Public</MenuItem>
                                )}
                                <MenuItem value='Private'>Private</MenuItem>
                            </TextField>
                        </Box>
                    </Box>


                    {/* Poll Settings */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        mt: { lg: '3rem', xs: '1rem' },
                    }}>
                        <Typography variant="body1" sx={{
                            fontWeight: '600',
                            color: '#929292',
                            mb: '0.5rem',
                        }}>Poll Settings</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                            <Box onClick={() => setMultipleVotes(!multipleVotes)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: { md: '0.5rem' },
                                    pr: '1rem',
                                    border: '2px solid transparent',
                                    boxShadow: multipleVotes ? '0 6px 10px 0 rgba(65,153,255,0.15)' : '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                <Checkbox onChange={() => setMultipleVotes(!multipleVotes)} checked={multipleVotes} />
                                <Typography variant='body1' sx={{
                                    color: multipleVotes ? '#009aff' : '#5f5f5f',
                                    fontWeight: '600',
                                }}>Allow Multiple Votes</Typography>
                            </Box>

                            <Box onClick={() => setLoginVote(!loginVote)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: { md: '0.5rem' },
                                    pr: '1rem',
                                    m: '1rem 0',
                                    border: '2px solid transparent',
                                    boxShadow: loginVote ? '0 6px 10px 0 rgba(65,153,255,0.15)' : '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                <Checkbox onChange={() => setLoginVote(!loginVote)} checked={loginVote} />
                                <Typography variant='body1' sx={{
                                    color: loginVote ? '#009aff' : '#5f5f5f',
                                    fontWeight: '600',
                                }}>Login to Vote</Typography>
                            </Box>

                            <Box onClick={() => setComments(!comments)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: { md: '0.5rem' },
                                    pr: '1rem',
                                    mr: '1.5rem',
                                    border: '2px solid transparent',
                                    boxShadow: comments ? '0 6px 10px 0 rgba(65,153,255,0.15)' : '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                <Checkbox onChange={() => setComments(!comments)} checked={comments} />
                                <Typography variant='body1' sx={{
                                    color: comments ? '#009aff' : '#5f5f5f',
                                    fontWeight: '600',
                                }}>Allow Comments</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{
                        width: '100%',
                        height: '5px',
                        mt: '2rem',
                    }} />

                    <Button variant='contained' size='large' onClick={handleSubmit}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: '#41db7b',
                            m: { md: '2rem 0', xs: '1rem auto' },
                            p: '1rem 2.5rem',
                            ':hover': {
                                backgroundColor: '#3bbd6c',
                            }
                        }}><Typography variant='h5' sx={{
                            fontWeight: '600',
                        }}>Create Poll</Typography></Button>
                </Box>
            </Box>
        </>
    )
}
