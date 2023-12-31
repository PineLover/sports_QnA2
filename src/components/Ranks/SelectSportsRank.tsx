import Link from "next/link";
import React from "react";
import { MdOutlineSportsTennis } from "react-icons/md";

const SelectSportsRank = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Link className="btn btn-xl" href="/ranks/squash">
                <MdOutlineSportsTennis />
                스쿼시
            </Link>
            <Link className="btn btn-xl" href="/ranks/pickleball">
                <MdOutlineSportsTennis />
                피클볼
            </Link>
        </div>
    );
};

export default SelectSportsRank;
