import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

const Welcome = () => {
  return (
    <>
      <Helmet>
        <title>Welcome </title>
      </Helmet>
      <div className="flex items-center justify-center w-full h-screen street-bg">
        <div className="lg:px-40 lg:py-20 md:px-20 md:py-10 py-8 px-4 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h1 className="font-bold font-mono text-gray-700 lg:text-8xl text-5xl">
              Welcome!
            </h1>

            <h6 className="mb-2 pt-4 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-emerald-500">
                Please check your email to verify your account.
              </span>
            </h6>
            <Link
              to="/"
              type="button"
              className="btn text-white flex w-fit bg-emerald-500 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:bg-emerald-400 font-medium rounded text-sm px-5 py-3 mb-3 mt-5 md:mb-0 text-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
            >
              Go to home page
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
