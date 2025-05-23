// This function will be passed the URL the user navigates to
// and will send a pageview event to Google Analytics
export const pageview = (url) => {
  window.gtag(
    'config', process.env.NEXT_PUBLIC_GA_ID, 
    { page_path: url }
  );
}