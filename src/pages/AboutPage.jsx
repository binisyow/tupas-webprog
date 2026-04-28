import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-900 text-white">

      {/* HERO */}
      <section
        className="border-y-2 border-zinc-800 bg-cover bg-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581905764498-1b0b0aa8f2e2?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-6 flex items-center justify-center">
            <img
              src="https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/fc/3047304-poster-p-1-poster-captures-the-strength-of-street-knowledge-in-black-and-white.jpg"
              alt="Profile Poster"
              className="w-25h-32rounded-full object-cover border-2 border-orange-400"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              About Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Meet Our Movie Studio Crew
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              Get to know the creative minds behind our cinematic universe. Profiles, experience, and fun facts about our filmmakers and artists.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick Stats
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '10', label: 'Movies Produced' },
            { value: '15', label: 'Directors' },
            { value: '20', label: 'Awards Won' },
            { value: '05', label: 'Genres Covered' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-5 text-center hover:scale-105 transition-transform">
              <p className="text-2xl font-bold text-orange-400">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              Featured Sections
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Crew & Movie Highlights
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Director Spotlight',
                  desc: 'Insights into our top directors and their unique filmmaking styles.',
                },
                {
                  title: 'Top Cast',
                  desc: 'Meet the stars who bring our stories to life on the big screen.',
                },
                {
                  title: 'Behind the Scenes',
                  desc: 'Exclusive behind-the-scenes content and movie production secrets.',
                },
              ].map((block) => (
                <article key={block.title} className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-5">
                  <h3 className="text-lg font-semibold text-white">{block.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{block.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              Movie Posters
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                'https://i.pinimg.com/1200x/95/f5/ab/95f5ab9aaab5b15b61165ec01500a772.jpg',
                'https://i.pinimg.com/1200x/8e/bd/48/8ebd48f66f760c1066bb7f82204d8866.jpg',
                'https://i.pinimg.com/736x/11/75/b5/1175b5b020ee694988ef85f529de6dcc.jpg',
                'https://i.pinimg.com/1200x/3c/b4/28/3cb428f7b5e7246ee9c2727862e423e4.jpg',
              ].map((src, i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-[1.25rem] overflow-hidden">
                  <img src={src} alt={`Movie ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Button className="mt-5" variant="primary">Explore More Movies</Button>
    </div>
  );
};

export default AboutPage;