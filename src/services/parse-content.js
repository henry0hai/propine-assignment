const parseContent = (line) => {
  const convertToArray = line.split(',');
  const timestamp = convertToArray[0];
  const type = convertToArray[1];
  const token = convertToArray[2];
  const amount = convertToArray[3];
  return {
    timestamp,
    type,
    token,
    amount,
  };
};

export default parseContent;
