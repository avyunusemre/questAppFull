import { CardContent, OutlinedInput, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import "./Comment.scss";

const Comment = (props) => {
  const { text, userId, userName } = props;
  const [error, setError] = useState(null);

  return (
    <div>
      <CardContent className="comment">
        <OutlinedInput
          id="outlined-adornment-amount"
          disabled
          multiline
          fullWidth
          value={text}
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
          style={{ color: "black", backgroundColor: "white" }}
        ></OutlinedInput>
      </CardContent>
    </div>
  );
};

export default Comment;
