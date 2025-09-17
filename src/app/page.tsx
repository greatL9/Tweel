import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";

export default async function Home() {
  const newsResults = await getNews();
  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <Feed />
      <Widgets newsResults={newsResults} />
    </main>
  );
}

export async function getNews() {
  const res = await fetch(
    `https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`
  );
  const newsResults = await res.json();

  return newsResults;
}
