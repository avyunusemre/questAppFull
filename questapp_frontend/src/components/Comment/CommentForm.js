import {
  CardContent,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import "./Comment.scss";

const CommentForm = (props) => {
  const { userId, userName, postId, refreshComments } = props;
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    saveComment();
    setText("");
    refreshComments();
  };

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <div>
      <CardContent className="comment">
        <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          fullWidth
          value={text}
          onChange={(i) => handleChange(i.target.value)}
          inputProps={{ maxLength: 250 }}
          startAdornment={
            <InputAdornment
              position="start"
              avatar={
                <Link className="link" to={{ pathname: "/users/" + userId }}>
                  <Avatar className="small" aria-label="recipe">
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              }
            ></InputAdornment>
          }
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
                Send
              </Button>
            </InputAdornment>
          }
          style={{ color: "black", backgroundColor: "white" }}
        ></OutlinedInput>
      </CardContent>
    </div>
  );
};

export default CommentForm;
