'use client';

import { Field, LinkField, Text, RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useState } from 'react';

interface AccordionItemFields {
  Title: Field<string>;
  Description: Field<string>;
  'Page Link': LinkField;
}

type AccordionItemProps = ComponentProps & {
  fields: AccordionItemFields;
};

export const Default = ({ fields, params }: AccordionItemProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isEditing = params?.editable === 'true';

  if (!fields) {
    return <></>;
  }

  const toggleAccordion = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isEditing) {
      setIsOpen(!isOpen);
    }
  };

  const linkText = fields['Page Link']?.value?.text || 'Learn More';

  return (
    <li className={`transition-all duration-300 ${isEditing ? 'active' : ''} ${isOpen ? 'active' : ''}`}>
      <a
        className="flex items-center justify-between cursor-pointer py-4 px-6 bg-gray-100 hover:bg-gray-200 transition-colors"
        href="#"
        onClick={toggleAccordion}
      >
        <span className="font-semibold text-lg">
          <Text field={fields.Title} />
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>
      </a>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen || isEditing ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className={`p-6 bg-white ${isEditing ? 'border-2 border-blue-300' : ''}`}>
          <div className="mb-4">
            <RichText field={fields.Description} />
          </div>
          {fields['Page Link']?.value?.href && (
            <Link
              field={fields['Page Link']}
              className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </li>
  );
};