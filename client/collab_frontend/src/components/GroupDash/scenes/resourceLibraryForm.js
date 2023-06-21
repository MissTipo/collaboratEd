import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '5px',
});

const ResourceLibraryForm = () => {
  const [resourceName, setresourceName] = useState('');
  const [resourceType, setResourceType] = useState('text');

  const handleResourceNameChange = (event) => {
    setresourceName(event.target.value);
  };

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle channel creation logic here
    console.log(`Creating ${resourceType} channel "${resourceName}"`);
    // Reset form values
    setresourceName('');
    setResourceType('text');
  };

  const handleCancel = () => {
    // Reset form values
    setresourceName('');
    setResourceType('text');
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <TextField
        label="Resource Name"
        value={resourceName}
        onChange={handleResourceNameChange}
        variant="outlined"
      />
      <FormControl variant="outlined">
        <InputLabel id="resource-type-label">Resource Type</InputLabel>
        <Select
          labelId="resource-type-label"
          value={resourceType}
          onChange={handleResourceTypeChange}
          label="Resource Type"
        >
          <MenuItem value="url">Url Resource</MenuItem>
          <MenuItem value="pdf">Pdf Resource</MenuItem>
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" type="submit" sx={{ minWidth: '120px' }}>
          Upload Resource
        </Button>
        <Button variant="outlined" onClick={handleCancel} sx={{ minWidth: '80px' }}>
          Cancel
        </Button>
      </Box>
    </FormContainer>
  );
};

export default ResourceLibraryForm;

