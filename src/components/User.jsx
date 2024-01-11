import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Container, Button, Space, Grid, Modal, TextInput, Center, Text, Checkbox } from '@mantine/core';

import { editUser, loadUsers, deleteUser } from '../redux/slices/adminSlice';


export default function User({ user }) {
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isStaff, setIsStaff] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserName(user.username);
    setEditModalOpened(true);
  };

  const handleSave = () => {
    if (editingUser) {

      if (!isStaff) {
        setIsStaff(editingUser.is_staff);
      }

      dispatch(editUser({ userId: editingUser.id, newUsername: newUserName, isStaff: isStaff }))
        .then(() => {
          setEditingUser(null);
          setNewUserName('');
          dispatch(loadUsers());
        })
        .catch((error) => {
          console.error('Error renaming user:', error);
        });
    }
    setEditModalOpened(false);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(loadUsers());
    })
  };

  return (
    <>
      <Container bg="dark.5" style={{ padding: '20px', borderRadius: '8px' }}>
        <Grid>
          <Grid.Col span={3} offset={1}>
            {user.username}
            <Text size='xs'>{user.is_staff ? '*admin' : ''}</Text>
          </Grid.Col>
          <Grid.Col span={1} offset={4}>
            <Button
              rightSection={<IconEdit size={16} />}
              variant="light"
              size="md"
              onClick={() => handleEdit(user)}
            >
              Edit
            </Button>
          </Grid.Col>
          <Grid.Col span={1} offset={0.5}>
            <Button
              rightSection={<IconTrash size={16} />}
              variant="light"
              size="md"
              color="red"
              onClick={() => setDeleteModalOpened(true)}
            >
              Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
      <Space h="lg" />

      <Modal opened={editModalOpened} onClose={() => setEditModalOpened(false)} title="Edit user">
        <TextInput label="Username" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
        <Space h="lg" />
        <Checkbox defaultChecked={user.is_staff} label="Grant admin privileges" onChange={(e) => setIsStaff(e.target.checked)} />
        <Space h="lg" />
        <Center>
          <Button onClick={handleSave} size="md" variant="light">Save</Button>
        </Center>
      </Modal>

      <Modal opened={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} centered>
        <Center>
          <Text>Are you sure you want to delete user "{user.username}"?</Text>
        </Center>
        <Space h="md" />
        <Center>
          <Button variant="light" color="red" size="md" onClick={() => handleDelete(user.id)}>Delete</Button>
        </Center>
        <Space h="md" />
      </Modal>
    </>
  );
}
