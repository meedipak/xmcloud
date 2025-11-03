'use client';

import { MainNavigationSecondLevel } from '@/types/sitecore';
import { Link, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavigationInsightsItem } from './NavigationInsightsItem';

interface NavigationLevel2Props {
  item: MainNavigationSecondLevel;
  useHtmlUL?: boolean;
  isFirstMenuItem?: boolean;
}

export const NavigationLevel2 = ({ item, useHtmlUL, isFirstMenuItem }: NavigationLevel2Props) => {
  if (!item?.fields) return null;

  const menuImage = item.fields.menuImage?.value?.src;
  const imageTitle = item.fields.imageTitle?.value || '';
  const title = item.fields.title?.value || '';
  const shortDescription = item.fields.shortDescription?.value;
  const internalNavigationItems = item.fields.internalNavigationItems;
  const insightsSeeAllLink = item.fields.insightsSeeAllLink;
  const articlesShortcut = item.fields.insightsShortcut;
  const resizeImageH1Class = imageTitle.length > 9 ? 'sm' : '';

  const content = (
    <>
      <div
        className={`bg-img acc-opener relative bg-cover bg-center p-8 text-white rounded-lg mb-6 ${resizeImageH1Class}`}
        style={{ backgroundImage: menuImage ? `url(${menuImage})` : undefined }}
      >
        <h1 className={`text-3xl font-bold ${resizeImageH1Class === 'sm' ? 'text-2xl' : ''}`}>
          <Text field={item.fields.imageTitle} />
        </h1>
      </div>
      <div className={`wrap ${useHtmlUL ? 'slide' : ''} p-6`}>
        <div className="info mb-6">
          {shortDescription && (
            <div className="mb-4">
              <Text field={item.fields.shortDescription} />
            </div>
          )}

          {internalNavigationItems && internalNavigationItems.length > 0 && (
            <ul className="subnav space-y-2">
              {internalNavigationItems.map((internalItem, index) => (
                <li key={index}>
                  <Link
                    field={internalItem.fields.link}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <Text field={{
                      value: internalItem.fields.link?.value?.title || internalItem.displayName
                    }} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {insightsSeeAllLink?.value?.href && (
          <div className="title-txt flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Insights</h1>
            <Link
              field={insightsSeeAllLink}
              className="see-all text-blue-600 hover:text-blue-800"
            >
              <span>See <br />All</span>
            </Link>
          </div>
        )}

        {articlesShortcut && articlesShortcut.length > 0 && (
          <ul className="card-list grid grid-cols-1 md:grid-cols-2 gap-4">
            {articlesShortcut.slice(0, 2).map((blog, index) => (
              <NavigationInsightsItem key={index} item={blog} />
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (useHtmlUL) {
    return (
      <div
        id={title.replace(/\s/g, '')}
        className={isFirstMenuItem ? 'active' : ''}
      >
        {content}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default NavigationLevel2;