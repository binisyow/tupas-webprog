import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-900 text-white">

      {/* HERO */}
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

      {/* ARTICLES GRID */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Movie Articles Grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              id: 1,
              title: 'Galactic Odyssey: Behind the Scenes',
              desc: 'Discover how our space adventure movie was brought to life, from special effects to set design.',
              img: 'https://tse1.mm.bing.net/th/id/OIP.sF61YZRHN1R1gqZ0wGBeLAHaK9?rs=1&pid=ImgDetMain&o=7&rm=3',
            },
            {
              id: 2,
              title: 'Spider-Man Into The Spiderverse',
              desc: 'A visually stunning animated adventure where teenager Miles Morales discovers his powers and teams up with multiple Spider-People from parallel universes to save reality.',
              img: 'https://tse2.mm.bing.net/th/id/OIP.tIh2WpphTE2Msd_rqlHURQHaLQ?rs=1&pid=ImgDetMain&o=7&rm=3',
            },
            {
              id: 3,
              title: 'Gran Turismo',
              desc: 'Based on the true story of a gamer-turned-racing sensation, Gran Turismo follows Jann Mardenborough as he transforms from a virtual racing champion to a real-world professional driver, chasing speed, dreams, and victory on the track.',
              img: 'https://tse1.mm.bing.net/th/id/OIP.eMc7Y1YhKH3y6u_kfNkijgHaKl?rs=1&pid=ImgDetMain&o=7&rm=3',
            },
            {
              id: 4,
              title: 'Avengers Endgame',
              desc: 'A countdown of the most visually stunning and memorable scenes from our movies.',
              img: 'https://tse4.mm.bing.net/th/id/OIP.AfZ1DOQ_eMzKgl3nn9IQ1wHaK0?rs=1&pid=ImgDetMain&o=7&rm=3'
            },
          ].map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-4 hover:scale-105 transition-transform"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-400">
                Article {String(article.id).padStart(2, '0')}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                {article.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {article.desc}
              </p>

              <Button className="mt-4" variant="primary">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;