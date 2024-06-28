import './buttons.css'

export const Buttons = ({ props }) => {
	const { post, isCommentOpen, toggleComment, isEditOpen, toggleEdit, deletePost, isFavorite, addFavorite, onChecked, isDeleteConfirmationOpen } = props
	return (
		<div className='buttons'>
			<button
				onClick={() => toggleComment(post.id)}
				className={`commentsButton ${isCommentOpen[post.id] ? 'active' : ''}`}
			/>
			<button
				onClick={() => toggleEdit(post.id)}
				className={`editButton ${isEditOpen[post.id] ? 'active' : ''}`}
			/>
			<button
				onClick={() => deletePost(post.id)}
				className={`deleteButton ${
					isDeleteConfirmationOpen[post.id] ? 'active' : ''
				}`}
			></button>
			<button
				onClick={() => addFavorite(post)}
				className={`favoriteButton ${isFavorite[post.id] ? 'active' : ''}`}
			></button>
			<input className='checkbox' onChange={() => onChecked(post.id)} type='checkbox' />
		</div>
	);
}