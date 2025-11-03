'use client';

import { MainNavigationInsightsItem } from '@/types/sitecore';
import { Link, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface NavigationInsightsItemProps {
  item: MainNavigationInsightsItem;
}

export const NavigationInsightsItem = ({ item }: NavigationInsightsItemProps) => {
  if (!item?.fields) return null;

  return (
    <li>
      <Link
        field={{ value: { href: `/sitecore/content${item.path}` } }}
        className="card block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      >
        <div className="img">
          <Image
            field={item.fields.thumbnailImage}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            <Text field={item.fields.title} />
          </h3>
          <span className="link text-blue-600 hover:text-blue-800">View</span>
        </div>
      </Link>
    </li>
  );
};

export default NavigationInsightsItem;