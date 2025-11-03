import { Field, ImageField, LinkField, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ComponentProps {
  rendering: {
    componentName: string;
    dataSource?: string;
    fields?: any;
    params?: Record<string, string>;
  };
  fields?: any;
}

export interface SocialIcon extends Item {
  fields: {
    iconsName: Field<string>;
    socialLink: LinkField;
  };
}

export interface FooterModel {
  fields: {
    footerLogo: ImageField;
    copyrights: Field<string>;
    socialIcons: SocialIcon[];
  };
}

export interface FooterLinkModel {
  fields: {
    footerLink: LinkField;
    cssClass: Field<string>;
  };
}

export interface FooterLinksContainerModel {
  fields: {
    title: Field<string>;
    titleLink: LinkField;
  };
}

export interface MainNavigationInsightsItem extends Item {
  fields: {
    thumbnailImage: ImageField;
    title: Field<string>;
  };
}

export interface MainNavigationInternalLinks extends Item {
  fields: {
    link: LinkField;
  };
}

export interface MainNavigationSecondLevel extends Item {
  fields: {
    menuImage: ImageField;
    imageTitle: Field<string>;
    title: Field<string>;
    titleLink: LinkField;
    shortDescription: Field<string>;
    internalNavigationItems: MainNavigationInternalLinks[];
    insightsShortcut: MainNavigationInsightsItem[];
    insightsSeeAllLink: LinkField;
    displayMobileOnly: Field<boolean>;
  };
}

export interface MainNavigationFirstLevel extends Item {
  fields: {
    linkedItem: LinkField;
    secondaryItems: MainNavigationSecondLevel[];
    isGradientButton: Field<boolean>;
    backgroundImage: ImageField;
    mobileTitle: Field<string>;
  };
}

export interface MainNavigationModel {
  fields: {
    logo: ImageField;
    logoSticky: ImageField;
    logoLink: LinkField;
    topNavigationItems: MainNavigationFirstLevel[];
    useAlternateHeader: Field<boolean>;
    displaySearch: Field<boolean>;
  };
}

export interface WebsiteSettingsModel {
  fields: {
    searchImage: ImageField;
    searchMainText: Field<string>;
    searchPlaceholderText: Field<string>;
    searchResultsPage: LinkField;
    searchQuerystringParameter: Field<string>;
    headTagScripts: Field<string>;
  };
}

export interface CTAPanelModel {
  fields: {
    title: Field<string>;
    ctaLinkText: Field<string>;
    ctaLink: LinkField;
  };
}