import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

const CircularProgressWithLabel = ({ value, total }: { value: number; total: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= (value / total) * 100 ? (value / total) * 100 : prevProgress + 1,
      );
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [value, total]);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size={50}
        variant="determinate"
        value={progress}
        sx={{
          color: 'white',
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p className="text-white text-sm">
          {value}/{total}
        </p>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
