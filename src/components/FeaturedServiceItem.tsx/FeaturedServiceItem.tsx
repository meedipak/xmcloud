'use client';

import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Link,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useRef } from 'react';

interface FeaturedServiceItemFields {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  CTA: LinkField;
  ImageOnRight: Field<boolean>;
}

type FeaturedServiceItemProps = ComponentProps & {
  fields: FeaturedServiceItemFields;
};

export const Default = ({ fields, params }: FeaturedServiceItemProps): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isEditing = params?.editable === 'true';

  useEffect(() => {
    if (isEditing) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (textRef.current && imageRef.current) {
        const offset = scrollY * 0.3;
        textRef.current.style.transform = `translateY(${offset}px)`;
        imageRef.current.style.transform = `translateY(${-offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditing]);

  if (!fields) {
    return <></>;
  }

  const imageOnRight = fields.ImageOnRight?.value || false;
  const linkText = fields.CTA?.value?.text || '';

  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 my-12 ${imageOnRight ? 'lg:flex-row-reverse' : ''}`}
      data-parallax-section
    >
      <div
        ref={imageRef}
        className="lg:w-1/2 relative min-h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
        style={{
          backgroundImage: fields.Image?.value?.src
            ? `url('${fields.Image.value.src}')`
            : 'none',
        }}
        data-parallax-box
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h3 className="text-white text-3xl font-bold">
            <Text field={fields.Title} />
          </h3>
        </div>
      </div>

      <div
        ref={textRef}
        className="lg:w-1/2 flex flex-col justify-center"
        data-parallax-text={!isEditing ? 'true' : undefined}
      >
        <div className="prose prose-lg max-w-none mb-6">
          <RichText field={fields.Description} />
        </div>

        {linkText && fields.CTA?.value?.href && (
          <Link
            field={fields.CTA}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors group"
          >
            {linkText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="transform group-hover:translate-x-1 transition-transform"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};