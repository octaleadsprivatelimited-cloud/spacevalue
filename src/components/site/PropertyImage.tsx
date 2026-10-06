import type { Property } from "./data";
import { PROPERTY_IMAGES } from "./property-images";

export function PropertyImage({ image }: { image: Property["image"] }) {
  const photo = PROPERTY_IMAGES[image];
  return (
    <div className="relative overflow-hidden">
      <img
        src={photo.src}
        alt={photo.alt}
        width={1408}
        height={1008}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
      />
      <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-[0.65rem] text-white">
        Illustrative image
      </span>
    </div>
  );
}
