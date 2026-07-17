import { createContext, useState, useContext } from "react";
import React from "react";

const LanguageContext = createContext();

export function LanguageProvider(props) {
  const [lang, setLang] = useState("en");

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLang } },
    props.children
  );
}

export const useLanguage = () => useContext(LanguageContext);