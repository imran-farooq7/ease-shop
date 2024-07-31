"use client";
import { signIn, signOut } from "next-auth/react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
interface Props {
	user: User;
}

const Navbar = ({ user }: Props) => {
	return (
		<nav className="flex justify-between mt-5 items-center">
			<Link href={"/"}>
				<Image
					src={"/shopease.png"}
					width={100}
					height={100}
					alt="logo"
					className="object-cover"
				/>
			</Link>
			<ul className="flex items-center gap-5">
				<li>
					{!user && (
						<button
							className="bg-cyan-500 px-7 py-3 rounded-lg text-white"
							onClick={() => signIn("google")}
						>
							Sign In
						</button>
					)}
					{user && (
						<Image
							src={user.image!}
							width={40}
							height={40}
							alt={user.name!}
							className="rounded-full"
						/>
					)}
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
