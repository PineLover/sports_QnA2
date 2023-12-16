"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { FormData } from '@/types/blog';

const inputClass = "w-full py-2 px-3 border border-gray-300 rounded-md focus: outline-none focus:ring focus:border-blue-300";

const FormNewPost = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>) => {
        // e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        // const { name, value } = e.target;
        const elem = e.target as HTMLInputElement
        setFormData({
            ...formData,
            [elem.name]: elem.value,
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <input type="text" className={inputClass} placeholder="Enter the title" name="title" value={formData.title}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <ReactTextareaAutosize minRows={5} name="content" className={inputClass} placeholder="Enter the content" value={formData.content} 
                onChange={handleChange}
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400">Submit</button>
        </form>
    )
}

export default FormNewPost  