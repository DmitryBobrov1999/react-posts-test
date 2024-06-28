import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostData } from '../../../api/createPostApi';
import { FeaturesBlockContext } from '../../../app/layouts/BaseLayout';
import './createPost.css';

export const CreatePost = () => {
	const dispatch = useDispatch();
	const [createPostInfo, setCreatePostInfo] = useState({
		title: '',
		name: '',
		body: '',
	});

	const { setIsShowCreatePost } = useContext(FeaturesBlockContext);
	const handleCreateData = () => {
		dispatch(createPostData(createPostInfo));
		setIsShowCreatePost(false);
	};

	return (
		<div className='createPostDialog'>
			<div className='createPostInfo'>
				<div className='createPostInfoNames'>
					<label className='createLabel'>Title:</label>
					<label className='createLabel createLabelName'>Name:</label>
					<label className='createLabel createLabelText'>Text:</label>
				</div>
				<div className='createPostInfoInputs'>
					<input
						onChange={e =>
							setCreatePostInfo({ ...createPostInfo, title: e.target.value })
						}
						className='createInputCreateTitle'
						type='text'
					/>
					<input
						onChange={e =>
							setCreatePostInfo({ ...createPostInfo, name: e.target.value })
						}
						className='createInputName'
						type='text'
					/>
					<textarea
						onChange={e =>
							setCreatePostInfo({ ...createPostInfo, body: e.target.value })
						}
						className='createAreaText'
						type='text'
					/>
				</div>
			</div>

			<div className='createConfirmationButtons'>
				<button onClick={handleCreateData} className='createConfirmButton'>
					Confirm
				</button>
				<button
					onClick={() => setIsShowCreatePost(false)}
					className='createCancelButton'
				>
					Cancel
				</button>
			</div>
		</div>
	);
};
