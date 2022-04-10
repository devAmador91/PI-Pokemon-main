 export const paginationNext = (npage,setPage)=>{
    setPage({numPage: npage.numPage + 1})
  }
  
  export const paginationPrev = (npage,setPage)=>{
    setPage({numPage: npage.numPage - 1})
  }