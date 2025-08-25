// const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
//     const handleResize = () => {
//         const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
//         setIsMobile(isMobileDevice);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initialize the value on the first render
//     return () => {
//         window.removeEventListener("resize", handleResize);
//     };
// }, []);

// {/* {
//           isMobile ?
//             <ActionMenu row={row} actions={actions} />
//             :
//             <StyledSpeedDial
//               ariaLabel="SpeedDial playground example"
//               icon={<SpeedDialIcon />}
//               direction="right"
//             >
//               {actions.map((action) => (
//                 <SpeedDialAction
//                   key={action.name}
//                   icon={action.icon}
//                   tooltipTitle={action.name}
//                   onClick={action.action}
//                 />
//               ))}
//             </StyledSpeedDial>
//         } */}

// const StyledSpeedDial = styled(SpeedDial)`
//   .MuiSpeedDial-fab {
//     background-color: #240439;
//     &:hover {
//       background-color: #440080;
//     }
//   }
// `;

import React, { useEffect, useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import styled from 'styled-components';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <EditIcon />, name: 'Edit' },
];

const SpeedDialExample = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <StyledSpeedDial
          ariaLabel="SpeedDial example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => console.log(`${action.name} clicked`)}
            />
          ))}
        </StyledSpeedDial>
      )}
    </>
  );
};

export default SpeedDialExample;

// Styled Component for SpeedDial
const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    color: white;
    &:hover {
      background-color: #440080;
    }
  }
`;
