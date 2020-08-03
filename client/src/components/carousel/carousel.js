import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import image4 from './images/4.jpg';
import image6 from './images/6.jpg';
import image7 from './images/7.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './carousel.css';

const indicatorStyles = {
        background: '#fff',
        width: 8,
        height: 8,
        borderRadius : '100%',
        display: 'inline-block',
        margin: '0 8px',
        cursor : 'pointer'
};

function ScrollCarousel(){
	const images = [image4, image6, image7];//images
	return(
		<>
			<Hidden xsDown>
			 <div className='slider'>
			 
				<Carousel
						className='desktop-carousel'
						autoPlay
						interval={5000}
						transitionTime={700}
						showThumbs={false}
						showArrows={false}
						dynamicHeight={true}
						infiniteLoop={true} 
						statusFormatter={(current, total) => ''}
						renderIndicator={(onClickHandler, isSelected, index, label) => {
			                if (isSelected) {
			                    return (
			                        <li
			                            style={{ width: 8, height: 8, borderRadius : '100%', display: 'inline-block', margin: '0 8px', background : '#B0DFE5', cursor : 'pointer'}}
			                            
			                        />
			                    );}
			                  	return (
				                    <li
				                        style={indicatorStyles}
				                        onClick={onClickHandler}
				                        onKeyDown={onClickHandler}
				                        value={index}
				                        key={index}
				                        role="button"
				                        tabIndex={0}
				                        aria-label={`${label} ${index + 1}`}
				                    />
				                );
			            }}

				>
					{images.map((image, index) => (
						<div key={`slide${index}`}>
							<img className='desktop-images' src={image} />
						</div>

					))}
					
				</Carousel>
				
			  </div>
			</Hidden>
			<Hidden smUp>
				<Carousel
						className='mobile-carousel'
						autoPlay
						interval={5000}
						transitionTime={700}
						showThumbs={false}
						showArrows={false}
						dynamicHeight={true}
						infiniteLoop={true} 
						statusFormatter={(current, total) => ''}
						renderIndicator={(onClickHandler, isSelected, index, label) => {
			                if (isSelected) {
			                    return (
			                        <li
			                            style={{ width: 8, height: 8, borderRadius : '100%', display: 'inline-block', margin: '0 8px', background : '#B0DFE5', cursor : 'pointer'}}
			                            
			                        />
			                    );}
			                  	return (
				                    <li
				                        style={indicatorStyles}
				                        onClick={onClickHandler}
				                        onKeyDown={onClickHandler}
				                        value={index}
				                        key={index}
				                        role="button"
				                        tabIndex={0}
				                        aria-label={`${label} ${index + 1}`}
				                    />
				                );
			            }}

				>
					{images.map((image) => (
						<div>
							<img className='mobile-images' src={image} />
						</div>

					))}
					
				</Carousel>
			</Hidden>
		</>
	);
}

export default ScrollCarousel;