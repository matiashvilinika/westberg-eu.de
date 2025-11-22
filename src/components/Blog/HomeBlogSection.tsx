import { getPosts } from "@/sanity/sanity-utils";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

export default async function HomeBlogSection() {
  const posts = await getPosts();

  // Handle case when posts is not an array (Sanity disabled)
  if (!Array.isArray(posts)) {
    return (
      <section id="blog" className="pt-14 sm:pt-20 lg:pt-[130px]">
        <div className="px-4 xl:container">
          <SectionTitle
            mainTitle="BLOGS"
            title="Latest News & Articles From Our Blog"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus."
          />
          <div className="w-full border-b pb-20 dark:border-[#2E333D]">
            <p className="text-center text-dark-text dark:text-white">No blog posts available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <div className="px-4 xl:container">
        <SectionTitle
          mainTitle="BLOGS"
          title="Latest News & Articles From Our Blog"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus."
        />

        <div className="w-full border-b pb-20 dark:border-[#2E333D]">
          <div className="grid gap-x-8 gap-y-10 min-[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
            {posts.slice(0, 3).map((blog) => (
              <SingleBlog blog={blog} key={blog?.slug.current} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
