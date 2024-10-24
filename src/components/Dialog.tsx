import { useEffect, useRef, useState } from 'react';

const initialItems = Array.from({ length: 500 }, (_, index) => `Item ${index + 1}`);

const Dialog = ({ onClose }: { onClose: () => void }) => {
    const [items, setItems] = useState<string[]>(initialItems.slice(0, 20));
    const [loading, setLoading] = useState(false);
    const [lastItemDeleted, setLastItemDeleted] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const loadMoreItems = () => {
        if (!lastItemDeleted && items.length < initialItems.length && !loading) {
            setLoading(true);
            setTimeout(() => {
                const moreItems = initialItems.slice(items.length, items.length + 20);
                setItems((prevItems) => [...prevItems, ...moreItems]);
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!listRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                loadMoreItems();
            }
        };
        const listElement = listRef.current;
        listElement?.addEventListener("scroll", handleScroll);
        return () => {
            listElement?.removeEventListener("scroll", handleScroll);
        };
    }, [items.length, loading, lastItemDeleted]);

    const deleteItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        if (updatedItems.length === 0) {
            setLastItemDeleted(true);
        } else if (index === updatedItems.length) {
            setLastItemDeleted(true);
        } else {
            setLastItemDeleted(false);
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white p-6 rounded-md shadow-lg max-w-md w-full relative transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`} ref={dialogRef}>
                <h2 className="text-lg font-bold mb-4">List</h2>
                <div className="overflow-y-auto max-h-64 border p-1" ref={listRef}>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center border-2 rounded-xl p-2 mb-1">
                                {item}
                                <button
                                    onClick={() => deleteItem(index)}
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    {loading && (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid"></div>
                            <p>Loading</p>
                        </div>
                    )}
                </div>
                {lastItemDeleted && (
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">You've deleted the last item!</h3>
                        <img
                            src="https://loremflickr.com/320/240/cat"
                            alt="A cute cat"
                            className="mt-2 w-full rounded-md"
                        />
                    </div>
                )}
                <button className="absolute top-3 right-5 w-6 h-6" onClick={handleClose}>
                    <span className="block absolute bg-gray-700 w-full h-0.5 transform rotate-45 top-1/2"></span>
                    <span className="block absolute bg-gray-700 w-full h-0.5 transform -rotate-45 top-1/2"></span>
                </button>
            </div>
        </div>
    );
};

export default Dialog;
