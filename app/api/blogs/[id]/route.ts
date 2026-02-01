import { NextResponse } from "next/server";
import { deleteBlog, getBlogById, updateBlog } from "@/services/blogService";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const blog = await getBlogById(Number(params.id));
  return NextResponse.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const blog = await updateBlog(Number(params.id), data);
  return NextResponse.json(blog);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await deleteBlog(Number(params.id));
  return NextResponse.json({ msg: "Deleted" });
}
