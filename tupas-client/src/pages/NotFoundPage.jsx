import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-900 px-4 text-center text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-gray-300">
        The page you opened does not exist or is not available.
      </p>
      <Button className="mt-6" to="/" variant="primary">
        Back Home
      </Button>
    </section>
  );
};

export default NotFoundPage;
