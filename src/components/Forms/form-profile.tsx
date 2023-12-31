"use client";
import { ProfileFormData } from "@/types/profile";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebae/config";
import Image from "next/image";
import { Sports } from "@prisma/client";
import { LocalStorageIds } from "@/lib/localStorageIds";

const inputClass =
    "w-full py-2 px-3 border border-gray-300 rounded-md focus: outline-none focus:ring focus:border-blue-300";

const FormProfile = () => {
    const [image, setImage] = useState("/blank.png");
    const router = useRouter();
    const [formData, setFormData] = useState<ProfileFormData>({
        profileImageUrl: "",
        link1: "",
        nickname: "",
        address: "",
        description: "",
        sportsId: "",
    });

    const [sports, setSports] = useState<Sports[]>([]);
    const [selectedSportsId, setSelectedSportsId] = useState<string>("");

    const handleImage = async (e: any) => {
        // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
        const file = e.target.files[0];
        if (!file) return;
        // 이미지 화면에 띄우기
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            if (reader.readyState === 2) {
                // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
                setImage(e.target.result);
            }
        };
        try {
            const fileId = uuid();

            const formatFile = file.type.split("/")[1];
            console.log(formatFile);
            const storeageRef = ref(storage, `posts/${fileId}.${formatFile}`);
            const uploadTask = uploadBytesResumable(storeageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            console.log("File available at", downloadURL);

                            setFormData({
                                ...formData,
                                profileImageUrl: downloadURL,
                            });
                        }
                    );
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

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

    const handleLink1Change = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            link1: elem.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(`formData: ${formData}`);

        try {
            const response = await axios.post("/api/profile/edit", formData);

            if (response.status === 200) {
                router.push(`/profile`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getSports = async () => {
        try {
            const response = await fetch(`${process.env.local_url}/api/sports`);
            const result = await response.json();
            setSports(result.sports);
        } catch (error) {}
    };

    useEffect(() => {
        getSports();
    }, []);

    return (
        <div>
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4 space-y-5">
                    {image != "/blank.png" ? (
                        <Image
                            src={image}
                            width={150}
                            height={150}
                            alt="프로필 이미지"
                        />
                    ) : (
                        <div></div>
                    )}

                    <div className="space-x-2">
                        <input type="file" onChange={handleImage} />
                    </div>

                    <div className="flex space-x-2 py-2">
                        {sports.map((sport) =>
                            selectedSportsId == sport.id ? (
                                <div
                                    key={sport.id}
                                    className="btn btn-sm bg-red-200"
                                >
                                    {sport.name}
                                </div>
                            ) : (
                                <div
                                    key={sport.id}
                                    className="btn btn-sm bg-Slate-50"
                                    onClick={() => {
                                        setSelectedSportsId(sport.id);
                                        setFormData({
                                            ...formData,
                                            sportsId: sport.id,
                                        });
                                    }}
                                >
                                    {sport.name}
                                </div>
                            )
                        )}
                    </div>

                    <div className="">
                        <label>이름</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="이름을 입력하세요"
                            name="title"
                            value={formData.nickname}
                            onChange={handleNicknameChange}
                        />
                    </div>

                    <div className="">
                        <label>주소</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="주소를 입력하세요"
                            name="title"
                            value={formData.address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="">
                        <label>소개</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="소개 해주세요 입력하세요."
                            name="title"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div className="">
                        <label>홈페이지</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="홈페이지 링크를 입력하세요."
                            name="title"
                            value={formData.link1}
                            onChange={handleLink1Change}
                        />
                    </div>

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
