import type { APIRoute } from 'astro'
import { XataClient } from '../../../xata.ts';
// Generated with CLI

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });

export async function GET() {
   try {
      const records = await xata.db["panels-datatable"]
         .select(["panelTitle", "paneFeaturedImage", "panelWebsiteURL", "panelAPILink", "panelAPIKey"])
         .getAll();

      return new Response(
         JSON.stringify(records),
      )
   } catch (error) {
      console.log(error);
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

   const imageFile = new Blob([data.get("imageBase64") || ""], 
            {type : data.get("imageFileType")?.toString() || ""})

   // Do something with the data, then return a success response
   const record = await xata.db["panels-datatable"].create({
      panelTitle: data.get("panelTitle")?.toString(),
      panelWebsiteURL: data.get("panelWebsiteURL")?.toString(),
      panelAPILink: data.get("panelAPILink")?.toString(),
      panelAPIKey: data.get("panelAPIKey")?.toString(),
      paneFeaturedImage : {
         name: data.get("imageName")?.toString(),
         mediaType: data.get("imageFileType")?.toString(),
         base64Content: data.get("imageBase64")?.toString()
      }
   } );

   if(record.id){
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
