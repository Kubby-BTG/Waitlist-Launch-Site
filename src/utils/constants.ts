export const DefinedRoutes = Object.freeze({
  home: "/",
  blog: "/blog",
  blogDetails: (uid: string) => `/blog/${uid}`,
  contact: "/contact",
  partnership: "/partnership",
  sliceSimulator: "/slice-simulator",
});

export const AppConfig = () =>
  ({
    KUBBY_WEB_AIRTABLE_ACCESS_TOKEN: process.env.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN ?? "",
    KUBBY_WEB_AIRTABLE_DATABASE: process.env.KUBBY_WEB_AIRTABLE_DATABASE ?? "",
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "",
  }) as const;

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
];

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
