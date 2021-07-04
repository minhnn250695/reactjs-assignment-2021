import React from 'react';
import './spiner.scss';

function Spinner() {
	return (
		<div className='full-page'>			
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
