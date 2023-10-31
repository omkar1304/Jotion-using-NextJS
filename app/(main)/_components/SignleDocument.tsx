"use client"

import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface Props {
  initialData: Doc<"documents">;
}

const SignleDocument = ({ initialData }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-start pl-14 items-center mb-2">
      {initialData.icon ? (
        <div className="shrink-0 mr-2 text-[18px]">{initialData.icon}</div>
      ) : (
        <div>
          <FileIcon className="mr-1"/>
        </div>
      )}
      <p
        className="font-semibold text-[#3F3F3F] underline underline-offset-4 cursor-pointer"
        onClick={() => router.push(`/documents/${initialData._id}`)}
      >
        {initialData.title}
      </p>
    </div>
  );
};

export default SignleDocument;
