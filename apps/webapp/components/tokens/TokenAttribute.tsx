import { Center, Tag, TagLabel, VStack, Box } from "@chakra-ui/react";

export const TokenAttribute = ({
  name,
  value,
}: {
  name: string;
  value: number;
}) => (
  <VStack justifyContent="left">
    <Box
      position="fixed"
      bgColor="red.500"
      w={`${value}px`}
      h={1.5}
      ml={-(100 - value)}
      mt={2}
      rounded="md"
    />
    <Tag
      size="lg"
      key={name}
      variant="solid"
      bgColor="red.200"
      p={2}
      pt={3}
      w={100}
    >
      <Center mx="auto">
        <VStack spacing={0}>
          <TagLabel fontSize="xs" textColor="red.600">
            {name}
          </TagLabel>
          <TagLabel fontSize="lg" textColor="red.600">
            {value}
          </TagLabel>
        </VStack>
      </Center>
    </Tag>
  </VStack>
);
