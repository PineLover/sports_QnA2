import { SportsSelectedPageProps } from "@/app/sports/[id]/page";
import AllBlogs from "@/components/Board/AllBlogs";
import SportsSection from "@/components/SportsSection";
import React, { FC } from "react";

const BlogsQueryPage: FC<SportsSelectedPageProps> = async ({ params }) => {
    return (
        <div className="p-8 space-y-5">
            <SportsSection />
            <AllBlogs
                params={{
                    id: `${params.id}`,
                    q: `${params.q}`,
                }}
            />
        </div>
    );
};

export default BlogsQueryPage;
