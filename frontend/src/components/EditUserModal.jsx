'use client';

import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Flex, Icon, Input, Stack, Textarea } from '@chakra-ui/react';

import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useColorModeValue } from '@/components/ui/color-mode';
import { BiEditAlt } from 'react-icons/bi';
import { useState } from 'react';
import { BASE_URL } from '../App';

const EditUser = ({ user, setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description
  });
  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.Error);
      }
      setOpen(false);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? data.data : u))
      );

      console.log(data.message);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Icon
            fontSize="21px"
            color={useColorModeValue('blue.800', 'cyan.200')}
            marginRight={'7px'}
            cursor={'pointer'}>
            <BiEditAlt />
          </Icon>
        </DialogTrigger>
        {/* Ensure each dialog's trigger and form elements are unique to avoid collisions */}
        <form onSubmit={handleEditUser} id={`edit-id-${user.id}`}>
          <DialogContent bg={useColorModeValue('gray.100', 'gray.700')}>
            <DialogHeader>
              <DialogTitle>Edit My BFF 😍</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Stack gap="4">
                <Flex alignItems={'center'} gap={4}>
                  <Field label="Full Name">
                    <Input
                      placeholder="John Doe"
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Role">
                    <Input
                      placeholder="Software Engineer"
                      value={inputs.role}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, role: e.target.value }))
                      }
                    />
                  </Field>
                </Flex>
                <Field label="Description">
                  <Textarea
                    resize={'none'}
                    overflowY={'hidden'}
                    placeholder="He is a software engineer who loves to code and build things"
                    value={inputs.description}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        description: e.target.value
                      }))
                    }
                  />
                </Field>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button
                bg="cyan.400"
                type="submit"
                form={`edit-id-${user.id}`}
                isDisabled={isLoading}>
                {isLoading ? (
                  <Flex justifyContent={'center'}>
                    <img
                      src="/spinner.gif"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  </Flex>
                ) : (
                  'Update'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </DialogRoot>
    </>
  );
};

export default EditUser;
