import type { Handler } from '@netlify/functions';
import { db } from '../../db';
import { clients } from '../../db/schema';

export const handler: Handler = async event => {
  try {
    const { name, surname, phone, interests } = JSON.parse(event.body || '{}');

    if (!name || !surname || !Array.isArray(interests)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid input' }),
      };
    }

    await db
      .insert(clients)
      .values({ name, surname, phone, interests: interests.join(',') })
      .returning({ id: clients.id });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Client added' }),
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
