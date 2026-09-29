import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export default function ImageCarouselHero() {
  const images = [
    {
      src: '/hero_section1.png',
      alt: 'Imagem Hero Section 1',
    },
    {
      src: '/hero_section2.png',
      alt: 'Imagem Hero Section 2',
    },
    {
      src: '/hero_section3.png',
      alt: 'Imagem Hero Section 3',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousImage}
          className="bg-background/30 hover:bg-background/50 absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={goToNextImage}
          className="bg-background/30 hover:bg-background/50 absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors md:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2.5 w-2.5 rounded-full ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/80'
              } transition-colors`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="max-w-5xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-violet-300 px-3 py-1 text-sm font-medium text-violet-900 backdrop-blur-sm border border-violet-900">
              <span className='flex items-center gap-1'><Zap className='w-4 h-4'/>Solução SaaS para Indústrias</span>
            </div>
            <h1 className="text-violet-300 text-primary-foreground dark:text-primary text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              O Controle Total das Suas Matérias-Primas em um Só Lugar
            </h1>
            <p className="mx-auto w-3xl text-primary-foreground dark:text-primary text-xl">
              Gerencie o estoque de insumos em tempo real, previna paradas na linha de produção com alertas automáticos e acompanhe indicadores estratégicos.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="bg-violet-300 hover:bg-violet-400 text-violet-900" render={<a href="#" />} nativeButton={false}>Solicitar Contato <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
