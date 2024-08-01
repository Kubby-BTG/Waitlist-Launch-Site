export const deliveryIssues = [
  "Stolen/Lost Package",
  "Missed/Late Delivery",
  "Damaged Item",
  "Incorrect Address/Wrong Address",
];

export const deliveryCompanies = [
  {
    name: "Amazon",
    logo: "/carriers/amazon.svg",
  },
  {
    name: "UPS",
    logo: "/carriers/UPS.svg",
  },
  {
    name: "Fedex",
    logo: "/carriers/FedEx.svg",
  },
  {
    name: "DHL",
    logo: "/carriers/DHL.svg",
  },
  {
    name: "USPS",
    logo: "/carriers/USPS.svg",
  },
].map((company, i) => ({
  value: company.name.toLowerCase(),
  element: (
    <span key={`${company.name}__k${i}`} className="flex items-center gap-x-2">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="h-6 w-6 object-contain"
        loading="lazy"
        decoding={"async"}
      />
      <span>{company.name}</span>
    </span>
  ),
}));

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
