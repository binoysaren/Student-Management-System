import styled from 'styled-components';
import { Button } from '@mui/material';

// Base button style for consistency
const BaseButton = styled(Button)`
  && {
    border-radius: 10px;
    padding: 8px 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    }
  }
`;

export const RedButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #ff6f61, #e53935);
    }
  }
`;

export const BlackButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #000000, #333333);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #222222, #555555);
    }
  }
`;

export const DarkRedButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #8b0000, #b71c1c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c62828, #e53935);
    }
  }
`;

export const BlueButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #0d47a1, #1976d2);
    }
  }
`;

export const PurpleButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #854fee, #4b7bec);
    }
  }
`;

export const LightPurpleButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #a18cd1, #fbc2eb);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c084fc, #e879f9);
    }
  }
`;

export const GreenButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #2e7d32, #388e3c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #43a047, #66bb6a);
    }
  }
`;

export const BrownButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #4e342e, #6d4c41);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #795548, #8d6e63);
    }
  }
`;

export const IndigoButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #283593, #3f51b5);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #3949ab, #5c6bc0);
    }
  }
`;
