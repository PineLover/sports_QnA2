import React from "react";
import AllBlogs from "../../components/Board/AllBlogs";

const BlogsPage = async () => {
    return (
        <div className="p-8">
            <AllBlogs
                params={{
                    id: "all",
                }}
            />
        </div>
    );
};

export default BlogsPage;
