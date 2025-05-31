import { Fragment } from 'react';
import Head from 'next/head';

import HeroSection from '@/components/layout/HeroSection/HeroSection';
import ArticlesList from '@/components/features/articles/ArticlesList';

function HomePage(props) {
  const { articles } = props 

  return (
    <Fragment>
      <Head>
        <title>AUSNEWSHUB | Home</title>
        <meta 
          name='description'
          description='Browse all the coding news of today from around the globe on AUSNEWSHUB'
        />
      </Head>
      <HeroSection 
        title='Top News Headlines' 
        description='Read the Top Headlines from around the World'
        bgImage="/backgrounds/earth.webp"
        alt="Earth Background Image"
      />
      {articles.length > 0 && <ArticlesList articles={articles} />}
    </Fragment>
  )
}

// STATIC SITE GENERATION (snippet: "ngsp")
export const getStaticProps = async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;
  
  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  return {
    props: {
      articles: articles
    },
    revalidate: 60
  };
};

export default HomePage;