import { Grid, Text, Flex } from '@chakra-ui/react';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../App';

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/friends`, {
          method: 'GET'
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.Error);
        setUsers(data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <img src="/spinner.gif" alt="spinner" height={50} width={50} />
      </Flex>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <Flex justifyContent="center">
        <Text fontSize="xl">
          <Text as="span" fontSize="2xl" fontWeight="bold" mr={2}>
            Poor you! 🥺
          </Text>
          No friends found.
        </Text>
      </Flex>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
      }}
      gap={4}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} setUsers={setUsers} />
      ))}
    </Grid>
  );
};

export default UserGrid;
