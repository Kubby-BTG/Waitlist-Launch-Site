export const DefinedRoutes = Object.freeze({
  home: "/",
  blog: "/blog",
  blogDetails: (uid: string) => `/blog/${uid}`,
  contact: "/contact",
  partnership: "/partnership",
  whyUs: "/#why-us",
  ourStory: "/#our-story",
  reportDeliveryIssue: "/#report-delivery-issue",
  // sliceSimulator: "/slice-simulator",
});

export const BANNED_IP_ROUTE_ID = `/api/5d261fcd9a93f62e889c19900d9f183a`;

export const AppConfig = () =>
  ({
    KUBBY_WEB_AIRTABLE_ACCESS_TOKEN: process.env.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN || "",
    KUBBY_WEB_AIRTABLE_DATABASE: process.env.KUBBY_WEB_AIRTABLE_DATABASE || "",
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "",
    CURRENT_SITE_URL: process.env.NEXT_PUBLIC_CURRENT_SITE_URL || "https://www.kubby.io",
  }) as const;

export const ApplicationKeyword = [
  "Shopping",
  "Shopping Communities",
  "Stolen Amazon package",
  "Package Theft",
  "Porch Pirate",
  "Sustainability",
  "Shop Local",
  "Package Delivery",
  "Blog",
  "E-commerce",
  "UPS",
  "FEDEX",
  "Amazon",
  "USPS",
  "DHL",
  "Walmart",
  "Target",
  "Shein",
  "Temu",
  "Facebook",
  "Instagram",
  "Twitter",
  "X",
  "Reddit",
  "Quora",
  "Lost Package",
  "Missed Delivery",
  "Where is my order",
];

export const AppDescription = `Shop easy, deliver worry-free with Kubby! Access your favorite stores, enjoy secure, sustainable delivery, and say goodbye to package theft | Kubby`;
export const ApplicationSiteName = `Kubby | Building Communities Through Shopping`;
export const ApplicationAuthor = `Kubby`;

export const deliveryIssues = [
  //
  "Stolen/Lost Package",
  "Missed/Late Delivery",
  "Damaged Item",
  "Incorrect Address/Wrong Address",
];

export const reasonsForJoining = [
  { text: "Package Theft/Lost Packages", value: "Package Theft/Lost Packages" },
  { text: "Missed/Late Delivery", value: "Missed/Late Delivery" },
  { text: "Seamless Shopping", value: "Seamless Shopping" },
  { text: "Sustainable Delivery", value: "Sustainable Delivery" },
  { text: "New Delivery Experience", value: "New Delivery Experience" },
];

export const deliveryCompanies = [
  {
    name: "Amazon",
    logoUrl: "/carriers/amazon.svg",
  },
  {
    name: "UPS",
    logoUrl: "/carriers/UPS.svg",
  },
  {
    name: "Fedex",
    logoUrl: "/carriers/FedEx.svg",
  },
  {
    name: "DHL",
    logoUrl: "/carriers/DHL.svg",
  },
  {
    name: "USPS",
    logoUrl: "/carriers/USPS.svg",
  },
  {
    name: "Fetch",
    logoUrl: "/carriers/fetch-02.jpg",
  },
  {
    name: "other",
    logoUrl: "/carriers/package.svg",
  },
];

export const AppSocialMediaLinks = Object.freeze({
  Facebook: "https://www.facebook.com/profile.php?id=61563980498725",
  Twitter: "https://x.com/kubbyio",
  LinkedIn: "https://www.linkedin.com/company/kubbyinc",
  Instagram: "https://www.instagram.com/kubby.io",
  Tiktok: "",
  YouTube: "",
});

export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
