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

type NepaliTransliterationTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
};

export default function NepaliTransliterationTextarea({
  value,
  onChange,
  className,
  placeholder = "Romanized Nepali type garnuhos...",
  rows = 8,
  disabled = false,
}: NepaliTransliterationTextareaProps) {
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

  if (!isReady) return null;

  return (
    <IndicTransliterate
      lang="ne"
      customApiURL="/api/xlit-api/"
      value={value}
      onChangeText={onChange}
      enabled={!disabled}
      renderComponent={(props) => (
        <textarea
          {...props}
          rows={rows}
          disabled={disabled}
          lang="ne"
          placeholder={placeholder}
          className={cn(
            "flex min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        />
      )}
    />
  );
}
