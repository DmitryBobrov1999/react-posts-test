import './allConfirmation.css';

export const AllConfirmation = ({ allCancel, allConfirm, allText }) => {
	return (
		<div className='allConfirmationDialog'>
			<p>{allText}</p>
			<div className='allConfirmationButtons'>
				<button className='allConfirmationConfirm' onClick={allConfirm}>
					Confirm
				</button>
				<button className='allConfirmationCancel' onClick={allCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};
