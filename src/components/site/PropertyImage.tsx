import type { Property } from "./data";
import { PROJECT_MEDIA, type ProjectMedia } from "./project-media";

export function PropertyImage({
  image,
  priority = false,
}: {
  image: Property["image"];
  priority?: boolean;
}) {
  const photo: ProjectMedia = PROJECT_MEDIA[image];
  return (
    <figure>
      <div className={`relative overflow-hidden ${photo.darkBackdrop ? "bg-ink" : "bg-secondary"}`}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={`aspect-[16/10] w-full ${photo.contain ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none`}
        />
        {photo.showLogo !== false && (
          <div
            className={`absolute top-3 left-3 flex h-16 w-28 items-center justify-center rounded-lg p-2 shadow-md ${photo.logoDark ? "bg-ink/95" : "bg-white/95"}`}
          >
            <img
              src={photo.logo}
              alt={photo.logoAlt}
              width={112}
              height={64}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-[0.65rem] text-white">
          {photo.label}
        </span>
      </div>
      {photo.caption && (
        <figcaption className="border-b border-border px-6 py-3 text-xs leading-relaxed text-muted-foreground sm:px-7">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
