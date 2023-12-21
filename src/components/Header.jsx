import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { IconBrandGoogleDrive } from '@tabler/icons-react';
import { Container, Button, Grid, Text, Center, GridCol, Menu } from '@mantine/core';

import { checkUser, logout } from '../redux/slices/authSlice';


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Container fluid h={50} bg="dark.7" style={{ padding: '20px 30px', marginBottom: '50px' }}>
      <Grid>
        <GridCol span={2}>
          <Center inline style={{ gap: '10px' }}>
            <IconBrandGoogleDrive size={30} />
            <Text size='xl'>File manager</Text>
          </Center>
        </GridCol>

        {user ? (
          <>
            {user.is_staff ? (
              <Center inline style={{ gap: '10px' }}>
                <GridCol span={10} offset={23}>
                  <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                      <Button size="md">Admin Panel</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => navigate('/admin/users')}>Manage users</Menu.Item>
                      <Menu.Item onClick={() => navigate('/admin/files')}>Manage files</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </GridCol>
                <GridCol span={0} offset={23}>
                  <Center inline style={{ gap: '10px' }}>
                    <Button
                      variant='light'
                      size="md"
                      onClick={() => navigate('/')}>{user.username}
                    </Button>
                    <Button
                      size="md" onClick={handleLogout}>Logout
                    </Button>
                  </Center>
                </GridCol>
              </Center>
            ) : (
              <GridCol span={1} offset={8}>
                <Center inline style={{ gap: '10px' }}>
                  <Button
                    variant='light'
                    size="md">{user.username}
                  </Button>
                  <Button
                    size="md" onClick={handleLogout}>Logout
                  </Button>
                </Center>
              </GridCol>
            )}
          </>
        ) : (
          <GridCol span={1} offset={9}>
            <Button
              size="md" onClick={() => navigate('/login')}>Login
            </Button>
          </GridCol>
        )}
      </Grid>
    </Container>
  )
}
