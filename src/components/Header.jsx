import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconBrandGoogleDrive } from '@tabler/icons-react';
import { Container, Button, Grid, Text, Center, GridCol, rem } from '@mantine/core';


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const username = JSON.parse(sessionStorage.getItem('user')).username || null;

  const handleLogout = async () => {
    const response = await fetch('http://127.0.0.1:8000/logout/', {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    sessionStorage.clear();
    navigate('/login');
  };


  return (
    <div>
      <Container fluid h={50} bg="dark.7" style={{ padding: '20px 30px', marginBottom: '50px' }}>
        <Grid>
          <GridCol span={2}>
            <Center inline style={{ gap: '10px' }}>
              <IconBrandGoogleDrive size={30} />
              <Text size='xl'>File manager</Text>
            </Center>
          </GridCol>

          {username ? (
            <GridCol span={1} offset={8}>
              <Center inline style={{ gap: '10px' }}>
                <Button
                  variant='light'
                  size="md">{username}
                </Button>
                <Button
                  size="md" onClick={handleLogout}>Logout
                </Button>
              </Center>
            </GridCol>
          ) : (
            <GridCol span={1} offset={9}>
              <Button
                size="md" onClick={() => navigate('/login')}>Login
              </Button>
            </GridCol>
          )}

        </Grid>
      </Container>
    </div >
  )
}
