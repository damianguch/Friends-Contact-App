'use client';

import { Radio, RadioGroup } from '@/components/ui/radio';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
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
import { useState } from 'react';
import { BASE_URL } from '../App';

const CreateUserModal = ({ setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    role: '',
    description: '',
    gender: ''
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.Error);
      }
      setOpen(false);
      setUsers((prevUsers) => [...prevUsers, data.data]);
      setInputs({ name: '', role: '', description: '', gender: '' });
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
          <Button variant="outline">
            <BiAddToQueue />
          </Button>
        </DialogTrigger>
        <DialogContent
          as="form"
          bg={useColorModeValue('gray.100', 'gray.700')}
          onSubmit={handleCreateUser}>
          <DialogHeader>
            <DialogTitle>My new BFF 😍</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Flex alignItems={'center'} gap={4}>
                <Field label="Full Name">
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </Field>
                <Field label="Role">
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
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
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </Field>
              <RadioGroup mt={4}>
                <Flex gap={5}>
                  <Radio
                    value="male"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }>
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }>
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="cyan.400" type="submit" isDisabled={isLoading}>
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
                'Add'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CreateUserModal;
