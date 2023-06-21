import React from 'react';
import { Box, Button, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ForumIcon from '@mui/icons-material/Forum';
import Dimg1 from '../assets/DataScienceImg.png';
import Dimg2 from '../assets/DigitalMktImg.png';
import Dimg3 from '../assets/SE_Img.png';

const Card = ({ imgSrc, altText, primaryText, buttonText }) => (
<ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
    <img src={imgSrc} alt={altText} />
    <ListItemText primary={primaryText} />
    <Button variant='contained' color='primary'>{buttonText}</Button>
</ListItem>
);

const DepartmentList = () => (
<List sx={{display:'flex'}}>
    <Card imgSrc={Dimg3} altText="SE" primaryText="Software Engineering" buttonText="Join" />
    <Card imgSrc={Dimg1} altText="Computer Science" primaryText="Computer Science" buttonText="Join" />
    <Card imgSrc={Dimg2} altText="Data Science" primaryText="Data Science" buttonText="Join" />
</List>
);

const GroupList = () => (
<List  sx={{display:'flex'}}>
    <Card imgSrc={Dimg1} altText="Computer Science" primaryText="Computer Science" buttonText="Join" />
    <Card imgSrc={Dimg2} altText="Data Science" primaryText="Data Science" buttonText="Join" />
    <Card imgSrc={Dimg3} altText="Digital" primaryText="Digital Marketing" buttonText="Join" />
</List>
);

const CommunityPage = () => {
return (
<Box p={5} sx={{width:'100%', boxSizing:'border-box', overflow:'unset'}}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ borderBottom: '2px solid' }}>Welcome To CollaboratEd Community!</Typography>
    </Box>
    <Stack style={{ justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ width: '100%' }}>
            <Typography variant="h5">Institutions</Typography>
            <Stack sx={{ display: 'flex', borderBottom: '2px solid', justifyContent: 'space-evenly' }} direction="row">
                <List>
                    <Card imgSrc={Dimg3} altText="SE" primaryText="ALX" />
                </List>
                <List>
                    <Card imgSrc={Dimg1} altText="UniLag" primaryText="University Of Lagos" />
                </List>
                <List>
                    <Card imgSrc={Dimg2} altText="Data Science" primaryText="Microverse" />
                </List>
                <ArrowForwardIosIcon sx={{ fontSize: 'large', alignSelf: 'center' }} />
            </Stack>
            <br />
            
            <Typography variant="h5">Departments</Typography>
            <Stack sx={{ display: 'flex', borderBottom: '2px solid', justifyContent: 'space-evenly' }} direction="row">
                <DepartmentList />
                <ArrowForwardIosIcon sx={{ fontSize: 'large', alignSelf: 'center' }} />
            </Stack>
            <br />
            <Divider />
            <br />

            <Typography variant="h5">Peer Learning Groups</Typography>
            <Stack sx={{ display: 'flex', borderBottom: '2px solid', justifyContent: 'space-evenly' }} direction="row">
                <GroupList />
                <ArrowForwardIosIcon sx={{ fontSize: 'large', alignSelf: 'center' }} />
            </Stack>
            <br />
            <Divider />

            <Typography variant="h5">Community Forum</Typography>
            <ForumIcon sx={{ fontSize: 'large' }} />
            <span>Ask questions, get answers, and engage with our large network of users.</span>
        </List>
    </Stack>
</Box>
);
};

export default CommunityPage;