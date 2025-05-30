import { Fragment } from "react"
import Head from "next/head";

import ArticlesList from "@/components/features/articles/ArticlesList";
import HeroSection from "@/components/layout/HeroSection";

function AusNewsPage(props) {
  const { ausArticles } = props;  

  return (
    <Fragment>
      <Head>
        <title>AUSNEWSHUB | Aus News</title>
        <meta 
          name='description'
          description='Browse all the Australian news of today via ABC News AU'
        />
      </Head>
      <HeroSection 
        title='Aus News' 
        description='Catch up on all Australian News via ABC News'
        bgImage="/backgrounds/background.webp"
        alt="Australian landscape background image"
      />
      {/* Refactored Render */}
      {ausArticles.length > 0 && <ArticlesList articles={ausArticles} />}
    </Fragment>
  )
}

export const getStaticProps = async () => {
  // External API Request: NewsAPI (ABC News AU)
  const response = await fetch(`https://newsapi.org/v2/everything?sources=abc-news-au&sortBy=publishedAt&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;
  // console.log(articles);

  // ERROR HANDLING WITH SSG: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#error-handling-and-revalidation
  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  // Filter data to remove BAD / NO IMAGES
  let sanitisedArticles = articles.filter(article => article.urlToImage !== null);

  // Returned data as props
  return {
    props: {
      ausArticles: sanitisedArticles
    },
    revalidate: 60
  };
};

export default AusNewsPage