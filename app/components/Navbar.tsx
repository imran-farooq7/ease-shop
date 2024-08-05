"use client";
import { signIn, signOut } from "next-auth/react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/CartProvider";
import Cart from "./Cart";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
	user: User;
}

const Navbar = ({ user }: Props) => {
	const { isOpen, cart, toggleCart } = useCartStore();
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
				<li onClick={() => toggleCart()} className="relative cursor-pointer">
					<AiFillShopping size={30} />
					<AnimatePresence>
						{cart.length > 0 && (
							<motion.span
								animate={{ scale: 1 }}
								initial={{ scale: 0 }}
								exit={{ scale: 0 }}
								className="absolute flex items-center justify-center font-bold bg-teal-700 text-sm text-white rounded-full w-5 h-5 left-4 bottom-4"
							>
								{cart.length}
							</motion.span>
						)}
					</AnimatePresence>
				</li>
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
						<div className="flex gap-3 items-center">
							<Image
								src={user.image!}
								width={40}
								height={40}
								alt={user.name!}
								className="rounded-full"
							/>
							<button
								className="bg-red-400 px-6 py-3 rounded-lg text-white text-sm hover:bg-red-600"
								onClick={() => signOut()}
							>
								Sign Out
							</button>
						</div>
					)}
				</li>
			</ul>
			<AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
		</nav>
	);
};
export default Navbar;
