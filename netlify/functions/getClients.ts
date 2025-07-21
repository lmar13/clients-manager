import type { Handler } from '@netlify/functions';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { clientInterests, clients, interests } from '../../db/schema';

export const handler: Handler = async () => {
  try {
    const allClients = await db.select().from(clients);

    const clientsWithInterests = await Promise.all(
      allClients.map(async client => {
        const clientInterestLinks = await db
          .select({
            interest: interests.name,
          })
          .from(clientInterests)
          .leftJoin(interests, eq(clientInterests.interestId, interests.id))
          .where(eq(clientInterests.clientId, client.id));

        return {
          ...client,
          interests: clientInterestLinks.map(ci => ci.interest),
        };
      })
    );

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
