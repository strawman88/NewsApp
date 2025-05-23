import { Fragment } from 'react';
import Head from 'next/head';

import HeroSection from '@/components/layout/HeroSection/HeroSection';
import ArticlesList from '@/components/features/articles/ArticlesList';

function HomePage(props) {
  const { articles } = props 

  return (
    <Fragment>
      <Head>
        <title>Code-Feed | Home</title>
        <meta 
          name='description'
          description='Browse all the coding news of today from around the globe'
        />
      </Head>
      <HeroSection 
        title='Code' 
        description='Catch up on all the coding news from around the globe, at the touch of a button'
        bgImage="/backgrounds/hero-code.webp"
      />
      {articles.length > 0 && <ArticlesList articles={articles} />}
    </Fragment>
  )
}

// STATIC SITE GENERATION (snippet: "ngsp")
export const getStaticProps = async () => {
  // Fetch data from Internal API ("Code News")
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;

  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  // Returned data as props & ISR functionality
  return {
    props: {
      articles: articles
    },
    revalidate: 60
  };
};

export default HomePage;