"use client";
import { ProfileFormData } from "@/types/blog";
import axios from "axios";
import router from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";

const inputClass =
    "w-full py-2 px-3 border border-gray-300 rounded-md focus: outline-none focus:ring focus:border-blue-300";

const FormProfile = () => {
    const [formData, setFormData] = useState<ProfileFormData>({
        nickname: "",
        address: "",
        description: "",
    });

    const handleNicknameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            nickname: elem.value,
        });
    };

    const handleAddressChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            address: elem.value,
        });
    };

    const handleDescriptionChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            description: elem.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/profile/edit", formData);

            if (response.status === 200) {
                router.push(`/profile/edit`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4 space-y-5">
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="이름을 입력하세요"
                        name="title"
                        value={formData.nickname}
                        onChange={handleNicknameChange}
                    />

                    <input
                        type="text"
                        className={inputClass}
                        placeholder="주소를 입력하세요"
                        name="title"
                        value={formData.address}
                        onChange={handleAddressChange}
                    />

                    <input
                        type="text"
                        className={inputClass}
                        placeholder="소개 해주세요 입력하세요."
                        name="title"
                        value={formData.description}
                        onChange={handleDescriptionChange}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
                    >
                        글 업로드
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormProfile;
