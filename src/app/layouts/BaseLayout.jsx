import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsData } from '../../api/commentsApi';
import { deletePostData } from '../../api/deletePostApi';
import { postsData } from '../../api/postsApi';
import { usersData } from '../../api/usersApi';
import { AllButtonsAndDialog } from '../../components/allButtonsAndDialog/AllButtonsAndDialog';
import { Buttons } from '../../components/buttons/Buttons';
import { Comments } from '../../components/comments/Comments';
import { DeleteConfirmation } from '../../components/deleteConfirmation/DeleteConfirmation';
import { FeaturesBlock } from '../../components/featuresBlock/FeaturesBlock';
import { Pagination } from '../../components/pagination/Pagination';
import { PostInfo } from '../../components/postInfo/PostInfo';
import { setPage, setPostsPerPage } from '../../slices/postsSlice';
import './baseLayout.css';

export const FeaturesBlockContext = createContext(null);

export const BaseLayout = () => {
	const dispatch = useDispatch();
	const { posts, postsPerPage, page } = useSelector(state => state.posts);
	const { users } = useSelector(state => state.users);
	const { comments } = useSelector(state => state.comments);
	const [isCommentOpen, setIsCommentOpen] = useState({});
	const [isEditOpen, setIsEditOpen] = useState({});
	const [editedPost, setEditedPost] = useState(null);
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState({});
	const [isFavorite, setIsFavorite] = useState({});
	const [isOnChecked, setIsOnChecked] = useState({});
	const [showFavorite, setShowFavorite] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [nameValue, setNameValue] = useState('');
	const [sortIdOrder, setSortIdOrder] = useState('desc');
	const [sortTitleOrder, setSortTitleOrder] = useState('default');
	const [sortNameOrder, setSortNameOrder] = useState('default');
	const [sortFavOrder, setSortFavOrder] = useState('default');
	const [isShowCreatePost, setIsShowCreatePost] = useState(false);

	useEffect(() => {
		dispatch(setPage(1));
		dispatch(postsData());
		dispatch(usersData());
	}, [dispatch]);

	const handlePostsChange = event => {
		dispatch(setPage(1));
		dispatch(setPostsPerPage(event.target.value));
	};

	const handlePageChange = event => {
		dispatch(setPage(event.selected + 1));
	};

	const postsWithUsers = posts.map(post => {
		const user = users.find(user => user.id === post.userId);
		if (!user) {
			return {
				...post,
				isFavorite: isFavorite[post.id] || false,
			};
		} else {
			return {
				...post,
				name: user?.name,
				isFavorite: isFavorite[post.id] || false,
			};
		}
	});

	const filteredPostsByTitle = postsWithUsers.filter(post =>
		post.title?.toLowerCase().includes(searchValue?.toLowerCase())
	);

	const filteredPostsByFavorite = filteredPostsByTitle.filter(post =>
		showFavorite ? post.isFavorite : post
	);

	const filteredPostsByName = filteredPostsByFavorite.filter(post =>
		post.name?.toLowerCase().includes(nameValue?.toLowerCase())
	);

	const handleSortIdChange = event => {
		setSortIdOrder(event.target.value);
	};

	const sortedPostsById = filteredPostsByName.sort((a, b) =>
		sortIdOrder === 'asc' ? a.id - b.id : b.id - a.id
	);

	const handleSortTitleChange = event => {
		setSortTitleOrder(event.target.value);
	};

	const sortedPostsByTitle = sortedPostsById.sort((a, b) => {
		if (sortTitleOrder === 'asc') {
			return a.title.localeCompare(b.title);
		} else if (sortTitleOrder === 'desc') {
			return b.title.localeCompare(a.title);
		} else {
			return 0;
		}
	});

	const handleSortNameChange = event => {
		setSortNameOrder(event.target.value);
	};

	const sortedPostsByName = sortedPostsByTitle.sort((a, b) => {
		if (sortNameOrder === 'asc') {
			return a.name.localeCompare(b.name);
		} else if (sortNameOrder === 'desc') {
			return b.name.localeCompare(a.name);
		} else {
			return 0;
		}
	});

	const handleSortFavChange = event => {
		setSortFavOrder(event.target.value);
	};

	const sortedPostsByFav = sortedPostsByName.sort((a, b) => {
		if (sortFavOrder === 'asc') {
			return a.isFavorite - b.isFavorite;
		} else if (sortFavOrder === 'desc') {
			return b.isFavorite - a.isFavorite;
		} else {
			return 0;
		}
	});

	const currentPage = page - 1;

	const truncatedPosts = sortedPostsByFav.slice(
		currentPage * postsPerPage,
		(currentPage + 1) * postsPerPage
	);

	const handleUserChange = event => {
		setNameValue(event.target.value);
	};

	const toggleComment = postId => {
		setIsCommentOpen(prevState => ({
			...prevState,
			[postId]: !prevState[postId],
		}));

		if (!isCommentOpen[postId]) {
			dispatch(commentsData(postId));
		}
	};

	const toggleEdit = postId => {
		setIsEditOpen(prevState => ({
			[postId]: !prevState[postId],
		}));
		if (editedPost?.id !== postId) {
			setEditedPost(null);
		}
	};

	const deletePost = postId => {
		setIsDeleteConfirmationOpen(prevState => ({
			[postId]: !prevState[postId],
		}));
	};

	const onConfirm = postId => {
		dispatch(deletePostData({ postId }));
		setIsDeleteConfirmationOpen(false);
	};
	const onCancel = () => {
		setIsDeleteConfirmationOpen(false);
	};

	const addFavorite = post => {
		setIsFavorite(prevState => ({
			...prevState,
			[post.id]: !prevState[post.id],
		}));
	};

	const onChecked = postId => {
		setIsOnChecked(prevState => ({
			[postId]: !prevState[postId],
		}));
	};

	const handleShowFavorite = () => {
		setShowFavorite(!showFavorite);
		dispatch(setPage(1));
	};

	const FeaturesBlockProps = {
		users: users,
		setSearchValue: setSearchValue,
		searchValue: searchValue,
		showFavorite: showFavorite,
		handleUserChange: handleUserChange,
		handleShowFavorite: handleShowFavorite,
		postsPerPage: postsPerPage,
		handlePostsChange: handlePostsChange,
		handleSortIdChange: handleSortIdChange,
		sortIdOrder: sortIdOrder,
		handleSortTitleChange: handleSortTitleChange,
		sortTitleOrder: sortTitleOrder,
		handleSortNameChange: handleSortNameChange,
		sortNameOrder: sortNameOrder,
		handleSortFavChange: handleSortFavChange,
		sortFavOrder: sortFavOrder,
		isShowCreatePost: isShowCreatePost,
		setIsShowCreatePost: setIsShowCreatePost,
	};

	return (
		<div className='App'>
			<FeaturesBlockContext.Provider value={FeaturesBlockProps}>
				<FeaturesBlock />
			</FeaturesBlockContext.Provider>

			<div className='posts'>
				{truncatedPosts.map(post => (
					<div className='post' key={post.id}>
						<PostInfo
							props={{
								post: post,
								isEditOpen: isEditOpen,
								setEditedPost: setEditedPost,
								editedPost: editedPost,
								setIsEditOpen: setIsEditOpen,
							}}
						/>

						<div className='buttonsAndDialog'>
							<Buttons
								props={{
									post: post,
									isCommentOpen: isCommentOpen,
									toggleComment: toggleComment,
									isEditOpen: isEditOpen,
									toggleEdit: toggleEdit,
									deletePost: deletePost,
									isFavorite: isFavorite,
									addFavorite: addFavorite,
									onChecked: onChecked,
									isDeleteConfirmationOpen: isDeleteConfirmationOpen,
								}}
							/>

							{isOnChecked[post.id] && (
								<AllButtonsAndDialog
									filteredPostsByName={filteredPostsByName}
									setIsFavorite={setIsFavorite}
								/>
							)}
						</div>

						{isCommentOpen[post.id] && (
							<Comments post={post} comments={comments} />
						)}

						{isDeleteConfirmationOpen[post.id] && (
							<DeleteConfirmation
								onConfirm={() => onConfirm(post.id)}
								onCancel={onCancel}
							/>
						)}
					</div>
				))}
			</div>
			{sortedPostsByFav.length > 1 && (
				<Pagination
					sortedPostsByFav={sortedPostsByFav}
					postsPerPage={postsPerPage}
					page={page}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
};
