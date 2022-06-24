import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function Home({ polls }) {

  return (
    <Box sx={{
      width: "100%",
      backgroundColor: "#fafafa",
      p: "5rem 0",
    }}
    >
      <Box sx={{
        width: "50%",
        m: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#333333",
                fontWeight: "700",
              }}
            >
              Public Polls
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#b1b1b1",
                fontWeight: "500",
                mt: "1rem",
              }}
            >
              Polls created by Poll It users.
            </Typography>
          </Box>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          >
            recent
          </Box>
        </Box>

        {polls && polls.map(poll => (
          <motion.div
            initial={{ y: 200, scale: 0.9, opacity: 0.5 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ ease: 'easeIn', duration: 0.8 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            key={poll.id}
          >
            <Link href="/poll/[poll_id]" as={`/poll/${poll.id}`}  >
              <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: "3rem 4rem",
                mt: "4rem",
                backgroundColor: "#ffffff",
                boxShadow: "0px 7px 14px rgba(0, 0, 0, 0.07)",
                borderRadius: "7px",
                position: "relative",
                ':hover': {
                  boxShadow: "0px 10px 44px 10px rgb(233, 235, 243)",
                  cursor: "pointer",
                }
              }}>
                <Box sx={{
                  width: 'fit-content',
                  borderRadius: "6px",
                  p: "0.5rem",
                  backgroundColor: "#83ffb5",
                  mb: "1rem",
                }}><Typography variant="body1" sx={{
                  fontWeight: "700",
                  color: "#333333",
                }} >{poll.category}</Typography></Box>
                <Typography variant="h4" sx={{
                  color: "#333333",
                  fontWeight: "700",
                }}>{poll.question}</Typography>
                <Typography variant="h6" sx={{
                  mt: "1rem",
                  color: '#b1b1b1',
                  fontWeight: '500',
                }}>Created 1h ago</Typography>

                <Box sx={{
                  position: "absolute",
                  right: "-20px",
                  top: "-20px",
                }}>
                  <Typography variant="body1" sx={{
                    border: "3px solid #4ad97f",
                    boxShadow: '0px 7px 14px rgba(74, 217, 127, 0.2)',
                    borderRadius: "25px",
                    fontWeight: "700",
                    color: "#678873",
                    p: "0.5rem 1rem",
                    backgroundColor: "#F7FFFA",
                  }}>
                    Votes : 100
                  </Typography>
                </Box>
              </Box>
            </Link>
          </motion.div>
        ))}

      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("/api/polls");
  const polls = res.data;
  return { props: { polls } };
}

