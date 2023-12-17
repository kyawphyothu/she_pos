import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, List, ListItem, Skeleton } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import { deepOrange, lightGreen, red, teal } from '@mui/material/colors';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getAllAlbums } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export default function Album() {
	const [dense, setDense] = useState(false);
	const [secondary, setSecondary] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [albums, setAlbums] = useState([]); //[{id, name}]

	const navigate = useNavigate();

	const handleClickDetail = (id) => {
		navigate(`/album/${id}`);
	}

	useEffect(() => {
		const fetchAlbums = async () => {
			const result = await getAllAlbums();
			if(result.ok){
				setAlbums(result);
				setFetching(false);
			}
		}
		fetchAlbums();
	}, [])

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
				<IconButton onClick={() => navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
				<Button variant='contained' size="small" onClick={() => navigate("/album/create")}>+ New</Button>
			</Box>

			{/* list albums */}
			<>
			<Demo>
				<List dense={dense}>
					{
						fetching ? (
							[1,2,3,4].map((i) => {
								return (
									<ListItem
										key={i}
										secondaryAction={
											<IconButton edge="end">
												<Skeleton animation="wave" variant='circular' width={30} height={30} />
											</IconButton>
										}>
										<ListItemAvatar>
											<Skeleton animation="wave" variant='circular' width={45} height={45} />
										</ListItemAvatar>
										<ListItemText
											primary={<Skeleton animation="wave" height={30} width={"90%"} />}
											secondary={secondary ? 'Secondary text' : null}
										/>
									</ListItem>
								)
							})
						) : (
							albums.map((i) => {
								return (
									<ListItem
										key={i.id}
										secondaryAction={
											<IconButton edge="end" onClick={() => handleClickDetail(i.id)}>
												<ArrowCircleRightIcon />
											</IconButton>
										}>
										<ListItemAvatar>
											<Avatar sx={{ bgcolor: lightGreen[300] }}>
												<FolderSharedOutlinedIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={i.name}
											secondary={secondary ? 'Secondary text' : null}
										/>
									</ListItem>
								)
							})
						)
					}
				</List>
			</Demo>
			</>
		</>
	)
}
