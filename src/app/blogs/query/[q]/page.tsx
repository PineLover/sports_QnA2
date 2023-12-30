import { SportsSelectedPageProps } from "@/app/sports/[id]/page";
import AllBlogs from "@/components/Board/AllBlogs";
import React, { FC } from "react";

const BlogsQueryPage: FC<SportsSelectedPageProps> = async ({ params }) => {
    console.log(`SportsPage1 ${params.q}`);

    return (
        <div className="p-8">
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
