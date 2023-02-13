import { useEffect, useState } from 'react';

export default function GitHubClone(props) {
    const { repo } = props;
    const [showMe, setShowMe] = useState(false);
    function toggle() {
        setShowMe(!showMe);
    }
    return (
        <>
            <button className="border-1 border-gray-600 text-gray-800 text-xs" onClick={toggle}>Clone repo</button>
            <div style={{
                display: showMe ? "block" : "none"
            }}>
                <div className="m-1 bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                <div id="header-buttons" className="py-3 px-4 flex">
                    <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                    <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                    <div className="rounded-full w-3 h-3 bg-green-500"></div>
                </div>
                <div id="code-area" className="py-4 px-4 mt-1 text-white text-sm">
                    <div className="mb-2">
                        <span className="text-yellow-300">git</span> <span className="text-blue-400">clone</span> <span className="text-green-400">{repo.ssh_url}</span>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}