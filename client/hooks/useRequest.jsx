import { useState } from 'react';
import agent from '../api/agent';

export default function useRequest({ method, body, onSuccess }) {
  const [errors, setErrors] = useState({});

  const doRequest = async () => {
    try {
      setErrors({});

      const response = await agent.Account[method](body);

      if (onSuccess) {
        onSuccess(response);
      }

      console.log(response);
    } catch (error) {
      // console.log(error.response.data.errors);
      // pv - previous valuse cv - current value
      // console.log(error.response);
      // console.log(error.response.data);
      setErrors({
        errors: error.response.data.errors.reduce((pv, cv) => {
          pv[cv.field] = cv.message;
          return pv;
        }, {}),
      });
    }
  };

  return { doRequest, errors };
}
