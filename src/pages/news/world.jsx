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
        title='Globe News' 
        description='Catch up on all the global news via BBC News'
        bgImage="/backgrounds/hero-news.webp"
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

  // Returned data as props
  return {
    props: {
      worldArticles: articles
    }
  };
};

export default WorldNewsPage