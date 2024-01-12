import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, Fab } from "@mui/material";

export default function ScrollTop() {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPos(window.pageYOffset);
        };
        window.addEventListener("scroll", updatePosition);

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    const goToTop = () => {
        document.documentElement.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {scrollPos > 100 &&
                <Fab
                    sx={{
                        position: 'fixed',
                        top: '88vh',
                        right: '2vw',
                        bgcolor: '#83ffb5',
                        ":hover": {
                            bgcolor: '#83ffb5'
                        }
                    }}
                    component={motion.button}
                    onClick={goToTop}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: 0, opacity: 1,
                        transition: { duration: 0.6 }
                    }}
                    exit={{
                        y: 100, opacity: 0,
                        transition: { duration: 0.6 }
                    }}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 1 }}
                >
                    <ArrowUpwardIcon />
                </Fab>}
        </AnimatePresence>
    );
}
