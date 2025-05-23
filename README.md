# [E] NEXT.JS: POST-DEPLOYMENT FEATURES

## 9. CODEFEED PRE-BUILT PATHS

### A. ADVANCED DYNAMIC DATA THEORY

- **(a) `map()` method & `index`:**
    
  - The JavaScript map method takes an optional parameter being the `index`, allowing us to take the original array positions & pass them as explicit keys to new array
    
  - [React on Index](https://legacy.reactjs.org/docs/lists-and-keys.html)

  - [MDN on Map & Index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

- **(b) Programmatic Navigation**

  - **PREVIOUSLY:** We apprended the dynamic URL slug onto the end of a Link `href` using string interpolation, to navigate to the correct path (*such as to fill to populate `[articleId]`*)

  - **ALTERNATE:** We can have a button call an `onClick` which manually calls the router & appends on the id & pushes the user to the new URL

  - **IN OUR CASE:** Create a new `onClick` function called `handleNavigate` and we **"push"** the id onto the end of the URL path, to MATCH the dynamic route set via our pages routing

&nbsp;

### B. PRE-RENDERED LIST WITH MERGED DYNAMIC DATA

**GOAL:** *On our `HomePage`, we will loop/map the data from `/api/news` into a list.  To optimise time, we will reuse `ArticleList` & `ArticleItem` & adjust them so they can accept slightly varied props*

**SETUP:**

  - **(a) Re-enable data fetch:** Un-comment the `getStaticProps`, which we commented out on `index.jsx` prior to deployment (*NOTE: We have enabled ISR to pre-render every hour*)

  - **(b) Pass data as props:** Pass the SSG data into the `HomePage` as a prop (`props.articles`) & check ReactDevTools to see that the data has been received

  - **(c) Pass props to list component:** pass `articles` data to `ArticleList` + ensure it only renders if the `articles` array has at least 1 position  

  - **(d) Adjust list & item components for new data:**

    - **CURRENTLY:** `ArticleList` & `ArticleItem` expect only data from NewsAPI.  Our `db.js` data overlaps and is also slightly different - holds `id`, `category` & `image` properties 

    - **(i) `ArticleList.jss`:** 
      - Adjust the `key` & `id`, using ternary, to either use an id OR a passed in `index` (*could also just use article.title, but potentially not unique longterm*)
      - Add new props of `urlToImage` & `url` to list of included props

    - **(ii) `ArticleItem.js`:**
      - Using ternary, adjust `Image` element to include either the `props.image` OR the `props.urlToImage`, depending on WHICH property it receives!
      - Same for the ArticleFooter Button, adjust it so it either progammatically navigates using `handleNavigate` (*with a Button*) OR sends the user to the article link via `props.url` (*with a ButtonLink*)

&nbsp;

### B. DYNAMIC ROUTES WITH SSG & PRE-BUILDING PATHS

**THEORY:** 

  - When we click the `Button` in `ArticleList`, it now goes to `localhost:3000/[articleId]` with the dynamic slug passed in (equal to the `id` in `db.js`) 

  - **HOWEVER** - if we use SSG (*buildtime*), the routes can ALSO be built at **buildtime**.  To do this, we tell Next.js to look into the array, find all the potential slug `ids` & pre-generate the paths - with `getStaticPaths`

  - **Order:** App starts -> Pre-generates paths -> pre-generates data on each path -> Click `Button` -> Programmatically navigated to `/[articleId]`

  - [**SSG & Static Paths**](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)

&nbsp;

### C. SETUP OF `[articleId]` DYNAMIC-ROUTED PAGES

- **(0) Create new route of `[articleId]/index.jsx` in `/pages` - called `ArticleDetailPage`**

- **(a) Create `getStaticPaths` function**

  - Use `ngspa` & generate the next function

  - Fetch the ENTIRE articles array from INTERNAL API

  - Pull ALL the ids out of the articles array ONLY, with another `map` function

  - Pre-build ALL the URL paths for all existing ids in array, and assign to `paths` variable (*id MUST be converted to a string, as URLs need strings NOT numbers!*)
 
&nbsp;

- **(b) Set the PATH and FALLBACK:**

  - **PATH:** We map the data objects to return a params object, with ONLY the newsId key and value for the relevant item! 
  
  - **FALLBACK:** This states whether your paths contain ALL supported paths, and if outside these, the user will see a 404.  If TRUE, the application will try to generate a new "uncharted" page on-the-fly, on-demand

    - By default, we want to set `fallback: false`
    - We return both the `path` & the `fallback`

&nbsp;

- **(c) Create `getStaticProps` function**

  - Fetch the ENTIRE articles array from INTERNAL API

  - Store params `id` value (*article USER wants*), which is stored under `context.params.articleId` (*make sure it matches with dynamic route - `[articleId]`*)

  - Filters articles array to match & return article passed in params

  - Return the `props`, with the first position in `articleMatch` assigned to a `article` variable (*there should only be one position at `[0]`*)

&nbsp;

- **(d) Use props in `ArticleDetailPage`**

  - Allow `ArticleDetailPage` to accept props & destructure the `article` object from `props`

  - Create a new `/features/ArticleDetail` component

  - Call the `ArticleDetail` component into the page, invoke & pass the `articles` object props wanted, into the component (`image`, `title`, `description`, `category`)

&nbsp;

- **CHALLENGE: Build `ArticleDetail` to display props**

  - Use the remaining `_articleDetail.scss` file in `/scss/components` as a `.module.scss` file & import into the new file

  - Build the component using the reusable `Card` component & next `Image`

  - BONUS: Try to link the user back to the Home page with `ButtonLink`

&nbsp;

### D. DEPLOYMENT UPDATE

**RELEASES:** With the application updated & our first release now stale, we need to update our application on Vercel:

  - Commit & Push the local changes to GitHub with GitHub Desktop or CLI

  - Go to your Vercel Dashboard and reveiw the deployment to ensure it builds successfully

  - **ERROR:** Even if there is an error, it will preserve the working version until we fix it!