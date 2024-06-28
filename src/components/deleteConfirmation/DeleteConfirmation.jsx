import './deleteConfirmation.css';

export const DeleteConfirmation = ({ onConfirm, onCancel }) => {
	return (
		<div className='deleteConfirmationDialog'>
			<p>Do you want to delete this post?</p>
			<div className='confirmationButtons'>
				<button className='confirmationConfirm' onClick={onConfirm}>
					Confirm
				</button>
				<button className="confirmationCancel" onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
};
