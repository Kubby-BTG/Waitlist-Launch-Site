import { deliveryCompanies } from "./constants";

export const deliveryCompaniesWithLogo = deliveryCompanies.map((company, i) => ({
  value: company.name.toLowerCase(),
  element: (
    <span key={`${company.name}__k${i}`} className="flex items-center gap-x-2">
      <img
        src={company.logoUrl}
        alt={`${company.name} logo`}
        className="h-6 w-6 object-contain"
        loading="lazy"
        decoding={"async"}
      />
      <span>{company.name}</span>
    </span>
  ),
}));
