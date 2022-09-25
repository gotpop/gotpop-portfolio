import Link from "next/link";
import IconGitHub from "@components/icons/github";
import GitHubClone from "./github-clone";

export default function GitHubRepo(props) {
    const { repo, index } = props;

    return (
        <div className="bg-white p-4 rounded" key={index}>
            <div className="flex justify-between mb-4">
                <h2 className="capitalize text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                    {repo.name}
                </h2>
                <Link href={repo.html_url}>
                    <a className="flex items-center justify-between px-6 py-2 border-2 border-gray-600 text-gray-800 font-medium text-xs leading-tight rounded bg-gray-100 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        View repo on GitHub
                        <IconGitHub color={'green'} />
                    </a>
                </Link>
                {repo.homepage && <Link href={repo.homepage}>
                    <a className="flex items-center justify-between px-6 py-2 border-2 border-gray-600 text-gray-800 font-medium text-xs leading-tight rounded bg-gray-100 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        View live site
                        <IconGitHub color={'green'} />
                    </a>
                </Link>}
            </div>
            <p className="text-sm text-gray-500 mb-2">{repo.description}</p>
            <p className="text-sm text-gray-500 mb-4">Licence: {repo?.license?.name}</p>
            <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.map((topic, index) => {
                    const list = (
                        <span key={index} className="block-inline rounded bg-gray-100 py-1 px-4 text-sm">{topic}</span>
                    );
                    return list;
                })}
            </div>
            <GitHubClone repo={repo} />
        </div>
    );
}
