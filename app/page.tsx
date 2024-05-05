'use client';
import VideoThumb from '../public/hero-image-01.jpg';
import ModalVideo from '@/components/modal-video';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  /*const handleFileUpload = async (event: any) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append('pdf', files[0]);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data`,
      },
      body: formData,
    });
    console.log(res);
  };*/
 
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              GED Boost :{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Votre Assistant Expert pour Maîtriser le Logiciel et Répondre à
                Toutes Vos Questions{' '}
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                {' '}
                Découvrez GED Boost : Votre Compagnon Numérique pour une
                Utilisation Efficace du Logiciel EGD
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div className='flex flex-col'>
                  <div
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 px-4 py-4 rounded-md relative overflow-hidden h-16"
                    
                  >
                    Essayer gratuitement
                    <FilePond
                     className={" opacity-0 absolute top-0 h-full left-0 w-full"}
                      server={{
                        process: '/api/upload',
                      }}
                    />
                  </div>
                  <Link href={"/chatBot"} className='py-2 px-4 bg-purple-600 text-white my-4 shadow-md rounded-md'>try chat Assistant</Link>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
