const paginate = async (query, req) => {
  let {perPage, page} = req.query;

  perPage = perPage ? parseInt(perPage) : 15;
  page = page ? parseInt(page) : 1;

  if (page <= 0) {
    throw new Error(
        'Invalid parameter: page must be >= 1.',
    );
  }

  if (perPage <= 0) {
    throw new Error(
        'Invalid parameter: perPage must be >= 1.',
    );
  }

  req.query.perPage = perPage;

  page = page || 1;
  page = page - 1;
  page = page * perPage;

  const rows = await query;
  const paginatedList = await query.limit(perPage).offset(page);

  let lastPage = rows.length / perPage;
  lastPage = Math.ceil(lastPage);

  const paginationInfo = getPaginationUrl(req, page, lastPage);

  return {
    data: paginatedList,
    ...paginationInfo,
  };
};

const getPaginationUrl = (req, page, lastPage) => {
  const {protocol, baseUrl} = req;
  const {perPage} = req.query;

  const nextPage = page < lastPage ? page + 2 : null;
  const prevPage = page > 0 ? page - 1 : null;

  const url = `${protocol}://${req.headers.host}${baseUrl}`;

  return {
    nextPage,
    prevPage,
    nextPageUrl: `${url}?perPage=${perPage}&page=${nextPage}`,
    prevPageUrl: `${url}?perPage=${perPage}&page=${prevPage}`,
    firstPageUrl: `${url}?perPage=${perPage}&page=1`,
    lastPageUrl: `${url}?perPage=${perPage}&page=${lastPage}`,
  };
};

module.exports = paginate;
