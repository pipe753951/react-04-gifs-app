interface Props {
  title: string;
  description?: string;
}

export const AppHeader = function ({ title, description }: Props) {
  return (
    <div className="flex items-center flex-col">
      {/* Heading */}
      <h1 className="mt-7 text-5xl font-bold">{title}</h1>

      {/* Description */}
      {description && <p className="my-2">{description}</p>}
    </div>
  );
};
