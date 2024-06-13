import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sort, setSort] = useState('-published_at');

  useEffect(() => {
    fetchPosts();
  }, [page, pageSize, sort]);

  const fetchPosts = async () => {
    const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`;
    
    try {
      const response = await axios.get(url);
      const { data, meta } = response.data;
      setPosts(data);
      setTotalPosts(meta.total);
    } catch (error) {
      console.error("Error fetching posts", error);
      // Handle error state or notify user appropriately
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPosts([]);
    setPage(1);
    setPageSize(newSize);
  };

  const handleSortChange = (e) => {
    setPosts([]);
    setPage(1);
    setSort(e.target.value);
  };

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalPosts)} of {totalPosts}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-10">
            <span className="mr-2">Show Per Page:</span>
            <select
              className="border p-2 rounded-xl"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div>
            <span className="mr-2">Sort By:</span>
            <select
              className="border p-2 rounded-xl"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="-published_at">Terbaru</option>
              <option value="published_at">Terlama</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-xl">
            <div className="relative h-48">
              {post.small_image && (
                <Image
                  src={post.small_image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
            </div>
            <p>{new Date(post.published_at).toLocaleDateString()}</p> 
            <h3 className="text-xl font-bold mb-2 line-clamp-3">{post.title}</h3>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-xl border ${page === index + 1 ? 'bg-accent text-white' : 'bg-white text-black'}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
