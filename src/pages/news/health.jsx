import { Fragment } from "react"
import Head from "next/head";

import ArticlesList from "@/components/features/articles/ArticlesList";
import HeroSection from "@/components/layout/HeroSection";

function HealthNewsPage({ healthArticles }) {
  return (
    <Fragment>
      <Head>
        <title>AUSNEWSHUB | Health Headlines</title>
        <meta 
          name='description'
          description='Check out the trending health headlines!'
        />
      </Head>
      <HeroSection 
        title='Health' 
        description='Catch up on Top Health News from around the globe'
        bgImage="/backgrounds/hero-news.webp"
      />
      {healthArticles.length > 0 && <ArticlesList 
        articles={healthArticles} 
      />}
    </Fragment>
  )
}

export const getStaticProps = async () => {
  // External API Request: Tech Category
  const response = await fetch(`https://newsapi.org/v2/top-headlines?category=health&sortBy=publishedAt&pageSize=10&page=1&apiKey=${process.env.NEWS_API_KEY}`);
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
      healthArticles: sanitisedArticles
    },
    revalidate: 60
  };
};

export default HealthNewsPage