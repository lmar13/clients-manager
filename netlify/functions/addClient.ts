import type { Handler } from '@netlify/functions';
import { db } from '../../db';
import { clientInterests, clients } from '../../db/schema';

export const handler: Handler = async event => {
  try {
    const { name, surname, phone, interestIds } = JSON.parse(event.body || '{}');

    if (!name || !surname || !Array.isArray(interestIds)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid input' }),
      };
    }

    const [newClient] = await db.insert(clients).values({ name, surname, phone }).returning({ id: clients.id });

    if (newClient) {
      const linkValues = interestIds.map((interestId: number) => ({
        clientId: newClient.id,
        interestId,
      }));

      await db.insert(clientInterests).values(linkValues);
    }

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
