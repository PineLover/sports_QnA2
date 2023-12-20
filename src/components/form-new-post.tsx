"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { FormData } from "@/types/blog";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { quill_formats, quill_modules } from "./QuillEditorComponent";
import ReactQuill from "react-quill";

const inputClass =
    "w-full py-2 px-3 border border-gray-300 rounded-md focus: outline-none focus:ring focus:border-blue-300";

const FormNewPost = () => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
    });
    const { data } = useSession();
    const router = useRouter();

    const handleQuillChange = (value: string) => {
        console.log(value);
        setFormData({
            ...formData,
            content: value,
        });
    };

    const handleTitleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            title: elem.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("api/posts", formData);

            if (response.status === 200) {
                router.push(`/blogs/${response.data.newPost.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="text"
                    className={inputClass}
                    placeholder="제목 입력"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="mb-4" style={{ height: "500px" }}>
                <ReactQuill
                    modules={quill_modules}
                    style={{ height: "440px" }}
                    formats={quill_formats}
                    theme="snow"
                    value={formData.content}
                    onChange={handleQuillChange}
                    placeholder="본문"
                />

                {/* <ReactTextareaAutosize
                    minRows={5}
                    name="content"
                    className={inputClass}
                    placeholder="Enter the content"
                    value={formData.content}
                    onChange={handleChange}
                /> */}
            </div>
            <div className="">
                <button
                    disabled={!data?.user?.email}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
                >
                    글 업로드
                </button>
            </div>
        </form>
    );
};

export default FormNewPost;
