export default function getPagination(query: any, defaultLimit = 30, defaultPage = 1) {
  const limit = parseInt(query.limit) || defaultLimit;
  const page = parseInt(query.page) || defaultPage;
  return { limit, page };
}
