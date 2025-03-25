import { Button } from "@/components/ui/button";

export default function ChatGPTIntro() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    return (
        <div className="flex flex-col h-screen bg-black text-white">
        <header className="p-4 flex justify-between items-center bg-black shadow-md">
            <h1 className="text-2xl font-bold">Logo</h1>
            <Button className="bg-white text-black px-6 py-2 rounded-full">
            Login
            </Button>
        </header>

        <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
            <div className="mt-2 text-lg font-extrabold">{`Today's Date: ${formattedDate}`}</div>
            <h2 className="text-5xl font-extrabold">Lawyer</h2>
            <p className="mt-4 text-lg max-w-2xl">
            Problem Statement:</p>
            <p className="mt-4 text-lg max-w-2xl">Low-income individuals often cannot afford legal advice, leaving them vulnerable in
                disputes like evictions or wage theft due to complex laws and processes. Develop an AI tool that
                analyzes user-submitted case details (e.g., via text or voice) and public legal databases to provide step-bystep
                guidance, document templates, and risk predictions for common legal issues. The system should be
                accessible via a free app or chatbot in multiple languages, empowering non-experts to navigate legal
                systems.
            </p>
            <div className="flex space-x-4 mt-6">
                <Button className="bg-white text-black px-8 py-3 rounded-full text-lg hover:text-white">
                Try Lawyer
                </Button>
                <Button className="bg-white text-black px-8 py-3 rounded-full text-lg hover:text-white">
                Documents
                </Button>
            </div>
        </section>

        <footer className="p-4 text-center text-sm text-gray-400">
            ©{new Date().getFullYear()} QWERTY. All rights reserved. T&C applied.
        </footer>
        </div>
    );
}