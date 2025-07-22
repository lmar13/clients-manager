import type { Handler } from '@netlify/functions';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { clients } from '../../db/schema';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const id = event.queryStringParameters?.['id'];
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing client ID' }),
    };
  }

  try {
    const result = await db.query.clients.findFirst({
      where: eq(clients.id, Number(id)),
    });

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Client not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ...result, interest: result.interests?.split(',') }),
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: (error as Error).message }),
    };
  }
};
