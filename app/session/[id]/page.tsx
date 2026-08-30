import {notFound} from "next/navigation";import {getSession,sessions} from "@/content/sessions";import {SessionPage} from "@/components/SessionPage";
export function generateStaticParams(){return sessions.map(s=>({id:String(s.id)}))}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params,session=getSession(Number(id));if(!session)notFound();return <SessionPage session={session}/>}
