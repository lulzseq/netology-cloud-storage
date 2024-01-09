import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconTrash, IconDownload, IconEdit, IconLink, IconCopy, IconCheck } from '@tabler/icons-react';
import { Container, Button, Space, Grid, Popover, Text, CopyButton, ActionIcon, Tooltip, rem, Avatar, Modal, TextInput, Center } from '@mantine/core';

import { editFile, downloadFile, deleteFile, loadFiles } from '../redux/slices/fileSlice';


export default function File({ file }) {
  const dispatch = useDispatch();
  const [editingFile, setEditingFile] = useState(null);
  const [newFilename, setNewFilename] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleEdit = (file) => {
    setEditingFile(file);
    setNewFilename(file.filename);
    setNewDescription(file.description);
    setEditModalOpened(true);
  };

  const handleSave = () => {
    if (editingFile) {
      dispatch(editFile({ fileId: editingFile.id, newFilename: newFilename, newDescription: newDescription }))
        .then(() => {
          dispatch(loadFiles());
          setEditingFile(null);
        })
        .catch((error) => {
          console.error('Error renaming file:', error);
        });
    }
    setEditingFile(null);
    setNewFilename('');
    setNewDescription('');
    setEditModalOpened(false);
  };

  const handleDelete = (fileId) => {
    dispatch(deleteFile(fileId))
      .then(() => {
        dispatch(loadFiles());
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };


  return (
    <>
      <Container bg="dark.5" style={{ padding: '20px', borderRadius: '8px' }}>
        <Grid>
          <Grid.Col span={1}>
            <Avatar radius="xl" size="md" variant="transparent" />
            {file.by_user}
          </Grid.Col>
          <Grid.Col span={3} offset={0.5}>
            <>
              {file.filename}
              <Space h="xs" />
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Text size='xs' td='underline'>ⓘ info</Text>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="xs">{file.description}</Text>
                </Popover.Dropdown>
              </Popover>
            </>
          </Grid.Col>
          <Grid.Col span={0} offset={1}>
            <Popover width={450} trapFocus position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button variant="light" size="md"><IconLink size={20} /></Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Grid>
                  <Grid.Col span={11}>
                    <Text>
                      {file.share_link}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <CopyButton value={file.share_link} timeout={1000}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? (
                              <IconCheck style={{ width: rem(16) }} />
                            ) : (
                              <IconCopy style={{ width: rem(16) }} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Grid.Col>
                </Grid>
              </Popover.Dropdown>
            </Popover>
          </Grid.Col>
          <Grid.Col span={1} offset={0.03}>
            <Button rightSection={<IconEdit size={16} />} variant="light" size="md" onClick={() => handleEdit(file)}>
              Edit
            </Button>
          </Grid.Col>
          <Grid.Col span={1} offset={0.43}>
            <Button rightSection={<IconDownload size={16} />} variant="light" size="md" onClick={() => dispatch(downloadFile(file.id))}>
              Download
            </Button>
          </Grid.Col>
          <Grid.Col span={1} offset={1}>
            <Button rightSection={<IconTrash size={16} />} variant="light" size="md" color="red" onClick={() => setDeleteModalOpened(true)}>
              Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Container >
      <Space h="lg" />

      <Modal opened={editModalOpened} onClose={() => setEditModalOpened(false)} title="Edit file" centered>
        <TextInput
          label="File name"
          value={newFilename}
          onChange={(e) => setNewFilename(e.target.value)} />
        <Space h="xs" />
        <TextInput
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)} />
        <Space h="md" />
        <Center>
          <Button onClick={handleSave} size="md" variant="light">Save</Button>
        </Center>
      </Modal>

      <Modal opened={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} centered>
        <Center>
          <Text>Are you sure you want to delete file "{file.filename}"?</Text>
        </Center>
        <Space h="md" />
        <Center>
          <Button variant="light" color="red" size="md" onClick={() => handleDelete(file.id)}>Delete</Button>
        </Center>
        <Space h="md" />
      </Modal>

    </>
  )
}
