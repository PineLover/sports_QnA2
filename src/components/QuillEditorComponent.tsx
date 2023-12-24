import React, { ChangeEvent, FC, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// const imageHandler = (file: File) => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.addEventListener("change", async () => {
//         // const file = input.files[0];

//         try {
//             const res = await imageApi({ img: file });
//             const imgUrl = res.data.imgUrl;
//             const editor = quillRef.current.getEditor();
//             const range = editor.getSelection();
//             editor.insertEmbed(range.index, "image", imgUrl);
//             editor.setSelection(range.index + 1);
//         } catch (error) {
//             console.log(error);
//         }
//     });
// };

export const quill_modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],

        ["link", "image", "video"],
    ],
    // handlers: { image: imageHandler },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

export const quill_formats = [
    "header",
    "font",
    "size",
    "bold",
    "underline",
    "strike",
    "blockquote",
    "align",
    "image",
];
