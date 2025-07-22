import type { Handler } from '@netlify/functions';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { clients } from '../../db/schema';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const id = event.queryStringParameters?.['id'];
  if (!id) {
    return { statusCode: 400, body: 'Missing id' };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    await db
      .update(clients)
      .set({
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        interests: data.interests.join(','),
      })
      .where(eq(clients.id, Number(id)));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Client updated' }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: `Error: ${(e as Error).message}`,
    };
  }
};
