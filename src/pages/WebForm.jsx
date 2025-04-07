import React from "react";
import { useSelector } from "react-redux";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const WebForm = () => {
    const { business } = useSelector((state) => state.onboarding);
    const webFormUrl = `http://localhost:5173/registerComplaint?t=${business?.data?.newOrganization?._id || "demo-id"}`;

    const handleCopyCode = () => {
        navigator.clipboard.writeText(webFormUrl);
        alert("Link copied to clipboard!");
    };

    const handleVisitForm = () => {
        window.open(webFormUrl, '_blank');
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100 p-4 md:p-6">
            <Card 
                className="w-full max-w-3xl"
                title="Web Forms"
                subtitle="Share this URL with your customers to collect complaints"
            >
                <div className="space-y-6">
                    <div className="bg-gray-100 p-6 rounded-md">
                        <h3 className="text-lg font-semibold mb-4">Complaint Form URL</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <code className="bg-white text-gray-800 p-3 rounded-md text-sm font-mono break-all flex-grow">
                                {webFormUrl}
                            </code>
                            <div className="flex gap-2 mt-3 sm:mt-0">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleCopyCode}
                                    className="flex items-center gap-1"
                                >
                                    <FiCopy size={16} /> Copy
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleVisitForm}
                                    className="flex items-center gap-1"
                                >
                                    <FiExternalLink size={16} /> Visit
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Integration Instructions</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Share this URL with your customers directly</li>
                            <li>Embed this URL in a button on your website</li>
                            <li>Include this link in your email signatures</li>
                        </ol>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-md">
                        <h3 className="text-lg font-semibold mb-4">Embed Code</h3>
                        <code className="bg-white text-gray-800 p-3 rounded-md text-xs sm:text-sm font-mono block overflow-x-auto">
                            {`<a href="${webFormUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0061A1;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;font-family:Arial,sans-serif;">Submit Feedback</a>`}
                        </code>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                navigator.clipboard.writeText(`<a href="${webFormUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0061A1;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;font-family:Arial,sans-serif;">Submit Feedback</a>`);
                                alert("Embed code copied to clipboard!");
                            }}
                            className="mt-3"
                        >
                            Copy Code
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    );
};

export default WebForm;
