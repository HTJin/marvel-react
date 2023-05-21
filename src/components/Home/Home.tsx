import { NavBar } from "../shared/NavBar";
import logo from "../../static/images/4-Marvel-logo-SVG-betterstudio.com_.svg";

interface Props {
  title: string;
}

export const Home = (props: Props) => {
  return (
    <div
      className="m-0 overflow-x-hidden p-0 text-[var(--text-color)]"
    >
      <NavBar />
      <div className="relative my-[10vh] flex h-[80vh] w-[50vw] snap-center items-center justify-center mx-auto rounded-3xl self-center bg-gray-700 bg-opacity-60">
        <div className="mx-auto max-w-2xl text-center align-middle flex flex-col justify-center">
        <img src={logo} alt="Marvel Studios Logo" className="w-96 self-center mb-12" />
				<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create your own Marvel Character. Get your character's quotes.</h2>
				<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-yellow-300">Also can delete them from your profile!</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a href="/register" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-red-700 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
					<a href="https://marvel.fandom.com/wiki/Marvel_Database" className="text-sm font-semibold leading-6 text-white rounded-md px-2.5 py-1.5 hover:outline hover:outline-2" target="_blank" rel="noopener noreferrer">Learn more <span aria-hidden="true">→</span></a>
				</div>
			</div>
      </div>
    </div>
  );
};
