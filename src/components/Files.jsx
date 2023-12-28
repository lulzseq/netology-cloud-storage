import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';

import { IconUpload } from '@tabler/icons-react';
import { Container, FileInput, Button, Space, Grid, TextInput } from '@mantine/core';

import File from './File';
import Loading from './Loading';
import { uploadFile, loadFiles, initialFileState } from '../redux/slices/fileSlice';


export default function Files() {
  const { files, loading } = useSelector((state) => state.file) || initialFileState;
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');

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
      formData.append('description', description);
      formData.append('by_user', JSON.parse(sessionStorage.getItem('user')).id);
      dispatch(uploadFile(formData))
        .then(() => {
          dispatch(loadFiles());
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
      setFilename('')
      setDescription('');
    }
  };

  useEffect(() => {
    dispatch(loadFiles());
    setSelectedFile(null);
    setFilename('');
  }, [dispatch]);


  return (
    <>
      <Container bg="dark.5" style={{ padding: '40px', borderRadius: "8px" }}>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <TextInput
          label="File name"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <Space h="xs" />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Space h="md" />
        <Grid>
          <Grid.Col span={10}>
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
        <Space h="lg" />
        <Button
          rightSection={<IconUpload size={16} />}
          variant="light"
          size="md"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Container>
      <Space h="lg" />

      {Array.isArray(files) && files.length > 0 ? (
        files.map((file) => {
          if (file.by_user === JSON.parse(sessionStorage.getItem('user')).username) {
            return <File key={file.id} file={file} />;
          } else {
            return null;
          }
        })
      ) : (
        <p></p>
      )}

      {loading && <Loading />}
    </>
  );
}
