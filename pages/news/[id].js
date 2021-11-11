import { client } from "../../libs/client";
import Link from "next/link";
import Image from "next/image";

export default function NewsId({ news }) {
  return (
    <>
      <div id={`id`}>
        <div className={`thumbnail`}>
          { news.image ?
            <Image
              alt={news.title}
              src={news.image.url}
              width={1088}
              height={612}
              objectFit="cover"
            />
          :
            <Image
              alt="no image"
              src={"/images/noImage.png"}
              width={1088}
              height={612}
              objectFit="cover"
            />
          }
        </div>
        <div className={`main`}>
          <div className={`created-at`}>{new Date(news.updatedAt).toLocaleDateString()}</div>
          <h1>{news.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: `${news.body}`,
            }}
            className={`content`}
          />
          <Link href="/news">
            <a className={`back`}>BACK</a>
          </Link>
        </div>
      </div>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "news" });

  const paths = data.contents.map((content) => `/news/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "news", contentId: id });

  return {
    props: {
      news: data,
    },
  };
};
