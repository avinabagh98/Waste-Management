"use client"
import LanguageFetcher from "@/components/LanguageFetcher";

export default function Home() {
  const translate = LanguageFetcher();
  return <><p>this is the home page {translate.test}</p></>;
}
