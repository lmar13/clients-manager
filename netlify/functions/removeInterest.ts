import type { Handler } from '@netlify/functions';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { interests } from '../../db/schema';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const id = event.queryStringParameters?.['id'];
  if (!id) {
    return { statusCode: 400, body: 'Missing id' };
  }

  try {
    await db.delete(interests).where(eq(interests.id, Number(id)));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error removing interest: ${JSON.stringify(error)}`,
    };
  }
};
