import { Box, Card, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { useColorModeValue } from '@/components/ui/color-mode';
import EditUser from './EditUserModal';
import { BASE_URL } from '../App';

const UserCard = ({ user, setUsers }) => {
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.Error);
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      console.log(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card.Root bg={useColorModeValue('#fff', 'gray.700')}>
      <Card.Header>
        <Flex gap={4}>
          <Flex flex={'1'} gap={'4'} alignItems={'center'}>
            <Avatar src={user.imgUrl} />
            <Box>
              <Heading size="lg">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditUser user={user} setUsers={setUsers} />
            <Icon
              fontSize="21px"
              color={'tomato'}
              cursor={'pointer'}
              onClick={handleDeleteUser}>
              <BiTrash />
            </Icon>
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Text>{user.description}</Text>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;

{
  /* <Card.Root bg={useColorModeValue('gray.100', 'gray.700')}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar src="https://avatar.iran.liara.run/public" />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {user.name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {user.role}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{user.description}</Card.Description>
      </Card.Body>
    </Card.Root> */
}
