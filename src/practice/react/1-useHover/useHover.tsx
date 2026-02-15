import { useEffect, useRef, useState } from 'react';

function useHover<T extends HTMLElement = HTMLElement>() {
  // Your code here
  // Return [ref, isHovered]
  const ref = useRef<T>(null);
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    const handleMouseEnter = () => setIsButtonHovered(true);
    const handleMouseLeave = () => setIsButtonHovered(false);
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  return [ref, isButtonHovered] as const;
}

export default function App() {
  const [buttonRef, isButtonHovered] = useHover<HTMLButtonElement>();
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>();
  const [imageRef, isImageHovered] = useHover<HTMLDivElement>();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">useHover Hook</h1>

      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Hover over elements below to see the hook in action. Each element independently tracks its
          hover state.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Demo 1: Button</h3>
        <button
          ref={buttonRef}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
            isButtonHovered
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 scale-105'
              : 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
          }`}
        >
          {isButtonHovered ? 'You are hovering!' : 'Hover over me'}
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Status:{' '}
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isButtonHovered
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {isButtonHovered ? 'Hovered' : 'Not Hovered'}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Demo 2: Card</h3>
        <div
          ref={cardRef}
          className={`rounded-xl border p-5 transition-all ${
            isCardHovered
              ? 'border-gray-400 dark:border-gray-500 shadow-lg scale-[1.02]'
              : 'border-gray-200 dark:border-gray-800 shadow-sm'
          }`}
        >
          <h4 className="font-semibold">Interactive Card</h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Hover over this card to see the effect</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Status:{' '}
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isCardHovered
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {isCardHovered ? 'Hovered' : 'Not Hovered'}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Demo 3: Image</h3>
        <div
          ref={imageRef}
          className={`flex items-center justify-center rounded-xl border h-32 text-3xl transition-all ${
            isImageHovered
              ? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 scale-105'
              : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900'
          }`}
        >
          🖼️ Image Placeholder
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Status:{' '}
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isImageHovered
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {isImageHovered ? 'Hovered' : 'Not Hovered'}
          </span>
        </p>
      </div>
    </div>
  );
}
