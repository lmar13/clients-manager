import type { Handler } from '@netlify/functions';
import { db } from '../../db';

export const handler: Handler = async () => {
  try {
    const result = await db.query.clients.findMany({
      with: {
        interests: {
          with: {
            interest: true,
          },
        },
      },
    });

    const clientsWithInterests = result.map(client => ({
      ...client,
      interests: client.interests.map(link => ({ id: link.interest.id, name: link.interest.name })),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(clientsWithInterests),
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
