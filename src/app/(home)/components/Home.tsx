"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Search, ShoppingCart, User, ChevronRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const session = useSession();

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-highlight text-highlight-foreground shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              E-Shop
            </Link>
            <div className="flex items-center space-x-4">
              <form className="hidden sm:flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-64 bg-primary-foreground text-primary"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="icon"
                  className="ml-2"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (session.status !== "authenticated") {
                    router.push("/login");
                  } else {
                    signOut({
                      redirect: false,
                    });
                    router.push("/login");
                    router.refresh();
                  }
                }}
                className="hidden sm:flex items-center"
              >
                <User className="h-6 w-6 mr-2" />
                {session.status === "authenticated" ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Wireless Earbuds", "Smart Watch", "Laptop", "Smartphone"].map(
              (product, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="bg-muted h-48 mb-4"></div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{product}</CardTitle>
                    <p className="text-muted-foreground mb-4">
                      High-quality tech for your everyday needs.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Electronics", "Clothing", "Home & Garden", "Toys"].map(
              (category, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category}
                      <ChevronRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                  </CardHeader>
                </Card>
              )
            )}
          </div>
        </section>

        <section className="mb-12">
          <Card className="bg-secondary text-secondary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Special Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Get 20% off on all products this week!</p>
              <Button variant="outline">Shop Now</Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p>
                E-Shop is your one-stop destination for all your shopping needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="mr-2" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
