import { useDispatch } from 'react-redux';
import { editPostData } from '../../api/editPostApi';
import './postInfo.css';

export const PostInfo = ({ props }) => {
	const dispatch = useDispatch();

	const { post, isEditOpen, setIsEditOpen, editedPost, setEditedPost } = props;

	const handleSave = postId => {
		setEditedPost(null);
		setIsEditOpen(prevState => ({
			[postId]: !prevState[postId],
		}));
		dispatch(editPostData({ editedPost }));
	};

	const handleCancel = postId => {
		setEditedPost(null);
		setIsEditOpen(prevState => ({
			[postId]: !prevState[postId],
		}));
	};

	return (
		<div className='postInfo'>
			<div className='postInfoNames'>
				<label className='label'>Title:</label>
				<label className='label labelName'>Name:</label>
				<label className='label labelText'>Text:</label>
			</div>
			<div className='postInfoInputs'>
				<input
					className='inputTitle'
					type='text'
					disabled={!isEditOpen[post.id] ? true : false}
					onChange={e =>
						setEditedPost(prevState => ({
							...prevState,
							title: e.target.value,
							id: post.id,
							userId: post.userId,
						}))
					}
					value={
						editedPost?.id === post.id
							? editedPost.title || post.title
							: post.title
					}
				/>
				<input
					className='inputName'
					type='text'
					disabled={!isEditOpen[post.id] ? true : false}
					onChange={e => {
						setEditedPost(prevState => ({
							...prevState,
							name: e.target.value,
							id: post.id,
							userId: post.userId,
						}));
					}}
					value={
						editedPost?.id === post.id
							? editedPost.name || post.name
							: post.name
					}
				/>
				<textarea
					className='areaText'
					type='text'
					disabled={!isEditOpen[post.id] ? true : false}
					onChange={e =>
						setEditedPost(prevState => ({
							...prevState,
							body: e.target.value,
							id: post.id,
							userId: post.userId,
						}))
					}
					value={
						editedPost?.id === post.id
							? editedPost.body || post.body
							: post.body
					}
				/>

				{editedPost?.id === post?.id && (
					<div className='confirmationDialog'>
						<p>Do you want to confirm changes?</p>
						<button onClick={() => handleSave(post.id)}>Confirm</button>
						<button onClick={() => handleCancel(post.id)}>Cancel</button>
					</div>
				)}
			</div>
		</div>
	);
};
