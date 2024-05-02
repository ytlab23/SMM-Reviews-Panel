import type { APIRoute } from "astro";
import { XataClient } from '../../../xata.ts';
// Generated with CLI
const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });

interface messageStructure{
    status: string,
}

//#region Returns Message Information by ID
export const GET: APIRoute = async ({ params }) => {
    const id = params.id;
    // console.log("Parameter received - ", id);
    
    const record = await xata.db.contact_msgs.read(id?.toString() || "");
    // console.log(record);
    if (record!.id == id) {
        return new Response(
            JSON.stringify({
                id: id,
                status: 200,
                data: record,
            }))
    }
    else {
        return new Response(
            JSON.stringify({
                id: id,
                status: 404,
                message: `${id} Not Found in the Database`
            }))
    }
}
//#endregion

//#region Updates Message Information by ID
export const PUT : APIRoute = async ({params, request}) =>{
    const data = await request.formData();
    const id = params.id;

    if (!data) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    let dataToUpdate : messageStructure ={
        status : data.get("status")?.toString() || ""
    };

    // console.log("received in API - " , data);
    // console.log("received in API - " , dataToUpdate);
    
    const record = await xata.db.contact_msgs.update(id?.toString() || "", dataToUpdate)
    // console.log(record);
    
    if (record!.id) {
        return new Response(
           JSON.stringify({
            id: id,
            message : "Data Updated Successfully",
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
}
//#endregion

//#region Delete Panels Information by ID
export const DELETE: APIRoute = async ({ params }) => {
    const id = params.id;
    const record = await xata.db.contact_msgs.delete(id?.toString() || "");
    // console.log(record);
    if (record!.id == id) {
        return new Response(
            JSON.stringify({
                id: id,
                status : 200,
                message: `${id} Deleted from the Database`
            }))
    }
    else {
        return new Response(
            JSON.stringify({
                id: id,
                status : 404,
                message: `${id} Not Found in the Database`
            }))
    }
}
//#endregion