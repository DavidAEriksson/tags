"use client";
import styles from "./page.module.css";
import useSWR from "swr";

type TagData = {
  asset_name: string;
  category: string;
  id: number;
  registered_at: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, isLoading, error } = useSWR<TagData[]>(
    "https://serverless-tags.netlify.app/tag-data",
    fetcher,
    { refreshInterval: 1000 },
  );

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <main className={styles.main}>
      <h1>CW office tag tracker</h1>
      <p>Total count: {data.length}</p>
      {data.map((tag) => (
        <div key={tag.id}>
          <h4>Tag name: {tag.asset_name}</h4>
          <p>Category {tag.category}</p>
          <p> Registered at: {new Date(tag.registered_at).toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}
