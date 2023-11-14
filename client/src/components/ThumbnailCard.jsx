import UserAvatar from "./UserAvatar"
import { useNavigate } from "react-router-dom"
import { Paper, Grid, Box, Typography, Tooltip, IconButton, Button } from "@mui/material"

const ThumbnailCard = ({ videoPost }) => {
    const { thumbnail, title, createdAt, postedBy } = videoPost

    const navigate = useNavigate()
    const videoPath = () => {
        let path = `/video/${videoPost._id}`
        navigate(path)
    }


    return (
        <Grid item xs={4}>
            <Paper square elevation={3}>
                <Button onClick={videoPath}
                    sx={{
                        padding: 0
                    }}
                >
                    {/* TODO: Add thumbnails to data */}
                    <img src="https://tcproduction.blob.core.windows.net/media/%7B240f8b72-1159-4fd3-a150-0a837f50ba4a%7D.2573758641_297d6d19fa_o.jpg" alt="Video Thumbnail" className="cardThumbnail" />
                </Button>
                <Box paddingX={2}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 0
                        }}
                    >
                        <Box paddingY={1}>
                            <Typography
                                variant="h6"
                                component="h2"
                                padding={0}
                            >
                                {title}
                            </Typography>
                            <Typography
                                marginY={0}
                                variant="body2"
                                component="p"
                                sx={{
                                    fontStyle: 'italic',
                                    color: "grey"
                                }}
                            >
                                5 hours ago
                            </Typography>
                        </Box>
                        <Tooltip title={postedBy.username}>
                            <UserAvatar />
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default ThumbnailCard