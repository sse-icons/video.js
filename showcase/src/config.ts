const publicBaseUrl = import.meta.env.PROD
  ? "/template"
  : "/template/showcase";

export { publicBaseUrl };