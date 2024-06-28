import { useContext } from 'react';
import { FeaturesBlockContext } from '../../../app/layouts/BaseLayout'; 
import './sortBlock.css';

export const SortBlock = () => {
	const {
		sortIdOrder,
		sortTitleOrder,
		sortNameOrder,
		sortFavOrder,
		handleSortIdChange,
		handleSortTitleChange,
		handleSortNameChange,
		handleSortFavChange,
	} = useContext(FeaturesBlockContext);

	return (
		<div className='sortByBlock'>
			<span className='SortBySpan'>Sort by:</span>
			<select
				className='sortByIdSelect'
				value={sortIdOrder}
				onChange={handleSortIdChange}
			>
				<option value='asc'>id Asc</option>
				<option value='desc'>id Descending</option>
			</select>

			<select
				className='sortByTitleSelect'
				value={sortTitleOrder}
				onChange={handleSortTitleChange}
			>
				<option value='asc'>Title asc</option>
				<option value='desc'>Title desc</option>
				<option value='default'>Title default</option>
			</select>

			<select
				className='sortByNameSelect'
				value={sortNameOrder}
				onChange={handleSortNameChange}
			>
				<option value='asc'>Name asc</option>
				<option value='desc'>Name desc</option>
				<option value='default'>Name default</option>
			</select>

			<select
				className='sortByFavSelect'
				onChange={handleSortFavChange}
				value={sortFavOrder}
				aria-label='Favorite'
			>
				<option value='asc'>Favorite asc</option>
				<option value='desc'>Favorite desc</option>
				<option value='default'>Favorite default</option>
			</select>
		</div>
	);
};
