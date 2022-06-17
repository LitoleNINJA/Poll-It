import { useState } from 'react';
import { Button, Divider, Box, Typography, Input, Menu, MenuItem, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function create() {

    const [anchor1, setAnchor1] = useState(null);
    const [anchor2, setAnchor2] = useState(null);
    const menuOpen1 = Boolean(anchor1);
    const menuOpen2 = Boolean(anchor2);
    const handleMenu1 = (event) => {
        setTag(event.target.innerText);
        setAnchor1(null);
    }
    const handleMenu2 = (event) => {
        setVisibility(event.target.innerText);
        setAnchor2(null);
    }


    const [question, setQuestion] = useState('');
    const [optionCount, setOptionCount] = useState(2);
    const [options, setOptions] = useState([]);
    const [tag, setTag] = useState('Eg. Food');
    const [visibility, setVisibility] = useState('Private');
    const [multipleVotes, setMultipleVotes] = useState(false);
    const [loginVote, setLoginVote] = useState(false);
    const [comments, setComments] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [date, setDate] = useState(null);

    const handleSubmit = () => {
        console.log(options);
        // console.log(question);
    }

    return (
        <>
            <Divider />
            <Box sx={{
                pt: '5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
            }}>
                <Box sx={{
                    width: '53rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>
                    <Typography variant="h3" sx={{
                        fontWeight: '700',
                        mb: '1rem',
                    }}>Create a Poll</Typography>
                    <Typography variant="body1" sx={{
                        fontWeight: '500',
                        color: '#b1b1b1',
                        mb: '2rem',
                    }}>
                        Fill the fields below to create a poll.
                    </Typography>

                    <Box sx={{
                        width: '100%',
                    }}>
                        <Typography variant="body1" sx={{
                            fontWeight: '600',
                            color: '#929292',
                            mb: '0.5rem',
                        }}>
                            Poll Question
                        </Typography>
                        <Input placeholder='Eg. Who will win today ?' disableUnderline multiline rows={4}
                            onChange={(e) => setQuestion(e.target.value)}
                            sx={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                p: '1rem',
                                border: '2px solid transparent',
                                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                borderRadius: '5px',
                                fontWeight: '600',
                            }} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: '1rem',
                        width: '100%',
                    }}>
                        {[...Array(optionCount)].map((_, i) => (
                            <Box key={i} sx={{
                                mt: '2rem',
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
                                        p: '1rem',
                                        border: '2px solid transparent',
                                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                        borderRadius: '5px',
                                        fontWeight: '500',
                                    }} />
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Button variant='contained' size='large'
                            onClick={() => { setOptionCount(optionCount + 1) }}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#4199ff',
                                m: '2rem 0',
                            }}><Typography variant='body1' sx={{
                                fontWeight: '600',
                            }}>Add another Option +</Typography></Button>

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
                                    m: '2rem 4rem',
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

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        mt: '2rem',
                    }}>
                        <Box sx={{
                            width: '48%',
                        }}>
                            <Typography variant="body1" sx={{
                                fontWeight: '600',
                                color: '#929292',
                                mb: '0.5rem',
                            }}>
                                Poll Category
                            </Typography>
                            <Box onClick={(e) => setAnchor1(e.currentTarget)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: '1rem',
                                    border: '2px solid transparent',
                                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <Typography variant="body1" sx={{
                                    fontWeight: '500',
                                    flexGrow: 1,
                                }}>{tag}</Typography>
                                <KeyboardArrowDownIcon />
                            </Box>
                            <Menu
                                anchorEl={anchor1}
                                open={menuOpen1}
                                onClose={() => setAnchor1(null)}
                                PaperProps={{
                                    style: {
                                        width: '22vw',
                                    },
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleMenu1}>Animals</MenuItem>
                                <MenuItem onClick={handleMenu1}>Art</MenuItem>
                                <MenuItem onClick={handleMenu1}>Books</MenuItem>
                                <MenuItem onClick={handleMenu1}>Colors</MenuItem>
                                <MenuItem onClick={handleMenu1}>Food</MenuItem>
                                <MenuItem onClick={handleMenu1}>Gaming</MenuItem>
                                <MenuItem onClick={handleMenu1}>Health</MenuItem>
                                <MenuItem onClick={handleMenu1}>History</MenuItem>
                                <MenuItem onClick={handleMenu1}>Movies</MenuItem>
                                <MenuItem onClick={handleMenu1}>Music</MenuItem>
                                <MenuItem onClick={handleMenu1}>News</MenuItem>
                                <MenuItem onClick={handleMenu1}>Politics</MenuItem>
                                <MenuItem onClick={handleMenu1}>Random</MenuItem>
                                <MenuItem onClick={handleMenu1}>Science</MenuItem>
                                <MenuItem onClick={handleMenu1}>Social</MenuItem>
                                <MenuItem onClick={handleMenu1}>Sports</MenuItem>
                                <MenuItem onClick={handleMenu1}>Time</MenuItem>
                                <MenuItem onClick={handleMenu1}>TV</MenuItem>
                                <MenuItem onClick={handleMenu1}>Web</MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{
                            width: '48%',
                        }}>
                            <Typography variant="body1" sx={{
                                fontWeight: '600',
                                color: '#929292',
                                mb: '0.5rem',
                            }}>
                                Poll Visibility
                            </Typography>
                            <Box onClick={(e) => setAnchor2(e.currentTarget)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: '1rem',
                                    border: '2px solid transparent',
                                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <Typography variant="body1" sx={{
                                    fontWeight: '500',
                                    flexGrow: 1,
                                }}>{visibility}</Typography>
                                <KeyboardArrowDownIcon />
                            </Box>
                            <Menu
                                anchorEl={anchor2}
                                open={menuOpen2}
                                onClose={() => setAnchor2(null)}
                                PaperProps={{
                                    style: {
                                        width: '22vw',
                                    },
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleMenu2}>Public</MenuItem>
                                <MenuItem onClick={handleMenu2}>Private</MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        m: '2rem 0',
                    }}>
                        <Typography variant="body1" sx={{
                            fontWeight: '600',
                            color: '#929292',
                            mb: '0.5rem',
                        }}>Poll Options</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <Box onClick={() => setMultipleVotes(!multipleVotes)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: '0.5rem',
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
                                    p: '0.5rem',
                                    pr: '1rem',
                                    m: '0 1.5rem',
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
                                    p: '0.5rem',
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

                            <Box onClick={() => setEndDate(!endDate)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    p: '0.5rem',
                                    pr: '1rem',
                                    m: '1.5rem 0 1.5rem',
                                    border: '2px solid transparent',
                                    boxShadow: endDate ? '0 6px 10px 0 rgba(65,153,255,0.15)' : '0 2px 4px 0 rgba(0,0,0,0.06)',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    ':hover': {
                                        cursor: 'pointer',
                                    }
                                }}>
                                <Checkbox onChange={() => setEndDate(!endDate)} checked={endDate} />
                                <Typography variant='body1' sx={{
                                    color: endDate ? '#009aff' : '#5f5f5f',
                                    fontWeight: '600',
                                }}>Set End Date</Typography>
                            </Box>

                            {endDate && (
                                <Box sx={{}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Basic example"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Divider sx={{
                        width: '100%',
                        height: '5px',
                    }} />

                    <Button variant='contained' size='large' onClick={handleSubmit}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: '#41db7b',
                            m: '2rem 0',
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
