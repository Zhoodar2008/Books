// BookDetails.js
import React, {  useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import bookData from '../../../components/bookData/booksList';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { FaRegHeart } from 'react-icons/fa';
import { LuShare2 } from 'react-icons/lu';

const BookDetails = ({ dark, onSubmit, setIdOfBook }) => {

	const [count, setCount] = useState(1);

	const addNum = () => {
		setCount(count + 1);
	};

	const subtractNum = () => {
		setCount((count) => (count > 1 ? count - 1 : count));
	};

	const { bookId } = useParams();
	const selectedBook = bookData.bookdata.find(
		(book) => book.id === parseInt(bookId, 10)
	);

	if (!selectedBook) {
		return <div>Book not found.</div>;
	}

	const handleClick = () => {
		// Assuming onSubmit updates the total count
		setIdOfBook(selectedBook.id);

		let existingQuantities = JSON.parse(localStorage.getItem('quantity'));
		existingQuantities = existingQuantities !== null ? existingQuantities : {};

		const existingIds = JSON.parse(localStorage.getItem('bookIds')) || [];

		// Update the quantity for the current bookId
		existingQuantities[selectedBook.id] = (existingQuantities[selectedBook.id] || 0) + count;
		localStorage.setItem('quantity', JSON.stringify(existingQuantities));

		// Add the current bookId to the existingIds if not present
		if (!existingIds.includes(selectedBook.id)) {
			existingIds.push(selectedBook.id);
			localStorage.setItem('bookIds', JSON.stringify(existingIds));
		}
		onSubmit(existingIds.length);
	};

	return (
		<>
			<div className={'container'}>
				<div className="bookDetails">
					<div className="bookPhoto">
						<img src={selectedBook.thumbnailUrl} alt={selectedBook.title} />
					</div>

					<div
						className="bookDesc"
						style={{ color: dark ? 'white' : 'black' }}
					>
						<div className="title">
							<h1 style={{ color: dark ? 'white' : 'black' }}>
								{selectedBook.title}
							</h1>

							<div className="likeAndShareIcons">
								{<FaRegHeart />}
								{<LuShare2 />}
							</div>
						</div>

						<p
							style={{ color: dark ? 'white' : 'black' }}
							className={'author'}
						>
							{selectedBook.authors[0]}
						</p>
						<p
							style={{ color: dark ? 'white' : 'black' }}
							className={'description'}
						>
							{selectedBook.shortDescription.slice(0, 500)}
						</p>

						<p className={'price'}>$ {selectedBook.price}</p>

						<div className="buttons">
							<button
								onClick={handleClick}
								className={'addToCart'}
								style={{ color: dark ? 'white' : 'black' }}
							>
								Add to Cart
							</button>

							<div className="counter">
								<p onClick={subtractNum} className={'subtract'}>
									{<RiSubtractFill />}
								</p>
								<p
									className={'currentNum'}
									style={{ color: dark ? 'white' : 'black' }}
								>
									{count}
								</p>
								<p onClick={addNum} className={'add'}>
									{<IoMdAdd />}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookDetails;
