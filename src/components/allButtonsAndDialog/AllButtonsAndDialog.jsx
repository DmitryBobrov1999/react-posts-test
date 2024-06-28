import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAll } from '../../slices/postsSlice';
import './allButtonsAndDialog.css';
import { AllConfirmation } from './allConfirmation/AllConfirmation';

export const AllButtonsAndDialog = ({ filteredPostsByName, setIsFavorite }) => {
	const [isDeleteAllConfirmationOpen, setIsDeleteAllConfirmationOpen] =
		useState(false);
	const [isAddAllConfirmationOpen, setIsAddAllConfirmationOpen] =
		useState(false);
	const dispatch = useDispatch();

	const deleteAllPosts = () => {
		setIsDeleteAllConfirmationOpen(true);
	};

	const addAllConfirm = () => {
		filteredPostsByName.forEach(post => {
			setIsFavorite(prevState => ({
				...prevState,
				[post.id]: (prevState[post.id] = true),
			}));
		});
		setIsAddAllConfirmationOpen(false);
	};

	const onAllCancel = () => {
		setIsDeleteAllConfirmationOpen(false);
	};

	const onAllConfirm = () => {
		dispatch(deleteAll());
		setIsDeleteAllConfirmationOpen(false);
	};

	const addAllCancel = () => {
		setIsAddAllConfirmationOpen(false);
	};

	const addAllFavorites = () => {
		setIsAddAllConfirmationOpen(true);
	};

	const allText = isDeleteAllConfirmationOpen && 'Удалить все посты?' ||
	isAddAllConfirmationOpen && 'Все в избранное?';

	return (
		<div className='allButtonsAndDialog'>
			<button onClick={deleteAllPosts} className='allDeleteButton'>
				Delete all
			</button>
			{isDeleteAllConfirmationOpen && (
				<AllConfirmation
					allText={allText}
					allCancel={onAllCancel}
					allConfirm={onAllConfirm}
				/>
			)}
			<button onClick={addAllFavorites} className='allFavoriteButton'>
				All to favorites
			</button>
			{isAddAllConfirmationOpen && (
				<AllConfirmation
					allText={allText}
					allCancel={addAllCancel}
					allConfirm={addAllConfirm}
				/>
			)}
		</div>
	);
};
