import { Fragment } from 'react';
import Head from 'next/head';

import ArticleDetail from '@/components/features/articles/ArticleDetail';

function ArticleDetailPage(props) {
  const { article } = props;

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>{`AUSNEWSHUB | ${article.category}`}</title>
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

// export const getStaticPaths = async () => {
//   try {
//     const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NEWS_API_KEY}`);
//     const data = await response.json();
//     const articles = data.articles || [];

//     const idList = articles.map((news, idx) => {
//       // If articles don't have an id, use idx or another unique property
//       return news.id ? news.id.toString() : idx.toString();
//     });

//     const paths = idList.map((id) => ({
//       params: { articleId: id }
//     }));

//     return {
//       paths,
//       fallback: false
//     };
//   } catch (error) {
//     console.error('Error in getStaticPaths:', error);
//     return { paths: [], fallback: false };
//   }
// };

export const getStaticProps = async ( context ) => {
  try {
    // Fetch articles from NewsAPI
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();
    const articles = data.articles || [];
    
    // Get the articleId from params
    const articleQuery = context.params.articleId;

    // Use index as fallback if no id property
    const articleMatch = articles.filter(
      (article, idx) =>
        (article.id && article.id.toString() === articleQuery) ||
        (!article.id && idx.toString() === articleQuery)
    );

    

    return {
      props: {
        article: articleMatch[0] || null
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