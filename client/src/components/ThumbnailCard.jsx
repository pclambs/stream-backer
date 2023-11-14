import UserAvatar from "./UserAvatar"
import { useNavigate } from "react-router-dom"
import { Paper, Grid, Box, Typography, Tooltip, IconButton, Button } from "@mui/material"
import { formatDistanceToNow } from "date-fns"

const ThumbnailCard = ({ videoPost }) => {
    const { thumbnail, title, createdAt, postedBy } = videoPost

    const timestamp = Number(createdAt)
    const date = new Date(timestamp)
    const relativeTime = formatDistanceToNow(date, { addSuffix: true })

    const navigate = useNavigate()
    const videoPath = () => {
        let path = `/video/${videoPost._id}`
        navigate(path)
    }


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 0 }}>
                <Button onClick={videoPath}
                    sx={{
                        padding: 0
                    }}
                >
                    {/* TODO: Add thumbnails to data */}
                    <img src="https://tcproduction.blob.core.windows.net/media/%7B240f8b72-1159-4fd3-a150-0a837f50ba4a%7D.2573758641_297d6d19fa_o.jpg" alt="Video Thumbnail" className="cardThumbnail" />
                </Button>
                <Box paddingX={1}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 0
                        }}
                    >
                        <Box sx={{ maxWidth: 'calc(100% - 50px)'}}>
                            <Typography
                                variant="h6"
                                component="h2"
                                padding={0}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    lineHeight: "2rem",
                                  }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                marginY={0}
                                variant="body2"
                                component="p"
                                sx={{
                                    fontStyle: 'italic',
                                    color: "grey",
                                    fontSize: "0.8rem",
                                    lineHeight: "1rem",
                                    padding: '0 0 .2rem 0',
                                    transform: 'translateY(-.2rem)',
                                }}
                            >
                                {relativeTime}
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