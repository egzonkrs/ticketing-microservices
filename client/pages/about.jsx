import { Stack, Heading, Text, Flex } from '@chakra-ui/react';

const About = () => {
  return (
    <Flex minH={'82vh'} align={'center'} justify={'center'}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'} color={'black'} fontWeight={'bold'}>
          Project done by{' '}
          <Text
            display={'inline-block'}
            fontSize={'2xl'}
            color={'blue.600'}
            fontWeight={'bold'}
          >
            egzonkrs
          </Text>
        </Heading>
        <span style={{ display: 'inline' }}>My Github profile:</span>
        <a
          style={{ display: 'inline-block', fontWeight: 'bold' }}
          href="https://github.com/egzonkrs"
          target="_blank"
        >
          https://github.com/egzonkrs
        </a>
      </Stack>
    </Flex>
  );
};

export default About;
