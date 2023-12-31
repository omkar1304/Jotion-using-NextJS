"use client";

import { Cover } from "@/components/cover";

import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { update } from "@/convex/documents";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import SignleDocument from "@/app/(main)/_components/SignleDocument";


interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const Page = ({ params }: Props) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const documents = useQuery(api.documents.getChildren, {
    id: params.documentId,
  });

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content: content,
    });
  };

  if (document === undefined || documents === undefined) {
    return (
      <div>
        <p>loading...</p>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto ">
        <Toolbar initialData={document} />
       <div className="flex flex-col justify-between mb-4">
       {documents.map((singleDocument) => (
          <SignleDocument initialData={singleDocument} key={singleDocument._id} />
        ))}
       </div>
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default Page;
