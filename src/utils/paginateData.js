const getPaginatedData = (currentPage, dataLimit, data) => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

export default getPaginatedData;