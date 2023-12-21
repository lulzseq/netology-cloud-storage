import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Space, Grid } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { renameUser, loadUsers, deleteUser } from '../redux/slices/adminSlice';

export default function User({ user }) {
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserName(user.username);
  };

  const handleSave = () => {
    if (editingUser) {
      dispatch(renameUser({ userId: editingUser.id, newUsername: newUserName }))
        .then(() => {
          setEditingUser(null);
          setNewUserName('');
          dispatch(loadUsers());
        })
        .catch((error) => {
          console.error('Error renaming user:', error);
        });
    }
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
            {editingUser && editingUser.id === user.id ? (
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
            ) : (
              user.username
            )}
          </Grid.Col>
          <Grid.Col span={1} offset={4}>
            {editingUser && editingUser.id === user.id ? (
              <Button rightSection={<IconEdit size={16} />} variant="light" size="md" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button
                rightSection={<IconEdit size={16} />}
                variant="light"
                size="md"
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
            )}
          </Grid.Col>
          <Grid.Col span={1} offset={0.5}>
            <Button
              rightSection={<IconTrash size={16} />}
              variant="light"
              size="md"
              color="red"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
      <Space h="lg" />
    </>
  );
}
