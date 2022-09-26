import Image from 'next/image';

export default function Intro(props) {
    const { title, profile, skills, left, right } = props;

    return (
        <div className="mb-8 bg-white rounded flex justify-between">
            <div className="flex flex-wrap w-3/6 p-6">
                <div className="flex basis-[100%] mb-4">
                    {profile && <Image
                      // loader={myLoader}
                      className="rounded-full"
                      src={profile.avatar_url}
                      alt="Profile avatar"
                      width={30}
                      height={30} />}
                    <div>
                        <h1 className="block ml-2 text-gray-900 dark:text-gray-400 text-xl leading-tight font-medium">
                            {profile?.company} {skills && '/ Skills'} / {title}
                        </h1>
                    </div>
                </div>
                {left}
            </div>
            <div className="relative clippy w-3/6 flex flex-col items-end bg-red-500 justify-end p-4">
                {right}
            </div>
        </div>
    );
}

