import { useState } from 'react';
import './allButtonsAndDialog.css';
import { AllConfirmation } from './allConfirmation/AllConfirmation';

export const AllButtonsAndDialog = ({
	filteredPostsByName,
	setIsFavorite,
	isOnChecked,
}) => {
	const [isDeleteAllConfirmationOpen, setIsDeleteAllConfirmationOpen] =
		useState(false);
	const [isAddAllConfirmationOpen, setIsAddAllConfirmationOpen] =
		useState(false);

	const deleteAllPosts = () => {
		setIsDeleteAllConfirmationOpen(true);
	};

	const addAllConfirm = () => {
		filteredPostsByName.forEach(post => {
			if (isOnChecked[post.id]) {
				setIsFavorite(prevState => ({
					...prevState,
					[post.id]: (prevState[post.id] = true),
				}));
			}
		});
		setIsAddAllConfirmationOpen(false);
	};

	const onAllCancel = () => {
		setIsDeleteAllConfirmationOpen(false);
	};

	const onAllConfirm = () => {
		filteredPostsByName.forEach(post => {
			if (isOnChecked[post.id]) {
				setIsFavorite(prevState => ({
					...prevState,
					[post.id]: (prevState[post.id] = false),
				}));
			}
		});
		setIsDeleteAllConfirmationOpen(false);
	};

	const addAllCancel = () => {
		setIsAddAllConfirmationOpen(false);
	};

	const addAllFavorites = () => {
		setIsAddAllConfirmationOpen(true);
	};

	const allText =
		(isDeleteAllConfirmationOpen && 'Удалить все из избранного?') ||
		(isAddAllConfirmationOpen && 'Все в избранное?');

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
				Add all
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
