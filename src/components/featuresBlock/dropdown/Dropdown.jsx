import { useContext } from 'react';
import { FeaturesBlockContext } from '../../../app/layouts/BaseLayout'; 
import './dropdown.css';

export const Dropdown = () => {
	const { postsPerPage, handlePostsChange } = useContext(FeaturesBlockContext);

	return (
		<div className='dropdown'>
			<select
				onChange={handlePostsChange}
				value={postsPerPage}
				className='dropdown_select'
			>
				<option className='dropdown_option' value='10' key='10'>
					10 posts
				</option>
				<option className='dropdown_option' value='20' key='20'>
					20 posts
				</option>
				<option className='dropdown_option' value='50' key='50'>
					50 posts
				</option>
				<option className='dropdown_option' value='100' key='100'>
					100 posts
				</option>
			</select>
		</div>
	);
};
