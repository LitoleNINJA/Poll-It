import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

export default function ShareLink({ setLinkModal }) {
    
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 1000);
    }

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#ffffff',
            p: '3rem',
            borderRadius: '8px',
        }}>
            <Typography variant="h4" sx={{
                color: '#333333',
                fontWeight: '700',
            }}>
                Share Link
            </Typography>
            <Typography variant="body1" sx={{
                color: '#b1b1b1',
                fontWeight: '600',
                mt: '2rem',
            }}>
                Poll Link
            </Typography>

            <Box sx={{
                backgroundColor: '#f8f8f8',
                p: '1.5rem',
                pr: '0',
                borderRadius: '5px',
                mt: '0.5rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant="body1" sx={{
                    color: '#555555',
                    fontWeight: '600',
                }}>
                    http://localhost:3000/poll/11
                </Typography>
                <Button onClick={handleCopy} sx={{
                    p: '0',
                }}>
                    <Tooltip title="Copied !" open={tooltipOpen} placement='top' arrow >
                        <ContentCopyIcon sx={{
                            color: '#009AFF',
                            cursor: 'pointer',
                        }} />
                    </Tooltip>
                </Button>
            </Box>

            <CloseIcon onClick={() => setLinkModal(false)} sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                cursor: 'pointer',
                color: '#009AFF',
                fontSize: '2rem',
            }} />
        </Box>
    )
};