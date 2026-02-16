import { useEffect, useRef, useState } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>() {
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
