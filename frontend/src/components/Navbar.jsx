import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';
import { useColorModeValue } from '@/components/ui/color-mode';
import CreateUserModal from './CreateUserModal';

const Navbar = ({ setUsers }) => {
  return (
    <Container maxW={'900px'}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue('gray.200', 'gray.700')}>
        <Flex h="12" alignItems={'center'} justifyContent={'space-between'}>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={3}
            display={{ base: 'none', sm: 'flex' }}>
            <img src="react.png" alt="React logo" width={40} height={40} />
            <Text fontSize={'40px'}>+</Text>
            <img src="python.png" alt="Python logo" width={40} height={40} />
            <Text fontSize={'40px'}>=</Text>
            <img src="explode.png" alt="Explode head" width={45} height={35} />
          </Flex>
          <Flex gap={3} alignItems={'center'}>
            <Text
              fontSize={'lg'}
              fontWeight={500}
              display={{ base: 'none', md: 'block' }}>
              BFFship 🔥
            </Text>
            <ColorModeButton />
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
