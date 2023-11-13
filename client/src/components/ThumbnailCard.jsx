import UserAvatar from "./UserAvatar"

import { Paper, Grid, Box, Typography, Tooltip, IconButton, Button } from "@mui/material"

const ThumbnailCard = () => {
    return (
        <Grid item xs={4}>
            <Paper square elevation={3}>
                <Button 
                    sx={{
                    padding: 0
                    }}
                >
                    <img src="https://tcproduction.blob.core.windows.net/media/%7B240f8b72-1159-4fd3-a150-0a837f50ba4a%7D.2573758641_297d6d19fa_o.jpg" alt="Video Thumbnail" className="cardThumbnail" />
                </Button>
                <Box paddingX={1}>
                    <Box 
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box paddingY={1}>
                        <Typography 
                            variant="h6" 
                            component="h2"
                        >
                            Video Title Super Awesome
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
                            58k views - 5 hours ago
                        </Typography>
                        </Box>
                        <Tooltip title="Username">
                            <IconButton>
                                <UserAvatar />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default ThumbnailCard