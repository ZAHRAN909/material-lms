'use client';

import { useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  day: string;
  time: string;
  place: string;
}

interface Engineer {
  name: string;
  times: TimeSlot[];
}

const engineers: Engineer[] = [
  { name: 'Engineer A', times: [{ day: 'Monday', time: '9:00 AM - 10:00 AM', place: 'Room 101' }, { day: 'Tuesday', time: '1:00 PM - 2:00 PM', place: 'Room 102' }] },
  { name: 'Engineer B', times: [{ day: 'Wednesday', time: '10:00 AM - 11:00 AM', place: 'Room 201' }, { day: 'Thursday', time: '2:00 PM - 3:00 PM', place: 'Room 202' }] },
  { name: 'Engineer C', times: [{ day: 'Friday', time: '11:00 AM - 12:00 PM', place: 'Room 301' }, { day: 'Saturday', time: '3:00 PM - 4:00 PM', place: 'Room 302' }] },
];

const EngineerTimes = () => {
  const [selectedEngineer, setSelectedEngineer] = useState<string>('');

  const handleClick = (engineerName: string) => {
    setSelectedEngineer(engineerName);
  };

  const selectedEngineerTimes = engineers.find(engineer => engineer.name === selectedEngineer)?.times || [];

  return (
    <Box className="p-4 max-w-md mx-auto">
      <Box className="flex flex-wrap gap-4 items-center justify-center mb-4">
        {engineers.map(engineer => (
          <motion.div
            key={engineer.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="contained"
              onClick={() => handleClick(engineer.name)}
              className="flex-1 sm:flex-none"
            >
              {engineer.name}
            </Button>
          </motion.div>
        ))}
      </Box>
      <Box className="flex w-full flex-wrap gap-3">
        <AnimatePresence>
          {selectedEngineerTimes.length > 0 ? (
            <motion.div
              key="times-table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <TableContainer component={Paper} className="mt-2 w-full">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Time Slot</TableCell>
                      <TableCell>Place</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedEngineerTimes.map((slot, index) => (
                      <TableRow key={index}>
                        <TableCell>{slot.day}</TableCell>
                        <TableCell>{slot.time}</TableCell>
                        <TableCell>{slot.place}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          ) : (
            <Typography className="mt-2 text-center w-full">
              Please select an engineer to see the times.
            </Typography>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default EngineerTimes;
