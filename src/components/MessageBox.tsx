import ReactMarkdown from 'react-markdown';
import { Flex, Icon, useColorModeValue, Text } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { MdEdit, MdPerson } from 'react-icons/md';

export default function MessageBox(props: {
  output: string;
  question: string;
}) {
  const { output } = props;
  const gray = useColorModeValue('gray.500', 'white');
  const textColor = useColorModeValue('navy.700', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      flexDirection={'column'}
      gap={10}
      height={"auto"}
      color={textColor}
      fontSize={{ base: 'sm', md: 'md' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight="500"
      margin={"10px 0px"}
    >
      <Flex
        borderRadius="full"
        justify="center"
        align="center"
        bg={'transparent'}
        border="1px solid"
        borderColor={borderColor}
        me="20px"
        h="40px"
        minH="40px"
        minW="40px"
      >
        <Icon as={MdPerson} width="20px" height="20px" color={brandColor} />
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius="14px"
          w="100%"
          zIndex={'2'}
        >
          
            {props.question}
         
          <Icon
            cursor="pointer"
            as={MdEdit}
            ms="auto"
            width="20px"
            height="20px"
            color={gray}
          />
        </Flex>
      </Flex>

      <ReactMarkdown className="font-medium">
        {output ? output : ''}
      </ReactMarkdown>
    </Card>
  );
}
