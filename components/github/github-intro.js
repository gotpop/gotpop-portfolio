import Hire from "@components/ui/hire";
import IconGitHub from "@components/icons/github";
import Image from 'next/image'
import Link from "next/link";

export default function GitHubIntro(props) {
    const { profile } = props;

    return (
        <>
            <div className="mb-8 bg-white rounded p-6">
              <div className="flex">
                <div className="w-3/6">
                  <h1 className="text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium mb-2">
                    GitHub / {profile.company} {profile.hireable && <Hire color={'green'} />}
                  </h1>
                  <p className="text-gray-500 mb-2 max-w-prose">{profile.bio}</p>
                  <p className="text-xs">Location: {profile.location}</p>
                </div>
                <div className="w-2/6 flex flex-col justify-between">
                  <Link href={profile.html_url}>
                    <a className="flex items-center justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View profile on GitHub
                        <IconGitHub color={'green'} />
                      </a>
                  </Link>
                  <Link href="https://gist.github.com/gotpop">
                    <a className="flex items-center justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      View {profile.public_gists} Gists on GitHub
                      <IconGitHub color={'green'} />
                      </a>
                  </Link>
                </div>
                <div className="w-1/6 flex justify-end items-start">
                  <Image
                    // loader={myLoader}
                    className="rounded-full w-32"
                    src={profile.avatar_url}
                    alt="Profile avatar"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
        </>
    );
}