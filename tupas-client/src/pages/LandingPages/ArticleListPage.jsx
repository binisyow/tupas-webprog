import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import articlesSeed from '../../data/articles';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState(articlesSeed);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        if (data.length) setArticles(data);
      } catch {
        setArticles(articlesSeed);
      }
    };

    loadArticles();
  }, []);

  const openModal = (article) => {
    if (article.hasError) {
      navigate('/404');
      return;
    }
    setSelectedArticle(article);
  };

  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-900 text-white">
      <section
        className="border-y-2 border-zinc-800 bg-cover bg-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502136969935-8b81f5e5e29b?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Movie Insights & Features
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
          Explore articles about our featured movies, director interviews, behind-the-scenes stories, and top cast highlights.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/" variant="primary">Back Home</Button>
          <Button to="/about" variant="primary">About Crew</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Movie Articles Grid</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article._id || article.id}
              className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-4 transition-transform hover:scale-105"
            >
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem]">
                <img src={article.img} alt={article.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-400">
                {article.genre}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-300">{article.desc}</p>
              <button
                onClick={() => openModal(article)}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:bg-orange-700"
              >
                Read More
              </button>
            </article>
          ))}
        </div>
      </section>

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-zinc-700 bg-zinc-900 p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
            >
              X
            </button>
            <div className="flex flex-col gap-6">
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl">
                <img src={selectedArticle.img} alt={selectedArticle.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
                  {selectedArticle.genre}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">{selectedArticle.title}</h2>
                <p className="mt-3 text-sm text-gray-400">
                  {selectedArticle.director} | {selectedArticle.year}
                </p>
              </div>
              <div className="h-px bg-zinc-700" />
              <p className="text-base leading-7 text-gray-300">{selectedArticle.fullDesc}</p>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-fit rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleListPage;
