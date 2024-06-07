"use client";
import { Card } from "flowbite-react";
import { HiStar,HiOutlineClock } from "react-icons/hi";

export default function Cards({
  cardKey,
  title,
  subtitle,
  image,
  author,
  duration,
  rating,
}: {
  cardKey: string;
  title: string;
  subtitle: string;
  image: string;
  author: string;
  duration: number;
  rating: number;
}) {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/470.webp";
  };
  return (
    <div key={cardKey}>
      <Card className="max-w-sm">
        <div className="space-y-1">
          {image !== null ? (
            <img src={image} alt={cardKey} onError={handleImageError} />
          ) : (
            <img src={"/470.webp"} alt={cardKey} onError={handleImageError} />
          )}
          <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h6>
          <p className="font-semibold text-gray-800 dark:text-gray-400">
            {author}
          </p>
          <p className="font-normal text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
          <div className="flex justify-start space-x-2">
            <p className="font-light text-sm text-gray-700 dark:text-gray-400 flex items-center">
              <HiOutlineClock color="black" className="mr-1"></HiOutlineClock>
              {duration ?? 30} min
            </p>
            <p className="font-light text-sm text-gray-700 dark:text-gray-400 flex items-center">
            <HiStar color="gold" className="mr-1"></HiStar>
              {rating ?? 4.4}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
