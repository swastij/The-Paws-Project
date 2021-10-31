// import { Box } from "@chakra-ui/layout";
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";

// const FeederCard = ({
//    state,
//    users 
// })=>{
//     return (
//         <Box
//       boxShadow="lg"
//       w="100%"
//       display="flex"
//       flexDirection="column"
//       borderRadius="8px"
//       marginBottom="16px"
//     >
//       <Box
//         p={4}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
       
//         <Box>
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             h="32px"
//             w="32px"
//             cursor="pointer"
//             border="1px solid #edf2f7"
//             borderRadius="8px"
//           >
//             <GoKebabVertical />
//           </Box>
//         </Box>
//       </Box>
//       {images.length > 0 && (
//         <Box display="flex" justifyContent="center" alignItems="center">
//           <img style={{
//               objectFit: "cover",
//               height: "650px",
//               width: "100%",
//             }} src={images[0].url} alt="media" />
//         </Box>
//       )}
      
//       <Box p={2}> NAME: {name}</Box>
//       <Box p={2}> TYPE: {animal_type} </Box>
//       <Box p={2}> BREED: {breed} </Box>
//       <Box p={2}> VACCINATED`: {isVaccinated? "YES" : "NO"} </Box>
//       <Box p={2}> DEWORMED: {isDewormed? "YES" : "NO"} </Box>
//       <Box p={2}> GENDER: {gender} </Box>
//     </Box>
//     );
// }
// export default FeederCard;