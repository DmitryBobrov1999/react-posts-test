import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePostData } from '../../api/deletePostApi';
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
	const dispatch = useDispatch();

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
				dispatch(deletePostData({ postId: post.id }));
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
		(isDeleteAllConfirmationOpen && 'delete selected posts?') ||
		(isAddAllConfirmationOpen && 'add selected posts to favorites?');

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
