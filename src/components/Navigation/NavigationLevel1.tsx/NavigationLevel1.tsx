'use client';

import { MainNavigationFirstLevel } from '@/types/sitecore';
import { Link, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavigationLevel2 } from './NavigationLevel2';

interface NavigationLevel1Props {
  item: MainNavigationFirstLevel;
}

export const NavigationLevel1 = ({ item }: NavigationLevel1Props) => {
  if (!item?.fields) return null;

  const linkTitle = item.fields.linkedItem?.value?.text || item.displayName || '';
  const linkUrl = item.fields.linkedItem?.value?.href || '#';
  const hasSecondaryItems = item.fields.secondaryItems && item.fields.secondaryItems.length > 0;
  const isGradientButton = item.fields.isGradientButton?.value;
  const backgroundImage = item.fields.backgroundImage?.value?.src;
  const mobileTitle = item.fields.mobileTitle?.value;

  if (!hasSecondaryItems) {
    if (isGradientButton) {
      return (
        <>
          <li className="nav-button">
            <Link
              field={item.fields.linkedItem}
              className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Text field={{ value: linkTitle }} />
            </Link>
          </li>
          <div className="mobile-contact-us lg:hidden p-4">
            <h2 className="text-xl font-semibold mb-4">
              <Text field={item.fields.mobileTitle} />
            </h2>
            <Link
              field={item.fields.linkedItem}
              className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg"
            >
              <Text field={{ value: linkTitle }} />
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <li>
          <Link
            field={item.fields.linkedItem}
            className="mobile-opener block py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <Text field={{ value: linkTitle }} />
          </Link>
        </li>
      );
    }
  }

  return (
    <li className="relative group">
      <Link
        field={item.fields.linkedItem}
        className="mobile-opener block py-2 px-4 hover:bg-gray-100 transition-colors"
      >
        <Text field={{ value: linkTitle }} />
      </Link>
      <div className="mega-menu absolute top-full left-0 w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="frame p-6">
          <div
            className="bg-img relative bg-cover bg-center p-8 text-white rounded-lg mb-6"
            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
          >
            <button className="go-back text-white hover:text-gray-200 mb-4">
              &lt; &nbsp; back
            </button>
            <h1 className="text-3xl font-bold mb-4">
              <Text field={{ value: linkTitle }} />
            </h1>
            <Link
              field={item.fields.linkedItem}
              className="text-white hover:text-gray-200 underline"
            >
              Learn More
            </Link>
          </div>

          {hasSecondaryItems && (
            <div className="wrap slide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.fields.secondaryItems.map((megaMenuItem, index) => {
                if (megaMenuItem.fields.displayMobileOnly?.value) {
                  return (
                    <Link
                      key={index}
                      field={megaMenuItem.fields.titleLink}
                      className="all-link-menu-item block p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold">
                        <Text field={megaMenuItem.fields.title} />
                      </h3>
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      field={megaMenuItem.fields.titleLink}
                      className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        <Text field={megaMenuItem.fields.title} />
                      </h3>
                      <div className="text-gray-600">
                        <Text field={megaMenuItem.fields.shortDescription} />
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default NavigationLevel1;