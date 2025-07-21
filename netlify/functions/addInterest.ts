import type { Handler } from '@netlify/functions';
import { db } from '../../db';
import { interests } from '../../db/schema';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name } = JSON.parse(event.body || '{}');

    if (!name) {
      return { statusCode: 400, body: 'Missing interest name' };
    }

    const result = await db.insert(interests).values({ name }).returning();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, interest: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error adding interest: ${JSON.stringify(error)}`,
    };
  }
};
