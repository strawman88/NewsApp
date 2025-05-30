import { Fragment } from "react"
import Head from "next/head";

import ArticlesList from "@/components/features/articles/ArticlesList";
import HeroSection from "@/components/layout/HeroSection";

function SportsNewsPage({ sportsArticles }) {
  return (
    <Fragment>
      <Head>
        <title>AUSNEWSHUB | Sports Headlines</title>
        <meta 
          name='description'
          description='Check out the trending sports headlines!'
        />
      </Head>
      <HeroSection 
        title='Sports News' 
        description='Catch up on Top Sports News from around the globe'
        bgImage="/backgrounds/hero-news.webp"
      />
      {sportsArticles.length > 0 && <ArticlesList 
        articles={sportsArticles} 
      />}
    </Fragment>
  )
}

export const getStaticProps = async () => {
  // External API Request: sports Category
  const response = await fetch(`https://newsapi.org/v2/top-headlines?category=sports&sortBy=publishedAt&pageSize=20&page=1&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;
  // console.log(articles);

  // ERROR HANDLING WITH SSG
  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  // Filter data to remove BAD / NO IMAGES
  let sanitisedArticles = articles.filter(article => article.urlToImage !== null);
  // console.log(sanitisedArticles)

  // Returned data as props
  return {
    props: {
      sportsArticles: sanitisedArticles
    },
    revalidate: 60
  };
};

export default SportsNewsPage