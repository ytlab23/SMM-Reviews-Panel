import type { APIRoute } from "astro";
import { XataClient } from '../../../xata.ts';
// Generated with CLI
const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });

interface siteSettingsStructure{
    SiteTitle : string
    siteMetaDescription : string
    homeHeaderText : string
    homeHeaderPara : string
    homePanelCount : number
    platformServiceCount : number
    siteFavicon : any
    siteLog : any,
    homeBackgroundImage : any
}

//#region Updates Site Information by ID
export const PUT : APIRoute = async ({params, request}) =>{
    const data = await request.formData();
    console.log("received in API - " , data);
    const id = params.id;
    
    if (!data) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    let dataToUpdate : siteSettingsStructure ={
        SiteTitle: data.get("webTitle")?.toString() || "",
        siteMetaDescription: data.get("webMetaDes")?.toString() || "",
        homeHeaderText: data.get("siteHeaderTitle")?.toString() || "",
        homeHeaderPara: data.get("siteHeaderParagraph")?.toString() || "",
        homePanelCount: Number(data.get("sitePanelCount")?.toString() || 0),
        platformServiceCount: Number(data.get("siteServiceCount")?.toString() || 0),

        siteFavicon: {
            name: data.get("faviconImageName")?.toString(),
            mediaType: data.get("faviconImageFileType")?.toString(),
            base64Content: data.get("faviconImageBase64")?.toString()
        },
        siteLog: {
            name: data.get("logoImageName")?.toString(),
            mediaType: data.get("logoImageFileType")?.toString(),
            base64Content: data.get("logoImageBase64")?.toString()
        },
        homeBackgroundImage: {
            name: data.get("homepgBgImageName")?.toString(),
            mediaType: data.get("homepgBgImageFileType")?.toString(),
            base64Content: data.get("homepgBgImageBase64")?.toString()
        },
    };

    console.log("Modified for API - " , dataToUpdate);
    
    const record = await xata.db.siteSettings.update(id?.toString() || "", dataToUpdate)
    console.log(record);
    
    if (record!.id) {
        return new Response(
           JSON.stringify({
            id: id,
            message : "Site Setting Data Updated Successfully",
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

        