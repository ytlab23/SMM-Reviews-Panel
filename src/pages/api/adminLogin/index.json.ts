import type { APIRoute } from 'astro';
import { XataClient } from "../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });

export const POST: APIRoute = async ({ request }) => {
  
  const userData = await request.formData();
  // console.log(userData);

  const userID = await xata.db.users.search(userData.get("username")?.toString() || "", {
    fuzziness: 0,
    target: ['username']
  })
  const pass = await xata.db.users.search(userData.get("password")?.toString() || "", {
    fuzziness: 0,
    target: ['password']
  })
  
  if (userID.totalCount == 1 && userID.records[0].password == userData.get("password")?.toString()) {
    return new Response(JSON.stringify({
      message: "user found",
      userID: userID.records[0].id,
      status: 200
    }))
  }
  else
    return new Response(JSON.stringify({
      message: "user not found",
      status: 304
    }))
}