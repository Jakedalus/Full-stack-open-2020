import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const Filter = props => {
	// const dispatch = useDispatch();

	const handleChange = event => {
		// dispatch(updateFilter(event.target.value));
		props.updateFilter(event.target.value);
	};
	const style = {
		marginBottom : 10
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};

const mapDispatchToProps = {
	updateFilter
};

const ConnectedFilter = connect(null, mapDispatchToProps)(
	Filter
);

export default ConnectedFilter;
