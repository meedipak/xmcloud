'use client';

import { ComponentProps, MainNavigationModel } from '@/types/sitecore';
import { Image, Link, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import { NavigationLevel1 } from './NavigationLevel1';

interface MainNavigationProps extends ComponentProps {
  fields?: MainNavigationModel['fields'];
}

export const MainNavigation = ({ fields }: MainNavigationProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!fields) return null;

  const logoLink = fields.logoLink?.value?.href || '#';
  const displaySearch = fields.displaySearch?.value;

  return (
    <>
      {/* Logo */}
      {fields.logo?.value?.src && (
        <div className="logo">
          <Link field={fields.logoLink}>
            <Image
              field={fields.logo}
              className="new-logo"
              alt={fields.logo.value?.alt || 'Nishtech'}
            />
            {fields.logoSticky?.value?.src && (
              <Image
                field={fields.logoSticky}
                className="logo-s"
                alt={fields.logoSticky.value?.alt || 'Nishtech'}
              />
            )}
          </Link>
        </div>
      )}

      {/* Navigation */}
      {fields.topNavigationItems && fields.topNavigationItems.length > 0 && (
        <>
          <button
            className="nav-opener"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span>Menu</span>
          </button>
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <h1 className="mobile-nav-header text-2xl font-bold mb-4 lg:hidden">
                Perfecting Digital
              </h1>
              {fields.topNavigationItems.map((topMenu, index) => (
                <NavigationLevel1 key={index} item={topMenu} />
              ))}
            </ul>

            {displaySearch && (
              <button className="search-opener">
                <span className="icon-search"></span>
                <img src="/images/cross.svg" alt="close search" />
              </button>
            )}
          </nav>
        </>
      )}

      {/* Mobile Search */}
      {displaySearch && (
        <button className="search-opener mobile lg:hidden">
          <span className="icon-search"></span>
          <img src="/images/cross.svg" alt="close search" />
        </button>
      )}
    </>
  );
};

export default MainNavigation;