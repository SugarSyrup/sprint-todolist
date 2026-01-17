import { http } from "@/src/utils/http";

export function uploadImage(image: File) {
  return http.post<{ image: File }, { url: string }>(
    "/images/upload",
    { image: image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
