 export const paginationNext = (npage,setPage)=>{
    setPage({...npage, numPage: npage.numPage + 1})
  }
  
  export const paginationPrev = (npage,setPage)=>{
    setPage({...npage, numPage: npage.numPage - 1})
  }