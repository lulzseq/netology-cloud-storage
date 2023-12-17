import { Container, Center, TextInput, PasswordInput, Space, Button, Anchor } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadFiles } from '../redux/slices/loadSlice';
import getCookie from '../utils/getCookie';


function Auth({ action }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const csrftoken = getCookie('csrftoken')
  const [error, setError] = useState();

  const handleAuth = async () => {
    const response = await fetch(`http://127.0.0.1:8000/${action}/`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.log('User was not authenticated')
      setError('Invalid data');
      return navigate('/login');
    }
    const data = await response.json();
    console.log('User was authenticated')
    console.log(data)
    navigate('/', { state: { username: data.username } });
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const response = await fetch('http://127.0.0.1:8000/user/', {
  //       credentials: 'include',
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': csrftoken,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('useEffect: response ok')
  //       console.log(data)
  //     }

  //     console.log('useEffect: response not ok')
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <Center h={700}>
      <Container>
        <TextInput
          style={{ width: '400px' }}
          label="Login"
          size='md'
          value={username}
          {...(error && { error: error })}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Space h="lg" />
        <PasswordInput
          style={{ width: '400px' }}
          size="md"
          label="Password"
          value={password}
          {...(error && { error: error })}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Space h="xl" />
        <Center>
          <Button variant="filled" size='md' style={{ width: '150px' }} onClick={handleAuth}>
            {action === 'login' ? 'Login' : 'Signup'}
          </Button>
        </Center>
        {action === 'login' && (
          <>
            <Space h="md" />
            <Center>
              <Anchor href="signup">
                Sign up
              </Anchor>
            </Center>
          </>
        )}
      </Container>
    </Center>
  );
}

export default Auth;