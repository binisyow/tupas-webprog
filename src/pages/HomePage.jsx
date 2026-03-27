import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-900 text-white">

      {/* HERO */}
      <section
        className="border-y-2 border-zinc-800 bg-cover bg-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502136969935-8b81f5e5e29b?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Welcome to M Movies
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              M Movies is your ultimate cinematic hub. Explore featured films, behind-the-scenes insights, director and cast interviews, and curated articles — all in a sleek, dark-themed layout that brings the magic of the movies to your screen.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-600 bg-zinc-800 p-6 flex items-center justify-center">
            <img
              src="https://www.lifewire.com/thmb/Re2NGYGtfJZHihPm224U61dEV-o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/imdb-new-movie-tv-trailers-44239e1716d74ca98e99939c391259dd.png"
              alt="Wireframe Studio Logo"
              className="w-60-24 object-contain"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick overview blocks
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '12', label: 'Projects' },
            { value: '08', label: 'Sections' },
            { value: '24', label: 'Screens' },
            { value: '04', label: 'Layouts' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-5 text-center hover:scale-105 transition-transform"
            >
              <p className="text-2xl font-bold text-orange-400">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
{/* FEATURES */}
<section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="mb-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
      Features
    </p>
    <h2 className="mt-2 text-2xl font-semibold text-white">
      Simple wireframe cards
    </h2>
  </div>
  <div className="grid gap-4 md:grid-cols-3">
    {[
      {
        title: 'The Galactic Odyssey',
        desc: 'Join the crew of the Star Voyager on a thrilling journey through uncharted galaxies.',
        img: 'https://tse1.mm.bing.net/th/id/OIP.sF61YZRHN1R1gqZ0wGBeLAHaK9?rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        title: 'Spider-Man Into The Spiderverse',
        desc: 'A visually stunning animated adventure where teenager Miles Morales discovers his powers and teams up with multiple Spider-People from parallel universes to save reality.',
        img: 'https://tse2.mm.bing.net/th/id/OIP.tIh2WpphTE2Msd_rqlHURQHaLQ?rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        title: 'Gran Turismo',
        desc: 'Based on the true story of a gamer-turned-racing sensation, Gran Turismo follows Jann Mardenborough as he transforms from a virtual racing champion to a real-world professional driver, chasing speed, dreams, and victory on the track.',
        img: 'https://tse1.mm.bing.net/th/id/OIP.eMc7Y1YhKH3y6u_kfNkijgHaKl?rs=1&pid=ImgDetMain&o=7&rm=3',
      },
    ].map((movie) => (
      <article
        key={movie.title}
        className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-4 hover:scale-105 transition-transform"
      >
        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-700 overflow-hidden">
          <img
            src={movie.img}
            alt={movie.title}
            className="w-full h-full object-cover rounded-[1.25rem]"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          {movie.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-300">
          {movie.desc}
        </p>

        <Button className="mt-4" variant="primary">
          View More
        </Button>
      </article>
    ))}
  </div>
</section>
    </div>
  );
};

export default HomePage;