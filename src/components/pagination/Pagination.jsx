import ReactPaginate from 'react-paginate';
import './pagination.css';

export const Pagination = ({
	postsPerPage,
	page,
	handlePageChange,
	sortedPostsByFav,
}) => {
	return (
		<div className='paginationDiv'>
			<ReactPaginate
				pageCount={Math.ceil(sortedPostsByFav.length / postsPerPage)}
				activeClassName={'item active '}
				breakClassName={'item break-me '}
				containerClassName={'pagination'}
				disabledClassName={'disabled-page'}
				pageRangeDisplayed={2}
				onPageChange={handlePageChange}
				nextClassName={'item next'}
				pageClassName={'item pagination-page '}
				previousClassName={'item previous'}
				breakLabel={<span className='breakLabel'>...</span>}
				forcePage={page - 1}
				marginPagesDisplayed={2}
			/>
		</div>
	);
};
