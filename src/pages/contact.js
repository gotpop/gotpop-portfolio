import { LocationMarkerIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";

import Container from "@components/container";
import Head from 'next/head'
import IconWhatsApp from "@components/icons/whatsapp";
import Intro from "@components/ui/intro";
import Layout from "@components/layout";
import Link from "next/link";
import { configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useWeb3Forms from "use-web3forms";

export default function Contact({ siteconfig, profile }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const apiKey = siteconfig?.w3ckey || "YOUR_ACCESS_KEY_HERE";

  const { submit: onSubmit } = useWeb3Forms({
    apikey: apiKey,
    from_name: "Stablo Template",
    subject: "New Contact Message from Stablo Website",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout {...siteconfig}>
        <Container>
          <Intro
            title={'Contact'}
            profile={profile}
            left={
              <p className="mb-2 text-gray-500 max-w-prose">What to know how I can help you with your next project? Get in touch using the form here.</p>
            }
            right={
              <Link
                href={`https://web.whatsapp.com:/send?phone=${siteconfig.phone}&text=Hi, I am messaging you from www.gotpop.net`}
                rel='noreferrer' target="_blank"
                className="items-center justify-between hidden px-6 py-2 mb-3 text-xs font-medium leading-tight text-gray-800 transition duration-150 ease-in-out bg-white rounded md:flex hover:bg-cool focus:outline-none focus:ring-0">
                Whats App Web
                <IconWhatsApp color={'green'} />
              </Link>
            } />
          <div className="grid my-10 md:grid-cols-2">
            <div className="my-10">

            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                <input
                  type="checkbox"
                  id=""
                  className="hidden"
                  style={{ display: "none" }}
                  {...register("botcheck")}></input>

                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    autoComplete="false"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${errors.name
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                      }`}
                    {...register("name", {
                      required: "Full name is required",
                      maxLength: 80
                    })}
                  />
                  {errors.name && (
                    <div className="mt-1 text-red-600">
                      <small>{errors.name.message}</small>
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="email_address" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email_address"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    autoComplete="false"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${errors.email
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                      }`}
                    {...register("email", {
                      required: "Enter your email",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email"
                      }
                    })}
                  />
                  {errors.email && (
                    <div className="mt-1 text-red-600">
                      <small>{errors.email.message}</small>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4  ${errors.message
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                      }`}
                    {...register("message", {
                      required: "Enter your Message"
                    })}
                  />
                  {errors.message && (
                    <div className="mt-1 text-red-600">
                      {" "}
                      <small>{errors.message.message}</small>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
                  {isSubmitting ? (
                    <svg
                      className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>

              {isSubmitSuccessful && isSuccess && (
                <div className="mt-3 text-sm text-center text-green-500">
                  {message || "Success. Message sent successfully"}
                </div>
              )}
              {isSubmitSuccessful && !isSuccess && (
                <div className="mt-3 text-sm text-center text-red-500">
                  {message || "Something went wrong. Please try later."}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);

  const url = "https://api.github.com/users/gotpop"
  const getProfile = await fetch(url)
  const getProfileData = await getProfile.json()

  return {
    props: {
      siteconfig: { ...config },
      profile: getProfileData,
      preview
    },
    revalidate: 100
  };
}
