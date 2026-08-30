"use client";
import {useCallback,useEffect,useState} from "react";
type Progress={sections:string[];quizScores:Record<string,number>;problems:string[]};
const empty:Progress={sections:[],quizScores:{},problems:[]};
export function useProgress(){const [progress,setProgress]=useState<Progress>(empty);useEffect(()=>{try{setProgress(JSON.parse(localStorage.getItem("dsa-progress")||JSON.stringify(empty)))}catch{setProgress(empty)}},[]);const save=useCallback((next:Progress)=>{setProgress(next);localStorage.setItem("dsa-progress",JSON.stringify(next))},[]);return{progress,toggleSection:(id:string)=>save({...progress,sections:progress.sections.includes(id)?progress.sections.filter(x=>x!==id):[...progress.sections,id]}),saveQuiz:(id:string,score:number)=>save({...progress,quizScores:{...progress.quizScores,[id]:score}}),toggleProblem:(id:string)=>save({...progress,problems:progress.problems.includes(id)?progress.problems.filter(x=>x!==id):[...progress.problems,id]})}}
