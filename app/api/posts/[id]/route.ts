import { NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/services/postService";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const post = await getPostById(Number(params.id));
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const post = await updatePost(Number(params.id), data);
  return NextResponse.json(post);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await deletePost(Number(params.id));
  return NextResponse.json({ msg: "Deleted" });
}
