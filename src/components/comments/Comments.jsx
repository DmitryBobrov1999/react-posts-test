import './comments.css'

export const Comments = ({post, comments}) => {
	return (
		<div className='comments'>
			{comments[post.id]?.map(comment => (
				<div key={comment.id} className='comment'>
					<div className='commentInfo'>
						<span>Name: {comment.name}</span>
						<span>Email: {comment.email}</span>
						<span>Comment: {comment.body}</span>
					</div>
				</div>
			))}
		</div>
	);
}