import React, { useState } from "react";
import "./Post.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostForm = (props) => {
  const { userId, userName, refreshPosts } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const vertical = "top";
  const horizontal = "center";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  return (
    <div className="postContainer">
      <Snackbar
        open={isSent}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your post is sent!!!
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "aliceblue",
            marginTop: "0.5rem",
            height: "25vh",
            display: "flex",
            flexWrap: "wrap",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ width: "100vw" }}>
            <CardHeader
              sx={{ textAlign: "left" }}
              avatar={
                <Link className="link" to={{ pathname: "/users/" + userId }}>
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                    aria-label="recipe"
                  >
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              }
              title={
                <OutlinedInput
                  id="outlined-adornment-amount"
                  multiline
                  placeholder="Title"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  value={title}
                  onChange={(i) => handleTitle(i.target.value)}
                ></OutlinedInput>
              }
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "left" }}
                component={"span"}
              >
                <OutlinedInput
                  id="outlined-adornment-amount"
                  multiline
                  placeholder="Text"
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  value={text}
                  onChange={(i) => handleText(i.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        style={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          color: "white",
                        }}
                        onClick={handleSubmit}
                      >
                        Post
                      </Button>
                    </InputAdornment>
                  }
                ></OutlinedInput>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default PostForm;
