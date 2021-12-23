import { useState } from 'react';
import agent from '../api/agent';

export default function useRequest({ request, method, body, onSuccess }) {
  const [errors, setErrors] = useState({});

  const doRequest = async (props = {}) => {
    try {
      setErrors({});

      const response = await agent[request][method]({ ...body, ...props });

      if (onSuccess) {
        onSuccess(response);
      }

      console.log(response);
    } catch (error) {
      // pv - previous valuse cv - current value
      console.log(error.response.data.errors);
      // console.log(error.response);
      if (error.response) {
        setErrors({
          errors: error.response.data.errors.reduce((pv, cv) => {
            pv[cv.field] = cv.message;
            return pv;
          }, {}),
        });
      }
    }
  };

  return { doRequest, errors };
}
