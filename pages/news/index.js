import Link from "next/link";
import Image from "next/image";
import { client } from "../../libs/client";
import { useState } from "react";

const categories = [
  { name: "一般", id: "general" },
  { name: "採用情報", id: "recruit" },
  { name: "掲載情報", id: "publish" },
  { name: "商品情報", id: "product" },
];

export default function News({ news }) {
  const [contents, setContents] = useState(news);
  const sortEvent = (e) => {
    let newContents = news.filter((res) => {
      return res.category.name === e.target.value;
    });
    setContents(newContents);
  };
  return (
    <div id="news">
      <h1>News</h1>
      <form>
        <select className={`select-category`} onChange={(e) => sortEvent(e)}>
          <option disabled selected>
            カテゴリで絞る
          </option>
          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </form>
      <div className={`news-list`}>
        {contents.map((news) => (
          <article key={news.id}>
            <Link href={`/news/${news.id}`}>
              <a>
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
                <dl>
                  <dt className={`news-date`}>
                    {new Date(news.publishedAt).toLocaleDateString("ko-KR")}
                  </dt>
                  <dt className={`news-title`}>{news.title}</dt>
                  <dd className={`news-category`}>{news.category.name}</dd>
                </dl>
              </a>
            </Link>
          </article>
        ))}
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
