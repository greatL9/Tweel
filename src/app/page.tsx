import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";

export default async function Home() {
  const newsResults = await getNews();
  const randomUsersResults = await getUsers();
  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <Feed />
      <Widgets
        newsResults={newsResults}
        randomUsersResults={randomUsersResults}
      />
    </main>
  );
}

export async function getNews() {
  try {
    const res = await fetch(
      `https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const newsResults = await res.json();

    return newsResults;
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [] };
  }
}

export async function getUsers() {
  try {
    const res = await fetch(
      `https://randomuser.me/api/?results=30&inc=name,login,picture`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }

    const randomUsersResults = await res.json();

    return randomUsersResults;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { results: [] };
  }
}
