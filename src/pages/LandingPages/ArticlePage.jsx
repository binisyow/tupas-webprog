import Button from '../../components/Button';

const ArticlePage = () => {
  return (
    <section className="min-h-[70vh] bg-zinc-900 px-4 py-10 text-white sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
        Article
      </p>
      <h1 className="mt-2 text-3xl font-bold">Article Details</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300">
        This page is reserved for a single article view. Your list of movie articles is in ArticleListPage.
      </p>
      <Button className="mt-6" to="/articles" variant="primary">
        Back to Articles
      </Button>
    </section>
  );
};

export default ArticlePage;
