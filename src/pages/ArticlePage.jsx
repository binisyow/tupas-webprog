import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ArticlePage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: 'Home Alone',
      desc: 'A young boy accidentally left behind must use his wits and creativity to defend his home from two burglars during Christmas.',
      fullDesc: 'Eight-year-old Kevin McCallister has become the man of the house, overnight! Accidentally left behind when his family rushes off on a Christmas vacation, Kevin gets busy decorating the house for the holidays. But he\'s not decking the halls with tinsel and holly. Two bumbling burglars are trying to break in, and Kevin\'s rigging a bewildering battery of booby traps to welcome them!',
      img: 'https://i.pinimg.com/1200x/95/f5/ab/95f5ab9aaab5b15b61165ec01500a772.jpg',
      director: 'Chris Columbus',
      year: '1990',
      genre: 'Comedy/Family',
      hasError: false,
    },
    {
      id: 2,
      title: 'Toy Story',
      desc: 'When a new toy arrives, a jealous cowboy must work together with him to ensure both make it back to their owner.',
      fullDesc: 'Woody, a good-hearted cowboy doll who belongs to a young boy named Andy, sees his position as Andy\'s favorite toy jeopardized when his parents buy him a Buzz Lightyear action figure. Even worse, the arrogant Buzz thinks he\'s a real spaceman on a mission to return to his home planet. When Andy\'s family moves to a new house, Woody and Buzz must escape the clutches of maladjusted neighbor Sid Phillips and reunite with their boy.',
      img: 'https://i.pinimg.com/1200x/8e/bd/48/8ebd48f66f760c1066bb7f82204d8866.jpg',
      director: 'John Lasseter',
      year: '1995',
      genre: 'Animation/Adventure',
      hasError: false,
    },
    {
      id: 3,
      title: 'Cars',
      desc: 'A hotshot race car gets stranded in a small town and discovers that friendship and community are more important than winning.',
      fullDesc: 'Lightning McQueen, a hotshot rookie race car driven to succeed, discovers that life is about the journey, not the finish line, when he finds himself unexpectedly detoured in the sleepy Route 66 town of Radiator Springs. On route across the country to the big Piston Cup Championship in California to compete against two seasoned pros, McQueen gets to know the town\'s offbeat characters who help him realize that there\'s more to life than trophies and fame.',
      img: 'https://i.pinimg.com/736x/11/75/b5/1175b5b020ee694988ef85f529de6dcc.jpg',
      director: 'John Lasseter',
      year: '2006',
      genre: 'Animation/Comedy',
      hasError: false,
    },
    {
      id: 4,
      title: 'Avengers',
      desc: 'Earth\'s mightiest heroes must come together to save the world from a powerful threat.',
      fullDesc: 'When an unexpected enemy emerges that threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins to assemble the iconic Marvel Super Heroes: Iron Man, Captain America, Thor, The Hulk, Black Widow, and Hawkeye.',
      img: 'https://i.pinimg.com/1200x/3c/b4/28/3cb428f7b5e7246ee9c2727862e423e4.jpg',
      director: 'Joss Whedon',
      year: '2012',
      genre: 'Action/Sci-Fi',
      hasError: true,
    },
  ];

  const openModal = (article) => {
    if (article.hasError) {
      navigate('/404');
      return;
    }
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

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
          {articles.map((article) => (
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

              <button 
                onClick={() => openModal(article)} 
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 cursor-pointer"
              >
                Read More
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL UI */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-zinc-700 bg-zinc-900 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-6">
              {/* Header Image */}
              <div className="flex aspect-video items-center justify-center rounded-2xl overflow-hidden">
                <img 
                  src={selectedArticle.img} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Article Info */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
                  Article {String(selectedArticle.id).padStart(2, '0')} — {selectedArticle.genre}
                </p>
                
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {selectedArticle.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {selectedArticle.director}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {selectedArticle.year}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-700" />

              {/* Full Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-base leading-7 text-gray-300">
                  {selectedArticle.fullDesc}
                </p>
              </div>

              {/* Action Buttons - Only Close button remains */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;