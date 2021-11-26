import { useState } from 'react';
import agent from '../agent';
import { User } from '../models/user';

interface Props {
  method: 'signin' | 'signup';
  body: {
    email: string;
    password: string;
  };
  onSuccess: (user: User) => void;
}

export default function useRequest({ method, body, onSuccess }: Props) {
  const [errors, setErrors] = useState<any>({});

  const doRequest = async () => {
    try {
      setErrors({});

      const response = await agent.Account[method](body);

      if (onSuccess) {
        onSuccess(response);
      }

      console.log(response);
    } catch (error: any) {
      // console.log(error.response.data.errors);
      // pv - previous valuse cv - current value
      setErrors({
        errors: error.response.data.errors.reduce((pv: any, cv: any) => {
          pv[cv.field] = cv.message;
          return pv;
        }, {}),
      });
    }
  };

  return { doRequest, errors };
}
