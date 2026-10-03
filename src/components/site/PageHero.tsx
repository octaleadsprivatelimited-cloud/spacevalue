export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-28 pb-14 sm:min-h-[54vh] sm:pb-20">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-ivory sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/70 sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
