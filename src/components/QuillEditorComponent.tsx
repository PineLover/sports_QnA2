import React, { ChangeEvent, FC, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const quill_modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],

        ["link", "image", "video"],
    ],
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
