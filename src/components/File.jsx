import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconTrash, IconDownload, IconEdit, IconLink, IconCopy, IconCheck } from '@tabler/icons-react';
import { Container, Button, Space, Grid, Popover, Text, CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';

import { renameFile, downloadFile, deleteFile, loadFiles } from '../redux/slices/fileSlice';


export default function File({ file }) {
  const dispatch = useDispatch();
  const [editingFile, setEditingFile] = useState(null);
  const [newFilename, setNewFilename] = useState('');

  const handleEdit = (file) => {
    setEditingFile(file);
    setNewFilename(file.filename);
  };

  const handleSave = () => {
    if (editingFile) {
      dispatch(renameFile({ fileId: editingFile.id, newFilename: newFilename }))
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
          <Grid.Col span={2} offset={0.5}>
            {editingFile && editingFile.id === file.id ? (
              <input
                type="text"
                value={newFilename}
                onChange={(e) => setNewFilename(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
            ) : (
              file.filename
            )}
          </Grid.Col>
          <Grid.Col span={0} offset={3}>
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
            {editingFile && editingFile.id === file.id ? (
              <Button rightSection={<IconEdit size={16} />} variant="light" size="md" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button rightSection={<IconEdit size={16} />} variant="light" size="md" onClick={() => handleEdit(file)}>
                Edit
              </Button>
            )}
          </Grid.Col>
          <Grid.Col span={1} offset={0.43}>
            <Button rightSection={<IconDownload size={16} />} variant="light" size="md" onClick={() => dispatch(downloadFile(file.id))}>
              Download
            </Button>
          </Grid.Col>
          <Grid.Col span={1} offset={1}>
            <Button rightSection={<IconTrash size={16} />} variant="light" size="md" color="red" onClick={handleDelete.bind(null, file.id)}>
              Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Container >
      <Space h="lg" />
    </>
  )
}
