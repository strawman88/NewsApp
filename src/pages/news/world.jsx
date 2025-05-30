import { Fragment } from "react"
import Head from "next/head"

import HeroSection from "@/components/layout/HeroSection"
import ArticlesList from "@/components/features/articles/ArticlesList"

function WorldNewsPage(props) {
  const { worldArticles } = props; 

  return (
    <Fragment>
      <Head>
        <title>AUSNEWSHUB | World News</title>
        <meta 
          name='description'
          description='Browse all the global news of today via BBC News UK'
        />
      </Head>
      <HeroSection 
        title='World News' 
        description='Catch up on all the world news via BBC News'
        bgImage="/backgrounds/background.jpg"
      />
      {/* SSG Render */}
      {worldArticles.length > 0 && <ArticlesList articles={worldArticles} />}
    </Fragment>
  )
}

// SERVER SIDE GENERATION (snippet: "ngss")
export const getServerSideProps = async (context) => {
  // External API Request: NewsAPI (BBC News)
  const response = await fetch(`https://newsapi.org/v2/everything?sources=bbc-news&sortBy=publishedAt&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;
  // console.log(articles);

  // ERROR HANDLING WITH SSR
  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  const isBulletin = article => {
  // Check if description matches known bulletin text
  const bulletinDescription = "The latest five minute news bulletin from BBC World Service.";
  // Check if title looks like a date/time (e.g., starts with DD/MM/YYYY)
  const datePattern = /^\d{2}\/\d{2}\/\d{4}/;
  return (
    (article.description && article.description.trim() === bulletinDescription) ||
    (article.title && datePattern.test(article.title))
  );
};

// Filter data to remove BAD / NO IMAGES and bulletins
let sanitisedArticles = articles.filter(
  article =>
    article.urlToImage &&
    !isBulletin(article)
);
  // Returned data as props
  return {
    props: {
      worldArticles: sanitisedArticles
    }
  };
};

export default WorldNewsPage