import axios from 'axios';
import { NextApiRequest, NextPage, NextPageContext } from 'next';

interface Props {
  context: NextPageContext;
}

export interface Headers {
  [key: string]: any;
}

export default function buildClient({ context }: Props) {
  // const { req } = ctx;
  const { req } = context;
  if (typeof window === 'undefined') {
    // we are on the server

    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      headers: req!.headers as Headers
    });
  } else {
    // we must be on the browser

    return axios.create({
      baseURL: '/',
    });
  }
}
