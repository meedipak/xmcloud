'use client';

import { ComponentProps } from '@/types/sitecore';
import { Field, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { MainNavigation } from './MainNavigation';
import { SearchForm } from './SearchForm';
import { useEffect, useState } from 'react';

interface HeaderProps extends ComponentProps {
  fields: {
    searchImage: Field<string>;
    searchMainText: Field<string>;
    searchPlaceholderText: Field<string>;
    searchResultsPage: Field<string>;
    searchQuerystringParameter: Field<string>;
  };
}

export const Header = ({ fields }: HeaderProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const [isHomepage, setIsHomepage] = useState(false);
  const [isExperienceEditor, setIsExperienceEditor] = useState(false);

  useEffect(() => {
    if (sitecoreContext?.route?.templateName === 'Home') {
      setIsHomepage(true);
    }
    if (sitecoreContext?.pageEditing) {
      setIsExperienceEditor(true);
    }
  }, [sitecoreContext]);

  return (
    <header className={`
      header header-new nav-down
      ${isHomepage ? 'homepage-nav' : ''}
      ${isExperienceEditor ? 'experience-editor-nav' : ''}
    `}>
      <div className="header-wrap">
        <div className="container mx-auto px-4">
          <MainNavigation />
        </div>
        <SearchForm
          searchImage={fields?.searchImage}
          searchMainText={fields?.searchMainText}
          searchPlaceholderText={fields?.searchPlaceholderText}
          searchResultsPage={fields?.searchResultsPage}
          searchQuerystringParameter={fields?.searchQuerystringParameter}
        />
      </div>
    </header>
  );
};

export default Header;