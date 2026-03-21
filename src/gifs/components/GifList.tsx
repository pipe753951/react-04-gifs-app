import type { Gif } from "../interfaces/gifs.interface";

interface Props {
  gifs: Gif[];
}

export const GifList = function ({ gifs }: Props) {
  return (
    <div className="grid gap-6 grid-cols-2 mx-auto w-full max-w-7xl md:gap-5 md:grid-cols-3 lg:gap-7 lg:grid-cols-4 xl:gap-10 xl:grid-cols-5">
      {gifs.map((gif) => (
        <div key={gif.id} className="flex items-center justify-center flex-col">
          <img
            src={gif.url}
            alt={gif.title}
            className="w-full h-full rounded-xl object-cover"
          />
          <h2 className="text-2xl text-center font-bold m-3">{gif.title}</h2>

          <p>
            {gif.width}x{gif.height} (?MB)
          </p>
        </div>
      ))}
    </div>
  );
};
