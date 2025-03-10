import "bootstrap/dist/css/bootstrap.min.css";
import { getPosts } from "@/lib/data";

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog", { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error("Failed to fetch posts.");
    }
    return res.json();
};

const BlogPage = async () => {
    const posts = await getData();

    return (
            <div className=" mt-4">

                <div className="row"> {/* Fix lỗi nằm giữa */}
                    <div className="mb-4 d-flex ">
                        <div className="input-group rounded-pill border overflow-hidden" style={{maxWidth: "300px"}}>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                style={{flex: "1", minWidth: "150px"}}
                            />
                            <button className="border-0 shadow-none">
                                🔍
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success">Create Question</button>
                    </div>
                    {posts.map((post) => (
                        <div className="col-md-3 mb-4" key={post.id}>
                            <div className="card h-100 bg-secondary text-white d-flex flex-column">
                                <div className="card-body flex-grow-1">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut debitis
                                        deserunt eos fuga veniam? Ab asperiores,
                                        <button className="rounded-pill px-2 py-1 text-center" style={{
                                            width: "40px",
                                            height: "20px",
                                            fontSize: "12px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            lineHeight: "1", // Đảm bảo văn bản không bị giãn dòng
                                            overflow: "hidden", // Tránh trường hợp nội dung tràn ra ngoài
                                            whiteSpace: "nowrap" // Ngăn chữ xuống dòng
                                        }}>
                                            . . .
                                        </button>


                                    </p>

                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a href={`/post/${post.id}`} className="btn btn-light w-100">
                                        Read More
                                    </a>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default BlogPage;
