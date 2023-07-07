"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Forms from "@/components/Forms";

const promptCreate = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({ prompt: "", tag: "" });

  const CreatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
console.log(response)
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <div>
      <Forms
        type="Create"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
      />
    </div>
  );
};

export default promptCreate;
