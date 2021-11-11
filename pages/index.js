import Image from "next/image";
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ news }) {
  const dateNum = new Date().getMonth();
  return (
    <div id="top">
      <div>
        <h1><span>Discover</span><span>Idea</span><span>Brush up</span><span>Create</span></h1>
      </div>
      <div>
        <h2>NEWS</h2>
        <ul>
          {news.flatMap((news) =>
            new Date(news.updatedAt).getMonth() > dateNum - 2 ? (
              <li key={news.id}>
                <Link href={`/news/${news.id}`}>
                  <a>
                    <div className={`card-box`}>
                      <div className={`left`}>
                      {news.image ? (
                        <Image
                          alt={news.title}
                          src={news.image.url}
                          width={352}
                          height={265}
                          objectFit="cover"
                        />
                      ) : (
                        <Image
                          alt="no image"
                          src={"/images/noImage.png"}
                          width={352}
                          height={265}
                        />
                      )}
                      </div>
                      <div className={`right`}>
                        <div className={`created-at`}>{new Date(news.updatedAt).toLocaleDateString()}</div>
                        <div className={`title`}>{news.title}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ) : (
              []
            )
          )}
        </ul>
      </div>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "news" });

  return {
    props: {
      news: data.contents,
    },
  };
};
