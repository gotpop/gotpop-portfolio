import Container from "@components/container";

export default function Social(props) {
  return (
    <Container className="flex justify-center mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mt-2">
        <div className="mt-5">
          <section className="social">
            <nav className="social__nav flex justify-center">
              <a className="social__link text-blue-600" href="http://codepen.io/gotpop/">
                <span className="social__icon m-2 flex">
                  <svg width="50" height="50" name="codepen"><path fill="currentColor" d="M25 0C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0zm0 45.9C13.5 45.9 4.1 36.5 4.1 25S13.5 4.1 25 4.1c11.5 0 20.9 9.4 20.9 20.9S36.5 45.9 25 45.9z"></path><path fill="currentColor" d="M40.4 20.1v-.7s0-.1-.1-.1v-.1l-.1-.1-.1-.1-.1-.1h-.1L25.7 9.8c-.4-.3-1-.3-1.5 0l-14.1 9.4H10s-.1 0-.1.1l-.1.1-.1.1v.1s0 .1-.1.1v11.2s0 .1.1.1v.1l.1.1.1.1.1.1h.1l14.1 9.4c.2.1.5.2.7.2.3 0 .5-.1.7-.2l14.1-9.4h.1s.1 0 .1-.1l.1-.1.1-.1V31s0-.1.1-.1V20.6c.3-.4.3-.4.2-.5zm-14.1-6.7l10.4 6.9-4.6 3.1-5.8-3.9v-6.1zm-2.6 0v6.2l-5.8 3.9-4.6-3.1 10.4-7zm-11.5 9.4l3.3 2.2-3.3 2.2v-4.4zm11.5 13.8l-10.4-6.9 4.6-3.1 5.8 3.9v6.1zm1.3-8.5L20.3 25l4.7-3.1 4.7 3.1-4.7 3.1zm1.3 8.5v-6.2l5.8-3.9 4.6 3.1-10.4 7zm11.5-9.4L34.5 25l3.3-2.2v4.4z"></path></svg>
                </span>
              </a>
              <a className="social__link text-blue-600" href="http://uk.linkedin.com/in/gotpop">
                <span className="social__icon m-2 flex">
                  <svg width="50" height="50" name="linkedin"><path fill="currentColor" d="M46.3 0H3.7C1.7 0 0 1.6 0 3.6v42.8c0 2 1.7 3.6 3.7 3.6h42.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zM14.8 42.6H7.4V18.7h7.4v23.9zm-3.7-27.1c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm31.5 27.1h-7.4V31c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1v11.8h-7.4V18.7h7.1V22h.1c1-1.9 3.4-3.9 7-3.9 7.5 0 8.9 4.9 8.9 11.4v13.1z"></path></svg>
                </span>
              </a>
              <a className="social__link text-blue-600" href="https://github.com/gotpop">
                <span className="social__icon m-2 flex">
                  <svg width="50" height="50" name="github"><path fill="currentColor" d="M25 0C11.2 0 0 11.5 0 25.6 0 37 7.2 46.6 17.1 50c1.2.2 1.7-.6 1.7-1.2V44c-7 1.6-8.4-3-8.4-3-1.1-3-2.8-3.8-2.8-3.8-2.3-1.6.2-1.6.2-1.6 2.5.2 3.8 2.6 3.8 2.6 2.2 3.9 5.8 2.8 7.3 2.1.2-1.7.9-2.8 1.6-3.4C14.9 36.3 9 34.1 9 24.3c0-2.8 1-5.1 2.6-6.9-.3-.6-1.1-3.3.2-6.8 0 0 2.1-.7 6.9 2.6 2-.6 4.1-.9 6.3-.9 2.1 0 4.3.3 6.3.9 4.8-3.3 6.9-2.6 6.9-2.6 1.4 3.5.5 6.1.2 6.8 1.6 1.8 2.6 4.1 2.6 6.9 0 9.8-5.8 12-11.4 12.6.9.8 1.7 2.4 1.7 4.7v7c0 .7.4 1.5 1.7 1.2 9.8-3.2 17-12.8 17-24.2C50 11.5 38.8 0 25 0z"></path></svg>
                </span>
              </a>
            </nav>
          </section>
        </div>
      </div>
    </Container>
  );
}

