import React from "react";
import { Avatar, IconButton } from "@mui/material";

const ProfileAvatar = ({ profile }) => {

    // const initial = profile.username.charAt(0).toUpperCase();
    return (
      <Avatar
      profile={ profile }
        sx={{ width: 38, height: 38, backgroundColor: "#bd279f" }}
      >
        <IconButton sx={{ width: 38, height: 38, fontSize: "1.1rem" }}>
          {/* {initial} */}
        </IconButton>
      </Avatar>
    );
};

export default ProfileAvatar;
