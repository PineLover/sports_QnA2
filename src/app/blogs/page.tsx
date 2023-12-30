import React, { FC } from "react";
import AllBlogs from "../../components/Board/AllBlogs";
import { SportsSelectedPageProps } from "../sports/[id]/page";
import SportsSection from "@/components/SportsSection";

const BlogsPage: FC<SportsSelectedPageProps> = async ({ params }) => {
    return (
        <div className="p-8">
            <SportsSection />
            <AllBlogs
                params={{
                    id: `${params.id}`,
                    q: "",
                }}
            />
        </div>
    );
};

export default BlogsPage;
