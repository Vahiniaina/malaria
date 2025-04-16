import { Box, Text, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react";


export const Help = () => {

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <>
      {/* {scrollPosition > 500 && (<Link href='/#top'>
        <Box position='fixed'
          bottom='20px'
          right={['16px', '84px']}
          zIndex={1}
        >
          <Text 
            w='60px'
            h='60px'
            children={'Top'}
          />
        </Box>
      </Link>)} */}
    </>
  )
};

export default Help;
