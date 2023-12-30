import React, { FC } from "react";
import AllBlogs from "../../components/Board/AllBlogs";
import { SportsSelectedPageProps } from "../sports/[id]/page";

const BlogsPage: FC<SportsSelectedPageProps> = async ({ params }) => {
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

export default BlogsPage;
