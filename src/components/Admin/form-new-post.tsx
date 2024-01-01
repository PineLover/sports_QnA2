"use client";
import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { FormData } from "@/types/blog";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { quill_formats } from "../QuillEditorComponent";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebae/config";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import ReactQuill, { ReactQuillProps } from "react-quill";
import { Sports } from "@prisma/client";

interface AdminFormData {
    title: string;
    author: string;
    content: string;
    sportsId: string;
}

interface ForwardedQuillComponent extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
    async () => {
        const { default: QuillComponent } = await import("react-quill");
        const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
            <QuillComponent ref={forwardedRef} {...props} />
        );
        return Quill;
    },
    { loading: () => <div>...loading</div>, ssr: false }
);

const inputClass =
    "w-full py-2 px-3 border border-gray-300 rounded-md focus: outline-none focus:ring focus:border-red-300";

const AdminFormNewPost = () => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);

    const [sports, setSports] = useState<Sports[]>([]);
    const getSports = async () => {
        try {
            const response = await fetch(`/api/sports`);
            const result = await response.json();
            setSports(result.sports);
        } catch (error) {}
    };
    useEffect(() => {
        getSports();
    }, []);

    const [formData, setFormData] = useState<AdminFormData>({
        title: "",
        author: "",
        content: "",
        sportsId: "",
    });

    const { data } = useSession();
    const router = useRouter();

    const handleQuillChange = (value: string) => {
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

    const handleAuthorChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            author: elem.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
        try {
            const response = await axios.post("api/admin/posts", formData);

            if (response.status === 200) {
                router.push(`/blogs/${response.data.newPost.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 이미지 핸들러
    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            if (quillRef.current && input.files) {
                const editor = quillRef.current.getEditor();
                const file = input.files[0];
                const range = editor.getSelection(true);
                try {
                    const fileId = uuid();

                    const formatFile = file.type.split("/")[1];
                    const storeageRef = ref(
                        storage,
                        `posts/${fileId}.${formatFile}`
                    );
                    const uploadTask = uploadBytesResumable(storeageRef, file);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            setProgress(progress);
                        },
                        (error) => {
                            setError(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                (downloadURL) => {
                                    editor.insertEmbed(
                                        range.index,
                                        "image",
                                        downloadURL
                                    );

                                    editor.setSelection(range.index, 1);
                                }
                            );
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const custom_quill_modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: "1" }, { header: "2" }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
                    ["image"],
                ],
                handlers: { image: imageHandler },
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4 space-x-1">
                <div className="join space-x-2">
                    {sports.map((sport) => (
                        <input
                            className="join-item btn btn-sm"
                            key={sport.id}
                            type="radio"
                            name="sports"
                            data-title="1"
                            aria-label={sport.name}
                            value={sport.id}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    sportsId: sport.id,
                                });
                            }}
                            required
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className={inputClass}
                    placeholder="제목 입력"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                />
            </div>

            {/* <div className="mb-4">
                <input
                    type="text"
                    className={inputClass}
                    placeholder="작성자 이름 입력"
                    name="title"
                    value={formData.author}
                    onChange={handleAuthorChange}
                    required
                />
            </div> */}

            <div className="mb-4" style={{ height: "500px" }}>
                <QuillNoSSRWrapper
                    modules={custom_quill_modules}
                    style={{ height: "440px" }}
                    formats={quill_formats}
                    theme="snow"
                    forwardedRef={quillRef}
                    value={formData.content}
                    onChange={handleQuillChange}
                    placeholder="본문"
                />
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

export default AdminFormNewPost;
