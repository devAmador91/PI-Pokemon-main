export const paginationNext = (npage, setPage) => {
  document.body.scrollIntoView();
  setPage({ numPage: npage.numPage + 1 });
};

export const paginationPrev = (npage, setPage) => {
  document.body.scrollIntoView();
  setPage({ numPage: npage.numPage - 1 });
};
