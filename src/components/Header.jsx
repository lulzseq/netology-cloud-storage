import { Container, Button, Menu, Grid, Text, Center, GridCol, rem } from '@mantine/core';
import { IconBrandGoogleDrive, IconLogout } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getCookie from '../utils/getCookie';


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location || {};
  const username = state && state.username ? state.username : null;
  
  const handleLogout = async () => {
    try {
      const csrftoken = getCookie('csrftoken');
      console.log(`Csrftoken: ${csrftoken}`);
  
      const response = await fetch('http://127.0.0.1:8000/logout/', {
        credentials: 'include',
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }
  
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
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
