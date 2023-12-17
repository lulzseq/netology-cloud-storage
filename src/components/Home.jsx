import { Container, FileInput, Button, Space, Grid } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { loadFiles } from '../redux/slices/loadSlice';
import { uploadFile } from '../redux/slices/uploadSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import File from './File';

export default function Home() {
  const files = useSelector((state) => state.load.files) || [];
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('by_user', '1');
      dispatch(uploadFile(formData))
        .then(() => {
          dispatch(loadFiles());
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  useEffect(() => {
    dispatch(loadFiles());
  }, [dispatch]);

  return (
    <div>
      <Container bg="dark.5" style={{ padding: '40px', borderRadius: "8px" }}>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
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
        files.map((file) => <File key={file.id} file={file} />)
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
}