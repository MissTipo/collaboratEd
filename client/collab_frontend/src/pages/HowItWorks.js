import { Box, Typography } from '@mui/material';

const HowItWorksPage = () => {
  return (
    <Box sx={{ backgroundColor: '#c4d8f59f', padding: '2rem' }}>
        <Box sx={{ backgroundColor: '#ffffff', padding: '2rem' }}>
        <Typography variant="h2" sx={{ marginBottom: '2rem', borderBottom:'2px solid' }}>
            How It Works
        </Typography>

        <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Step 1: Create an Account
            </Typography>
            <Typography variant="body1">
            To get started, visit our website and click on the "Sign Up" button to create an account. Fill in the required
            information and follow the prompts to complete the registration process. Once your account is created, you'll
            be able to access all the features of our CollaboratEd Community.
            </Typography>
        </Box>

        <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Step 2: Explore Departments
            </Typography>
            <Typography variant="body1">
            Once you're logged in, navigate to the "Departments" section to explore different academic departments and
            areas of interest. Click on each department to learn more about it and discover the resources, communities,
            and learning materials available within each department.
            </Typography>
        </Box>

        <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Step 3: Join Learning Communities
            </Typography>
            <Typography variant="body1">
            Within each department, you'll find various learning communities focused on specific topics or subjects. Browse
            through the available learning communities and join the ones that align with your interests and goals. By
            joining a learning community, you'll gain access to discussions, study groups, collaborative projects, and
            additional resources.
            </Typography>
        </Box>

        <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Step 4: Engage and Collaborate
            </Typography>
            <Typography variant="body1">
            Once you've joined a learning community, start engaging with other members by participating in discussions,
            sharing insights, and collaborating on projects. You can post questions, provide answers, and contribute to the
            collective knowledge of the community. This collaborative environment fosters learning, networking, and
            professional growth.
            </Typography>
        </Box>

        <Box>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Step 5: Continue Learning and Growing
            </Typography>
            <Typography variant="body1">
            CollaboratEd Community is a platform designed to support lifelong learning. Take advantage of the resources,
            courses, and materials available within each department and learning community. Continue exploring new topics,
            sharing your knowledge, and connecting with like-minded individuals to enhance your skills and expand your
            horizons.
            </Typography>
        </Box>

        <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="body1">
            If you have any further questions or need assistance, don't hesitate to reach out to our support team. We're
            here to help you make the most out of your CollaboratEd Community experience.
            </Typography>
        </Box>
        </Box>
    </Box>
  );
};

export default HowItWorksPage;
