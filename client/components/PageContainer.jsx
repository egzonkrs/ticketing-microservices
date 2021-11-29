import { Box } from "@chakra-ui/react";

export default function PageContainer({ children }) { 
  return <Box px={{ lg: 40 }}>{children}</Box>;
}