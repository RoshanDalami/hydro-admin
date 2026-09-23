"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const IndicTransliterate = dynamic(
  () =>
    import("@ai4bharat/indic-transliterate").then(
      (mod) => mod.IndicTransliterate,
    ),
  { ssr: false },
);

type NepaliTransliterationInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
};

/**
 * A client-side, single-line field for Romanized Nepali input.
 * The IndicXlit suggestions are committed to Nepali Unicode on space, enter,
 * tab, or blur, while ordinary editing and punctuation remain native input
 * behaviour.
 */
export default function NepaliTransliterationInput({
  value,
  onChange,
  onBlur,
  className,
  placeholder = "Romanized Nepali type garnuhos...",
  disabled = false,
  name,
  required,
}: NepaliTransliterationInputProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(
      "indic_transliterate__supported_languages",
      JSON.stringify([
        {
          Identifier: "ne",
          LangCode: "ne",
          DisplayName: "Nepali",
          Direction: "ltr",
          GoogleFont: "Noto Sans Devanagari",
          FallbackFont: "sans-serif",
          IsStable: true,
          Author: "AI4Bharat",
          CompiledDate: "",
        },
      ]),
    );
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <input
        className={cn("input-style", className)}
        disabled={disabled}
        lang="ne"
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    );
  }

  return (
    <IndicTransliterate
      customApiURL="/api/xlit-api/"
      enabled={!disabled}
      lang="ne"
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      renderComponent={(props) => (
        <input
          {...props}
          className={cn("input-style", className)}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      )}
    />
  );
}
