import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Login from './Login';

// Payment Step 1: Input Amount
const PaymentStep1 = ({ amount, setAmount, onContinue }) => (
    <div className="flex flex-col h-full">
        <div className="flex-grow">
            <h3 className="font-bold mb-3">Make Payment of $1000</h3>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="p-2 border rounded w-1/3"
            />
        </div>
        <div className="mt-80 flex justify-center p-4">
            <button
                onClick={onContinue}
                className="p-2 bg-blue-500 text-white rounded w-1/2"
            >
                Continue
            </button>
        </div>
    </div>
);

// Payment Step 2: Review Payee Info
const PaymentStep2 = ({ amount, onContinue, onBack, onCloseModal }) => {
    const randomPayeeAccount = Math.floor(Math.random() * 1000000000);
    const payeeSortCode = Math.floor(Math.random() * 100000);

    return (
        <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 mt-6 text-left px-4">
                BigRedApp uses Plaid to power your payments
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                <div className="mb-4">
                    <p className="font-semibold">Amount:</p>
                    <p>$1000</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Payee:</p>
                    <p>BigRedApp</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Account Number:</p>
                    <p>{randomPayeeAccount}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Sort Code:</p>
                    <p>{payeeSortCode}</p>
                </div>
            </div>

            <div className="mt-28 flex flex-col justify-between">
                <div className="flex justify-center">
                    <button
                        onClick={onContinue}
                        className="p-2 bg-blue-500 text-white rounded w-1/2"
                    >
                        Continue
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button onClick={onCloseModal} className="text-red-500">
                        Cancel
                    </button>
                </div>
            </div>
            <button
                onClick={onBack}
                className="p-2 bg-gray-500 text-white rounded absolute bottom-24 left-29"
            >
                &#8592; Back
            </button>
        </div>
    );
};

// Payment Step 3: Select Bank
const PaymentStep3 = ({ bank, setBank, onConfirm, onBack, onNext }) => {
    const banks = ["Bank A", "Bank B", "Bank C"];

    return (
        <div>
            <h3>Select Bank</h3>
            <div className="space-y-2 mt-4">
                {banks.map((bankName) => (
                    <button
                        key={bankName}
                        onClick={() => setBank(bankName)}
                        className={`p-4 w-full text-left rounded-lg border ${bank === bankName ? 'bg-blue-500 text-white' : 'bg-white'} shadow-md ${bank === bankName ? 'border-blue-500' : 'border-gray-300'}`}
                    >
                        {bankName}
                    </button>
                ))}
            </div>

            <div className="flex justify-between" style={{ marginTop: '159px' }}>
                <button onClick={onBack} className="p-2 bg-gray-500 text-white rounded">
                    &#8592; Back
                </button>
                <button onClick={onNext} className="p-2 bg-green-500 text-white rounded">
                    Continue
                </button>
            </div>
        </div>
    );
};

// Payment Step 4: Authenticate with Bank
const PaymentStep4 = ({ bank, onBack, onContinue }) => {
    useEffect(() => {
        console.log("Selected bank in Step 4:", bank);
    }, [bank]);

    return (
        <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 mt-6 text-left">
                Authenticate with {bank || "the selected bank"}
            </h3>

            <div className="py-1">
                <p>
                    Please authenticate your account with {bank || "the selected bank"} to proceed
                    with the payment.
                </p>
                <p>
                    Follow the instructions provided by {bank || "the selected bank"} to complete the
                    authentication process.
                </p>
            </div>

            <div className="flex justify-between" style={{ marginTop: '308px' }}>
                <button onClick={onBack} className="p-2 bg-gray-500 text-white rounded">
                    &#8592; Back
                </button>
                <button onClick={onContinue} className="p-2 bg-green-500 text-white rounded">
                    Continue
                </button>
            </div>
        </div>
    );
};

// Home Component: Handles Modal Flow
const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [step, setStep] = useState(1);

    // State for Payment Flow
    const [amount, setAmount] = useState("");
    const [bank, setBank] = useState("");

    const handleButtonClick = (content) => {
        setModalContent(content);
        setStep(1);
        setIsModalOpen(true);
    };

    const handlePaymentNext = () => {
        if (step === 3 && !bank) {
            alert("Please select a bank before continuing.");
            return;
        }
        setStep(step + 1);
    };

    const handlePaymentBack = () => setStep(step - 1);

    const handlePaymentConfirm = () => {
        alert("Payment Confirmed!");
        setIsModalOpen(false);
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case 'Make Payment':
                if (step === 1) {
                    return <PaymentStep1 amount={amount} setAmount={setAmount} onContinue={handlePaymentNext} />;
                } else if (step === 2) {
                    return <PaymentStep2 amount={amount} onContinue={handlePaymentNext} onBack={handlePaymentBack} />;
                } else if (step === 3) {
                    return <PaymentStep3 bank={bank} setBank={setBank} onConfirm={handlePaymentConfirm} onBack={handlePaymentBack} onNext={handlePaymentNext} />;
                } else if (step === 4) {
                    return <PaymentStep4 bank={bank} onBack={handlePaymentBack} onContinue={handlePaymentNext} />;
                }
                else if (step === 5) {
                    return (
                        <Login
                            onLogin={(userId, username) => {
                                alert(`Logged in as ${username}!`);
                                setIsModalOpen(false);
                            }}
                        />
                    );
                }
                break;
            case 'Check your account balance':
                return <SelectBankForBalance bank={bank} setBank={setBank} onConfirm={handleBalanceCheck} onBack={() => setIsModalOpen(false)} />;
            case 'View all transactions':
                return <SelectBankForTransactions bank={bank} setBank={setBank} onConfirm={handleViewTransactions} onBack={() => setIsModalOpen(false)} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-red-700 mb-4">Welcome to BigRedApp</h1>

            <div className="flex flex-row items-center gap-4">
                <Button text="Make Payment" onClick={() => handleButtonClick('Make Payment')} />
                <Button text="See Transactions" onClick={() => handleButtonClick('View all transactions')} />
                <Button text="Get Balance" onClick={() => handleButtonClick('Check your account balance')} />
            </div>

            <Modal
                title="Information"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
};

export default Home;
