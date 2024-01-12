import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export async function getServerSideProps() {
  const res = await axios.get("/api/polls");
  const polls = res.data;
  return { props: { polls } };
}

export default function Home(props) {
  const router = useRouter();
  const cookies = parseCookies();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("Recent");
  const [polls, setPolls] = useState(props.polls);
  const menuRef = useRef(null);

  useEffect(() => {
    if (cookies.user) {
      setUser(JSON.parse(cookies.user));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const public_polls = props.polls.filter((poll) => poll.visibility === "Public");
    if (filter === "Recent") {
      setPolls(
        public_polls.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
    } else if (filter === "Popular") {
      setPolls(public_polls.sort((a, b) => b.total_votes - a.total_votes));
    } else if (filter === "My Polls") {
      setPolls(props.polls.filter((poll) => poll.username === user.username).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }
    router.replace(router.asPath);
  }, [filter]);

  const getTime = (poll) => {
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
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fafafa",
        p: {sm: "5rem 0", xs: '2rem 0'},
      }}
    >
      <Box
        sx={{
          width: { lg: "50%", xs: "90%" },
          m: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Page Header with Filter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Header */}
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
              variant="body2"
              sx={{
                color: "#b1b1b1",
                fontWeight: "500",
                mt: "1rem",
              }}
            >
              Polls created by {filter === 'My Polls' ? 'You' : 'Poll It users'}.
            </Typography>
          </Box>

          {/* Filter Polls Menu */}
          <Box
            onClick={() => setShowMenu(!showMenu)}
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: !showMenu ? "#F1F1F1" : "#ffffff",
              height: "fit-content",
              p: "0.5rem 1rem",
              borderRadius: "5px",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#333333",
                fontWeight: "600",
                mr: "1rem",
              }}
            >
              {filter}
            </Typography>
            <KeyboardArrowDownIcon />

            {showMenu && (
              <Box
                ref={menuRef}
                sx={{
                  width: {sm: "10rem"},
                  position: "absolute",
                  display: "flex",
                  top: "3rem",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  p: "1rem 0",
                  boxShadow: "0 4px 21px 0 rgba(49, 49, 49, 0.2)",
                  borderRadius: "6px",
                  zIndex: "10",
                }}
              >
                {user && (
                  <Typography
                    variant="body1"
                    onClick={() => setFilter("My Polls")}
                    sx={{
                      color: "#585D75",
                      fontWeight: "500",
                      p: "0.5rem 1.5rem",
                      ":hover": {
                        cursor: "pointer",
                        color: "#4199FF",
                      },
                    }}
                  >
                    My Polls
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  onClick={() => setFilter("Recent")}
                  sx={{
                    color: "#585D75",
                    fontWeight: "500",
                    p: "0.5rem 1.5rem",
                    ":hover": {
                      cursor: "pointer",
                      color: "#4199FF",
                    },
                  }}
                >
                  Recent
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => setFilter("Popular")}
                  sx={{
                    color: "#585D75",
                    fontWeight: "500",
                    p: "0.5rem 1.5rem",
                    ":hover": {
                      cursor: "pointer",
                      color: "#4199FF",
                    },
                  }}
                >
                  Popular
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Polls */}
        {polls &&
          polls.map((poll) => (
            <motion.div
              initial={{ y: 200, scale: 0.9, opacity: 0.5 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.8 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              key={poll.id}
            >
              <Link href="/poll/[poll_id]"
                as={poll.visibility === 'Private' ? `/poll/${poll.url}` : `/poll/${poll.id}`}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: {sm: "3rem 4rem", xs: "2rem"},
                    mt: "4rem",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 7px 14px rgba(0, 0, 0, 0.07)",
                    borderRadius: "7px",
                    position: "relative",
                    ":hover": {
                      boxShadow: "0px 10px 44px 10px rgb(233, 235, 243)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
                      borderRadius: "6px",
                      p: "0.5rem",
                      backgroundColor: "#83ffb5",
                      mb: "1rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "700",
                        color: "#333333",
                      }}
                    >
                      Category
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#333333",
                      fontWeight: "700",
                    }}
                  >
                    {poll.question}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: "1rem",
                      color: "#b1b1b1",
                      fontWeight: "500",
                    }}
                  >
                    Created {getTime(poll)}
                  </Typography>

                  <Box
                    sx={{
                      position: "absolute",
                      right: "-20px",
                      top: "-20px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        border: "3px solid #4ad97f",
                        boxShadow: "0px 7px 14px rgba(74, 217, 127, 0.2)",
                        borderRadius: "25px",
                        fontWeight: "700",
                        color: "#678873",
                        p: "0.5rem 1rem",
                        backgroundColor: "#F7FFFA",
                      }}
                    >
                      Votes : {poll.total_votes}
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
