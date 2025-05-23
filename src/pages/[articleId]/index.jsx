import { Fragment } from 'react';
import Head from 'next/head';

import ArticleDetail from '@/components/features/articles/ArticleDetail';

function ArticleDetailPage(props) {
  const { article } = props;

  return (
    <Fragment>
      <Head>
        <title>{`CodeFeed | ${article.category}`}</title>
        <meta 
          name='description'
          description={article.title + ': ' + article.description}
        />
      </Head>
      <ArticleDetail 
        image={article.image}
        title={article.title}
        description={article.description}
        category={article.category}
      />
    </Fragment>
  );
}

// STATIC SITE DYNAMIC PATHS (snippet: "ngspa")
export const getStaticPaths = async () => {
  try {
  // (a) Fetches ENTIRE articles array from INTERNAL API
  const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.NEWS_API_KEY}`);
  const articles = await response.json();

  // (b) Pull ALL the ids out of the articles array ONLY
  const idList = articles.map((news) => news.id);

  // (c) Pre-build ALL the URL paths for all existing ids in array 
  const paths = idList.map((id) => (
    { params: { articleId: id.toString() }}
  ));
  // NOTE: The id MUST be converted to a string, as URLs need strings NOT numbers!

  return {
    paths,
    fallback: false };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: false };
  }
}

// STATIC SITE GENERATION (snippet: "ngsp")
export const getStaticProps = async ( context ) => {
  try {
  // (a) Fetches ENTIRE articles array from INTERNAL API
  const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.NEWS_API_KEY}`);
  const articles = await response.json();
  
  // (b) Store params id value (article USER wants!)
  const articleQuery = context.params.articleId;

  // (c) Filters articles array to match & return article passed in params
  const articleMatch = articles.filter(
    (article) => article.id.toString() === articleQuery 
  )

  return {
    props: {
      article: articleMatch[0]
    },
  };
} catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        article: null
      },
    };
  }
}

export default ArticleDetailPage;