import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createGroup } from '../../../actions/group';
import { fetchGroups } from '../../../actions/group';
import { useValue } from '../../../context/contextProvider';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '300px',
  margin: '0 auto',
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '4px',
});

const GroupForm = () => {
  const { dispatch } = useValue()
  const [groupName, setGroupName] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [cohort, setCohort] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups(dispatch).then((data) => {
      if (data) {
        setGroups(data);
      }
    });
  }, [dispatch]);



  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleInstitutionChange = (event) => {
    setInstitution(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleCohortChange = (event) => {
    setCohort(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const group = {
        name: groupName,
        institution: institution,
        department: department,
        cohort: cohort,
      };

      await createGroup(dispatch, group);
      const newGroups = await fetchGroups(dispatch);
      setGroups(newGroups);
      // Reset form values
      setGroupName('');
      setInstitution('');
      setDepartment('');
      setCohort('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    // Reset form values
    setGroupName('');
    setInstitution('');
    setDepartment('');
    setCohort('');
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <TextField
        label="Group Name"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <TextField
        label="Institution"
        value={institution}
        onChange={handleInstitutionChange}
      />
      <TextField
        label="Department"
        value={department}
        onChange={handleDepartmentChange}
      />
      <TextField
        label="Cohort"
        value={cohort}
        onChange={handleCohortChange}
      />
      <div>
        <Button variant="contained" type="submit">
          Create Group
        </Button>
        <Button variant="contained" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default GroupForm;

