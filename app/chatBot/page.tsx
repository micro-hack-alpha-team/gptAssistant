'use client';
/*eslint-disable*/
import MessageBoxChat from '@/components/MessageBox';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  MenuItem,
  Menu,
  MenuList,
  Text,
  useColorModeValue,
  MenuButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdAutoAwesome } from 'react-icons/md';
import Bg from '../../public/img/chat/bg-image.png';

interface oo {
  question: string;
  answer: string;
}

export default function Chat() {
  // API Key
  // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const gray = useColorModeValue('gray.500', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const [objects, setObjects] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/chatBot')
      .then((res) => res.json())
      .then((data) => {
        setObjects(data.pAQ);
      });
  }, []);
  const [output, setOutput] = useState<oo>(null!);
  const [history, setHistory] = useState<oo[]>([]);
  const noResponse = {
    question: 'question ouvert',
    answer: 'je suis un bot et je peux pas vous aider maintenant ',
  };
  console.log(objects);
  const submit = () => {
    try {
      console.log(history);
      if (output) setHistory(history);
      const answers = objects.filter((o: oo) => o.question.includes(message));
      console.log(answers);
      if (answers.length && !history.includes(answers[0])) {
        setOutput(answers[0]);
        history.push(answers[0]);
        setHistory(history);
      } else {
        setOutput(noResponse);
        history.push(noResponse);
        setHistory(history);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="parent">
      <Flex
        w="100%"
        pt={{ base: '70px', md: '0px' }}
        direction="column"
        position="relative"
        overflowY={'hidden'}
        height={'80%'}
      >
        <Img
          src={Bg.src}
          position={'absolute'}
          w="350px"
          left="50%"
          top="50%"
          transform={'translate(-50%, -50%)'}
        />
        <Flex
          direction="column"
          mx="auto"
          w={{ base: '100%', md: '100%', xl: '100%' }}
          minH={{ base: '75vh', '2xl': '85vh' }}
          maxW="1000px"
        >
          {/* Model Change */}
          <Flex direction={'column'} w="100%" mb={'auto'}>
            <Flex
              mx="auto"
              zIndex="2"
              w="max-content"
              mb="20px"
              borderRadius="60px"
            ></Flex>

            <Accordion color={gray} allowToggle w="100%" my="0px" mx="auto">
              <AccordionItem border="none">
                <AccordionButton
                  borderBottom="0px solid"
                  maxW="max-content"
                  mx="auto"
                  _hover={{ border: '0px solid', bg: 'none' }}
                  _focus={{ border: '0px solid', bg: 'none' }}
                >
                  <AccordionIcon color={gray} />
                </AccordionButton>
                <AccordionPanel mx="auto" w="max-content" p="0px 0px 10px 0px">
                  <Text
                    color={gray}
                    fontWeight="500"
                    fontSize="sm"
                    textAlign={'center'}
                  >
                    This is a cool text example.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          {/* Main Box */}
          <Flex
            direction="column"
            w="100%"
            mx="auto"
            display={true ? 'flex' : 'none'}
            mb={'auto'}
          >
            <Flex w="100%" align={'center'} mb="10px"></Flex>
            <Flex w="100%">
              <Flex
                borderRadius="full"
                justify="center"
                align="center"
                bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
                me="20px"
                h="40px"
                minH="40px"
                minW="40px"
              >
                <Icon
                  as={MdAutoAwesome}
                  width="20px"
                  height="20px"
                  color="white"
                />
              </Flex>
              <div className="flex flex-col gap-5">
                {history.length &&
                  history.map((h) => (
                    <MessageBoxChat output={h.answer} question={h.question} />
                  ))}
              </div>
            </Flex>
          </Flex>
          {/* Chat Input */}
          <Flex
            ms={{ base: '0px', xl: '60px' }}
            mt="20px"
            justifySelf={'flex-end'}
          >
            <Input
              minH="54px"
              h="100%"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="45px"
              p="15px 20px"
              me="10px"
              fontSize="sm"
              fontWeight="500"
              _focus={{ borderColor: 'none' }}
              color={inputColor}
              _placeholder={placeholderColor}
              placeholder="Type your message here..."
              value={message}
              onChange={handleChange}
            />
            <Button
              variant="primary"
              py="20px"
              px="16px"
              fontSize="sm"
              borderRadius="45px"
              ms="auto"
              w={{ base: '160px', md: '210px' }}
              h="54px"
              _hover={{
                boxShadow:
                  '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                _disabled: {
                  bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                },
              }}
              isLoading={false}
              onClick={submit!}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <QuestionBar faqs={objects} setSelectedMessage={setMessage} />
    </div>
  );
}

type faq = {
  question: string;
  answer: string;
};
type faqProps = {
  setSelectedMessage: any;
  faqs: faq[];
};

function QuestionBar(props: faqProps) {
  return (
    <div className="glass-container">
      <Menu>
        <MenuButton>seléctionner votre question</MenuButton>
        <div className="content">
          <MenuList>
            {props.faqs.map((faq) => (
              <MenuItem onClick={() => props.setSelectedMessage(faq.question)}>
                {faq.question}
              </MenuItem>
            ))}
          </MenuList>
        </div>
      </Menu>
    </div>
  );
}
