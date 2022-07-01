import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import LargeQR from "./LargeQR";

export default function ShareQR() {

    const [qr, setQr] = useState(null);
    const [large, setLarge] = useState(false);
    useEffect(() => {
        setQr(`http://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}!&size=450x450`);
    }, []);



    return (
        <>
            {large ? (<LargeQR qr={qr} setLarge={setLarge} />) : (
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
                        QR Code
                    </Typography>
                    <Typography variant="body1" sx={{
                        color: '#b1b1b1',
                        fontWeight: '600',
                        mt: '0.5rem',
                    }}>
                        The QR code is unique to this poll.
                    </Typography>

                    {qr && (
                        <Box sx={{
                            mt: '1rem',
                            bgcolor: '#F5F5F5',
                            borderRadius: '6px',
                            p: '2rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                bgcolor: '#ffffff',
                                borderRadius: '6px',
                                p: '0.5rem',
                            }}>
                                <Image src={qr} width='160px' height='160px' />
                            </Box>
                        </Box>
                    )}

                    <Button variant="contained" onClick={() => setLarge(true)} sx={{
                        width: '100%',
                        textTransform: 'none',
                        backgroundColor: '#009AFF',
                        m: '2rem 0',
                        p: '1rem 2.5rem',
                        ':hover': {
                            backgroundColor: '#0085dd',
                        }
                    }}>Show Larger Preview</Button>

                    <CloseIcon sx={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        cursor: 'pointer',
                        color: '#009AFF',
                        fontSize: '2rem',
                    }} />
                </Box>
            )}
        </>
    )
}
