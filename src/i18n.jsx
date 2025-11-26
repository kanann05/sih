import {createContext, useContext, useState, useEffect, useTransition} from 'react'
import { useTranslation } from "react-i18next";

const LangContext = createContext();

export default function LangContextProvider({ children }) {
    const [t, i18n] = useTranslation("global")
    return(
        <LangContext.Provider value = {{t, i18n}}> {children} </LangContext.Provider>
    )
}

export const Lang = () => {return useContext(LangContext)}

//init -> eng
//toggle to hindi - > localStorage.setItem('lang', 'hin')


//[localLang, setLocalLang] = useState(localStorage.getItem("lang"));
//useEffect(() => {setLocalLang(localStorage.getItem("lang"))}, [])