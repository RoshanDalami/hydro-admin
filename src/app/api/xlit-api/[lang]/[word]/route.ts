import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ lang: string; word: string }>;
};

type GoogleInputToolsResponse = [
  string,
  Array<[string, string[], ...unknown[]]>,
];

export async function GET(_request: Request, { params }: RouteContext) {
  const { lang, word } = await params;

  if (lang !== "ne") {
    return NextResponse.json({ result: [] }, { status: 400 });
  }

  const romanizedWord = decodeURIComponent(word).trim();

  if (!romanizedWord) {
    return NextResponse.json({ result: [] });
  }

  const query = new URLSearchParams({
    text: romanizedWord,
    itc: "ne-t-i0-und",
    num: "5",
    cp: "0",
    cs: "1",
    ie: "utf-8",
    oe: "utf-8",
  });

  try {
    const response = await fetch(
      `https://inputtools.google.com/request?${query.toString()}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return NextResponse.json({ result: [romanizedWord] });
    }

    const data = (await response.json()) as GoogleInputToolsResponse;
    const suggestions = data[0] === "SUCCESS" ? data[1]?.[0]?.[1] : [];

    return NextResponse.json({
      result: suggestions?.length ? suggestions : [romanizedWord],
    });
  } catch {
    return NextResponse.json({ result: [romanizedWord] });
  }
}
