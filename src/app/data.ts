export const getNews = async () => {
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
};

export const getUsers = async () => {
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
};
