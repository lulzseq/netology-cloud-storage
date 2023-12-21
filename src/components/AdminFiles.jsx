import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { Container, Center, Button, Modal, TextInput, NativeSelect, Space, FileInput, Grid } from '@mantine/core';

import File from './File';
import Loading from './Loading';

import { uploadFile } from '../redux/slices/fileSlice';
import { loadFiles, loadUsers } from '../redux/slices/adminSlice';


export default function AdminFiles() {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { files, users, loading, error } = useSelector((state) => state.admin) || {};
  const usernames = users.map(user => user.username);
  const [uploadBy, setUploadBy] = useState(JSON.parse(sessionStorage.getItem('user')).username)
  const [filename, setFilename] = useState('')

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {

      if (filename === '') {
        setFilename(selectedFile.name)
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('filename', filename);
      formData.append('by_user', users.find(user => user.username === uploadBy)?.id);
      dispatch(uploadFile(formData))
        .then(() => {
          dispatch(loadFiles());
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
    close();
    setFilename('');
    setSelectedFile(null);
  };

  useEffect(() => {
    dispatch(loadFiles());
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Container>
          <Center inline style={{ gap: '20px' }}>
            <h2>Files</h2>

            <Button variant='light' onClick={open}>Upload new file</Button>
          </Center>
          <ul>
            {files && files.map((file) => (
              <File key={file.id} file={file} />
            ))}
          </ul>
        </Container>
      )}

      <Modal opened={opened} onClose={close} title="Upload new file">
      <TextInput
          label="File name"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <Space h="md" />
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <Grid>
          <Grid.Col span={7}>
            <FileInput
              onClick={() => fileInputRef.current.click()}
              placeholder={selectedFile ? selectedFile.name : "Upload files"}
              variant="filled" multiple style={{ border: "1px solid #5C5F66", borderRadius: "5px" }} />
          </Grid.Col>
          <Grid.Col span={1}>
            <Button
              variant="light"
              size="md"
              onClick={() => fileInputRef.current.click()}
            >
              Choose files
            </Button>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <NativeSelect
          label="by user"
          data={usernames}
          defaultValue={JSON.parse(sessionStorage.getItem('user')).username}
          onChange={(e) => setUploadBy(e.target.value)} />
        <Space h="md" />
        <Center>
          <Button
            onClick={handleUpload}>Upload</Button>
        </Center>
      </Modal>
    </>
  );
}