import { FormHelperText } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

interface Props {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  body?: Object;
}

interface Errors {
  body: JSX.Element | null;
}

export default function useRequest({ url, method, body }: Props) {
  const [errors, setErrors] = useState<Errors>();

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  return { doRequest, errors };
}
