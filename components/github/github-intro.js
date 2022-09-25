import Hire from "@components/ui/hire";
import IconGitHub from "@components/icons/github";
import Image from 'next/image'
import Link from "next/link";

export default function GitHubIntro(props) {
  const { profile } = props;

  return (
    <>
      <div className="mb-8 bg-white rounded p-6">
        <div className="flex justify-between">
          <div className="w-3/6">
            <div className="flex mb-4">
              <h1 className="inline-block mr-2 text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium">
                GitHub / {profile.company}
              </h1>
              <Image
                // loader={myLoader}
                className="rounded-full"
                src={profile.avatar_url}
                alt="Profile avatar"
                width={30}
                height={30}
              />
            </div>
            <p className="text-gray-500 mb-2 max-w-prose">{profile.bio}</p>

          </div>
          <div className="w-2/6 flex flex-col items-start justify-between">
            
            <Link href={profile.html_url}>
              <a className="flex items-center  mb-3 justify-between px-6 py-2 border-2 border-slate-300 text-gray-800 font-medium text-xs leading-tight rounded bg-cool hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
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
          <div className="w-1/6 flex flex-col">
          <p className="text-xs mb-2">Location: {profile.location} {profile.hireable && <Hire color={'green'} />}</p>
          <Link href={'https://www.' + profile.blog}>{profile.blog}</Link>
          </div>
        </div>
      </div>
    </>
  );
}