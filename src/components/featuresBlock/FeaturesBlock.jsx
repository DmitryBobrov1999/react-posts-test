import { useContext } from 'react';
import { FeaturesBlockContext } from '../../app/layouts/BaseLayout';
import { CreatePost } from './createPost/CreatePost';
import { Dropdown } from './dropdown/Dropdown';
import './featuresBlock.css';
import { FilterBlock } from './filterBlock/FilterBlock';
import { SortBlock } from './sortBlock/SortBlock';

export const FeaturesBlock = () => {
	const { isShowCreatePost, setIsShowCreatePost } =
		useContext(FeaturesBlockContext);

	return (
		<div className='featuresBlock'>
			<Dropdown />
			<button
				className='createPostButton'
				onClick={() => setIsShowCreatePost(true)}
			>
				Создать пост
			</button>
			{isShowCreatePost && <CreatePost />}
			<FilterBlock />
			<SortBlock />
		</div>
	);
};
