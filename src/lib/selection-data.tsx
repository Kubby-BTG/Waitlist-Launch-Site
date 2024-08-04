const deliveryCompanies01 = [
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
];

export const deliveryCompanies = deliveryCompanies01.map((company, i) => ({
  value: company.name.toLowerCase(),
  element: (
    <span key={`${company.name}__k${i}`} className="flex items-center gap-x-2">
      <img src={company.logo} alt={`${company.name} logo`} className="h-6 w-6 object-contain" loading="lazy" decoding={"async"} />
      <span>{company.name}</span>
    </span>
  ),
}));
