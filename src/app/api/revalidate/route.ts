import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATION_SECRET =
  process.env.REVALIDATION_SECRET || process.env.VOICECARE_FORM_API_KEY || "";

const SLUG_TO_PATHS: Record<string, string[]> = {
  "homepage-hero": ["/"],
  "value-metrics": ["/"],
  "radical-efficiencies": ["/"],
  "ehr-integrations": ["/"],
  "product-intro": ["/"],
  "trusted-by": ["/"],
  solutions: ["/solutions"],
  company: ["/company"],
  careers: ["/careers"],
  pricing: ["/pricing"],
  "partner-with-us": ["/partner-with-us"],
  security: ["/security"],
  blogs: ["/blogs"],
  layout: ["/", "/solutions", "/company", "/pricing", "/careers", "/security", "/partner-with-us"],
};

function validate(secret?: string) {
  return !!secret && secret === REVALIDATION_SECRET;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, secret } = body;

    if (!validate(secret)) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Missing slug parameter" },
        { status: 400 }
      );
    }

    if (slug === "all") {
      revalidateTag("content", "max");
      const allPaths = Array.from(new Set(Object.values(SLUG_TO_PATHS).flat()));
      allPaths.forEach((path) => revalidatePath(path, "page"));
      return NextResponse.json({
        success: true,
        message: "All content revalidated",
        revalidated: allPaths,
      });
    }

    revalidateTag(`content-${slug}`, "max");
    const paths = SLUG_TO_PATHS[slug] || [];
    for (const path of paths) revalidatePath(path, "page");

    return NextResponse.json({
      success: true,
      message: `Revalidated content: ${slug}`,
      revalidated: paths,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, message: "Revalidation failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const secret = searchParams.get("secret");

  if (!validate(secret || undefined)) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }
  if (!slug) {
    return NextResponse.json(
      { success: false, message: "Missing slug parameter. Use ?slug=all to revalidate everything." },
      { status: 400 }
    );
  }

  if (slug === "all") {
    revalidateTag("content", "max");
    const allPaths = Array.from(new Set(Object.values(SLUG_TO_PATHS).flat()));
    allPaths.forEach((path) => revalidatePath(path, "page"));
    return NextResponse.json({ success: true, message: "All content revalidated" });
  }

  revalidateTag(`content-${slug}`, "max");
  const paths = SLUG_TO_PATHS[slug] || [];
  for (const path of paths) revalidatePath(path, "page");
  return NextResponse.json({ success: true, message: `Revalidated: ${slug}` });
}
