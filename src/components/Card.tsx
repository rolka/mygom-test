import { useState } from 'react';
import Dialog from './Dialog';
const Card = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Card Title</h1>
                <p className="mb-4">This is a card component with a button to open the dialog.</p>
                <button onClick={openDialog} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Open Dialog
                </button>
            </div>
            {isDialogOpen && <Dialog onClose={closeDialog} />}
        </div>
    );
};
export default Card;
