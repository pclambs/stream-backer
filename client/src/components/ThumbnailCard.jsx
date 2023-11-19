import ProfileAvatar from "./ProfileAvatar"
import { useNavigate, useParams } from "react-router-dom"
import { Paper, Grid, Box, Typography, Tooltip, Button } from "@mui/material"
import { getRelativeTime } from "../utils/helpers"
import Auth from "../utils/auth"
import playBtn from "../assets/stream-backer-play.png"

const ThumbnailCard = ({ videoPost }) => {
	const { _id, thumbnail, title, createdAt, postedBy } = videoPost

	const { profileId } = useParams()
	const loggedInUserId = Auth.getProfile()?.data?._id
	const isMyProfile = profileId === loggedInUserId

	const relativeTime = getRelativeTime(createdAt)

	const navigate = useNavigate()
	const videoPath = () => {
		let path = `/video/${_id}`
		setTimeout(() => {
			navigate(path)
		}, 300)
	}

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper elevation={3} sx={{ p: 0, borderRadius: 0 }}>
				<Button
					onClick={videoPath}
					sx={{
						padding: 0,
						overflow: 'hidden',
						borderRadius: 0,
						position: 'relative',
						'&:hover::before': {
							content: '""',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							backgroundImage: `url(${playBtn})`,
							backgroundSize: 'contain',
							width: '45px',
							height: '50px',
							// opacity: '.9',
							zIndex: 1,
							filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))',
						} 
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
						<Box sx={{ maxWidth: 'calc(100% - 50px)' }}>
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
							<ProfileAvatar profile={postedBy} />
						</Tooltip>
					</Box>
				</Box>
			</Paper>
		</Grid>
	)
}

export default ThumbnailCard