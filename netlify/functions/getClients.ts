import type { Handler } from '@netlify/functions';
import { db } from '../../db';

export const handler: Handler = async () => {
  try {
    const result = await db.query.clients.findMany();

    return {
      statusCode: 200,
      body: JSON.stringify(result.map(client => ({ ...client, interests: client.interests?.split(',') }))),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message }),
    };
  }
};
