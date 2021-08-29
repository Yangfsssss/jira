import React, { useState, useEffect } from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';

const imgList = [
	{ url: 'https://source.unsplash.com/user/erondu/800x200' },
	{ url: 'https://source.unsplash.com/user/erondu/800x400' },
	{ url: 'https://source.unsplash.com/user/erondu/800x600' },
];

const Img = (props) => {
	const [value, setValue] = useState(0);

	// const { url } = props;
	// return (
	// 	<div>
	// 		<img src={url} alt='cool img' />
	// 	</div>
	// );
	useEffect(() => {
		console.log('refreshed2', value);
	}, [value]);

	return (
		<div style={{ width: '400px', height: '400px'}}> 
			<div style={{ width: '400px', height: '400px' ,overflow:'auto'}}>
				<ReactPanZoom image={imgList[0]?.url} />
			</div>
			<div style={{ width: '400px', height: '400px' ,overflow:'auto'}}>
				<ReactPanZoom image={imgList[1]?.url} />
			</div>
			<div style={{ width: '400px', height: '400px',overflow:'auto' }}>
				<ReactPanZoom image={imgList[2]?.url} />
			</div>
			{/* <ReactPanZoom image={imgList[1]?.url} /> */}
			{/* <ReactPanZoom image={imgList[2]?.url} /> */}
		</div>
	);
};

const FatherImg = () => {
	const [value, setValue] = useState(0);

	// const { url } = props;
	// return (
	// 	<div>
	// 		<img src={url} alt='cool img' />
	// 	</div>
	// );
	useEffect(() => {
		console.log('refreshed', value);
	}, [value]);

	return (
		<div>
			{Math.random() > 0 && <Img />}
			{/* {Math.random() < 0.5 && <Img />} */}
			<button onClick={() => setValue(value + 1)}>refresh</button>
		</div>
	);
};

export default FatherImg;
