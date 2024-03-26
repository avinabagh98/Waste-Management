"use client";
import { useState, useEffect } from "react";


//////////////////////////////////// GetDictionary Function /////////////////////////////////////
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((response) => response.default),
  hi: () => import("@/dictionaries/hi.json").then((response) => response.default),
  bn: () => import("@/dictionaries/bn.json").then((response) => response.default),
};

const getDictionary = async (lang) => {
  const dictionary = dictionaries[lang]; //here dictionary will be a function
  if (!dictionary) {
    console.log(`Dictionary for language '${lang}' not found.`);
    return dictionaries["en"]();
  } else {
    try {
      const response = await dictionary();
      return response;
    } catch (error) {
      throw new Error(`Error fetching dictionary for language '${lang}'.`);
    }
  }
};



//////////////////////////////////// Language fetcher /////////////////////////////////////
export default function LanguageFetcher () {
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState({});

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if(!lang) {setLanguage("en")}
    else{
      setLanguage(lang);
    }
    
    // Fetch translation based on language
    async function fetchTranslation(language) {
      try {
        const translation = await getDictionary(language);
        setTranslate(translation);
      } catch (error) {
        console.error("Error fetching translation:", error);
      }
    }

    fetchTranslation(language);
  }, []);
  return translate;
};
