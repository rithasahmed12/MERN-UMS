import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-teal-200">
    <PropagateLoader color={'#008080'} loading={true} />
  </div>
  );
};

export default Loader;