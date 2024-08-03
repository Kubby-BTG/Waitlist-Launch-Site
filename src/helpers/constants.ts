// export const DefinedRoutes = Object.freeze({
//   home: "/",
//   aboutUs: "/about-us",
//   appointmentCreate: "/appointment-create",
//   contact: "/contact",
//   pictureGallery: "/picture-gallery",
//   privacyPolicy: "/privacy-policy",
//   services: "/services",
//   serviceDetails: (slug: string) => `/services/${slug}`,
// });

export const AppConfig = {
  KUBBY_WEB_AIRTABLE_ACCESS_TOKEN:
    process.env.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN ?? "",
  KUBBY_WEB_AIRTABLE_DATABASE:
    process.env.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN ?? "",
} as const;
