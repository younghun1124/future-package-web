import { NextResponse } from "next/server";
import { uploadToGCS } from "@/utils/uploadImage";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const futureImage = formData.get("future_image");
    const type = formData.get("type"); // 'future_hologram' 또는 'future_face_mirror'
    
    if (!futureImage) {
      return NextResponse.json(
        { error: "이미지가 없습니다." },
        { status: 400 }
      );
    }

    const bytes = await futureImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const imageObject = {
      name: futureImage.name,
      type: futureImage.type,
      buffer: buffer
    };

    const folder = type === 'FutureHologram' ? 'holograms' : 'mirrors';
    const imageUrl = await uploadToGCS(imageObject, folder);

    return NextResponse.json({ imageUrl });
    
  } catch (error) {
    console.error('Error uploading FutureImage:', error);
    return NextResponse.json(
      { error: "이미지 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}