import { useContext } from 'react';
import { FeaturesBlockContext } from '../../../app/layouts/BaseLayout'; 
import './filterBlock.css';

export const FilterBlock = () => {
	const {
		users,
		handleUserChange,
		showFavorite,
		handleShowFavorite,
		searchValue,
		setSearchValue,
	} = useContext(FeaturesBlockContext);
	
	return (
		<div className='filterByBlock'>
			<span className='filterBySpan'>Filter by:</span>
			<select className='filterSelect' onChange={handleUserChange}>
				<option value=''>All Names</option>
				{users.map(user => (
					<option key={user.id} value={user.name}>
						{user.name}
					</option>
				))}
			</select>
			<button
				className={`filterFavButton ${showFavorite ? 'active' : ''}`}
				onClick={handleShowFavorite}
			>
				Favorites
			</button>
			<input
				className='filterInput'
				placeholder='Title'
				type='text'
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
			/>
		</div>
	);
};
