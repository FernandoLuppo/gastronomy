"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICarrousel {
  children: React.ReactNode;
  settings?: {
    default: {
      slidesToShow: number;
      slidesToScroll: number;
    };
    "2xl": {
      slidesToShow: number;
      breakpoint: number;
      slidesToScroll: number;
    };
    xl: {
      slidesToShow: number;
      breakpoint: number;
      slidesToScroll: number;
    };
    lg: {
      slidesToShow: number;
      breakpoint: number;
      slidesToScroll: number;
    };
    md: {
      slidesToShow: number;
      breakpoint: number;
      slidesToScroll: number;
    };
    sm: {
      slidesToShow: number;
      breakpoint: number;
      slidesToScroll: number;
    };
  };
}

export const Carrousel = ({ children, settings }: ICarrousel) => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: settings?.default.slidesToShow || 5,
    slidesToScroll: settings?.default.slidesToScroll || 4,
    responsive: [
      {
        breakpoint: settings?.["2xl"].breakpoint || 1536,
        settings: {
          slidesToShow: settings?.["2xl"].slidesToShow || 4,
          slidesToScroll: settings?.["2xl"].slidesToScroll || 3
        }
      },
      {
        breakpoint: settings?.xl.breakpoint || 1280,
        settings: {
          slidesToShow: settings?.xl.slidesToShow || 3,
          slidesToScroll: settings?.xl.slidesToScroll || 2
        }
      },
      {
        breakpoint: settings?.lg.breakpoint || 1024,
        settings: {
          slidesToShow: settings?.lg.slidesToShow || 2,
          slidesToScroll: settings?.lg.slidesToScroll || 1
        }
      },
      {
        breakpoint: settings?.md.breakpoint || 768,
        settings: {
          slidesToShow: settings?.md.slidesToShow || 2,
          slidesToScroll: settings?.md.slidesToScroll || 1
        }
      },
      {
        breakpoint: settings?.sm.breakpoint || 640,
        settings: {
          slidesToShow: settings?.sm.slidesToShow || 1,
          slidesToScroll: settings?.sm.slidesToScroll || 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <Slider {...sliderSettings} className="w-full h-[400px]">
      {children}
    </Slider>
  );
};
