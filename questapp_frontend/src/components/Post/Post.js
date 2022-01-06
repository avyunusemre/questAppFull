import React, { useRef, useState } from "react";
import "./Post.scss";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useEffect } from "react/cjs/react.development";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: !expand ? "gray" : "#90ee90",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = (props) => {
  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMounth = useRef(true);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isInitialMounth.current) isInitialMounth.current = false;
    else refreshComments();
  }, []);

  useEffect(() => {
    checkLikes();
  }, []);
  return (
    <div className="postContainer">
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "aliceblue",
            marginTop: "0.5rem",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
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
              title={title}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "left" }}
              >
                {text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleLike} aria-label="add to favorites">
                <FavoriteIcon style={isLiked ? { color: "red" } : null} />
              </IconButton>{" "}
              {likeCount}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <CommentIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Container fixed className="container">
                {error
                  ? "error"
                  : isLoaded
                  ? commentList.map((comment) => (
                      <Comment
                        userId={1}
                        userName={"USER"}
                        text={comment.text}
                      ></Comment>
                    ))
                  : "Loading"}
                <CommentForm
                  userId={1}
                  userName={"USER"}
                  postId={postId}
                  refreshComments={refreshComments}
                />
              </Container>
            </Collapse>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default Post;
