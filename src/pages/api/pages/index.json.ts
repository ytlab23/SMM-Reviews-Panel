import type { APIRoute } from 'astro'
import { XataClient } from '../../../xata.ts';
// Generated with CLI

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });

export async function GET() {
    try {
        const records = await xata.db.pages
        .select(["pageTitle", "pageContent", "PageDescription"])
        .getAll();

        return new Response(
            JSON.stringify(records),
         )
    } catch (error:any) {
        console.log("Error Occured at Pages API GET", error);
    }
}

export const POST: APIRoute = async ({ request }) => {

    const data = await request.formData();
    // console.log("received in API - " , data);
 
    if (!data) {
       return new Response(
          JSON.stringify({
             message: "Missing required fields",
          }),
          { status: 400 }
       );
    }

    const record = await xata.db.pages.create({
        pageTitle: data.get("pageTitle")?.toString(),
        pageContent : data.get("pageContent")?.toString(),
        PageDescription: data.get("pageMetaDesc")?.toString(),
      });
 
    if (record.id) {
       return new Response(
          JSON.stringify({
             message: "Data Saved Successfully"
          }),
          { status: 200 }
       );
    }
    else
       return new Response(
          JSON.stringify({
             message: "Data saving Error!"
          }),
          { status: 300 }
       );
 
 };