import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
Pager.propTypes = {
    count: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};


export default function Pager(props) {
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(props.count / (props.filter.limit||10));
    const paginationLength = 5;

    useEffect(()=>{
        calcPages(1)
    },[])



    function setCurrentPage(p) {
        if (p < 0 || p >= totalPages) return;
        calcPages(p);
        const f = {...props.filter};
        f.skip = f.limit * p;
        setPage(p);
        props.onPageChange(f)
    }

    function calcPages(page) {
        let pgs = [];
        const from = paginationLength * Math.floor(page / paginationLength);

        const to = from + paginationLength > totalPages ? totalPages : from + paginationLength;

        for (let i = from; i < to; i++) {
            pgs.push(i)
        }
        setPages(pgs)
    }

    if(pages.length<2) return <div></div>;
    return <div className="d-flex justify-content-center">
        <Pagination>
            <PaginationItem>
                <PaginationLink previous onClick={() => setCurrentPage(0)}/>
            </PaginationItem>

            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(page - 1)}> &lt; </PaginationLink>
            </PaginationItem>

            {pages.map(p => <PaginationItem key={p} active={p === page}>
                <PaginationLink onClick={() => setCurrentPage(p)}>
                    {p + 1}
                </PaginationLink>
            </PaginationItem>)}

            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(page + 1)}> &gt; </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next onClick={() => setCurrentPage(totalPages)}/>
            </PaginationItem>

        </Pagination>
    </div>

}
