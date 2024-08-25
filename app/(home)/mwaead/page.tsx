// components/EngineerTimesServer.tsx
import EngineerTimesClient from './EngineerTimesClient';
import { db } from '@/lib/db';
import { Box } from '@mui/material';

const EngineerTimesServer = async () => {
  const engineers = await db.engineer.findMany({
    include: { times: true }, 
  });

  return (
    <Box className="p-4 max-w-md mx-auto">
      <EngineerTimesClient engineers={engineers} />
    </Box>
  );
};

export default EngineerTimesServer;
