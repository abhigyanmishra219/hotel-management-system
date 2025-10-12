"use client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { UserContext } from "./context/user-context";
import Image from "next/image";
import LogoutButton from "./logout";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-3 border-b shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200">
          <Image
            fill
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5OwSnn8pHhTi5O0ZA65rlcQaOQQIjZvnv3w&s"
            alt="Hotel Logo"
            className="object-cover"
          />
        </div>
        <Text size="5" weight="bold" className="tracking-tight text-gray-800">
          Hotel Management
        </Text>
      </div>

      <Flex gap="4" align="center">
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg"
          variant="surface"
        >
          <Flex gap="3" align="center" px="3" py="2">
            <Avatar
              size="3"
              src={""}
              radius="full"
              fallback={user?.name?.charAt(0) || "U"}
            />
            <Box>
              <Text
                as="div"
                size="2"
                weight="bold"
                className="truncate text-gray-800"
              >
                {user?.name || "User"}
              </Text>
              <Text
                as="div"
                size="2"
                color="gray"
                className="capitalize text-gray-500"
              >
                {user?.role || "staff"}
              </Text>
            </Box>
          </Flex>
        </Card>

        <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition">
          <LogOut size={16} />
          <LogoutButton />
        </span>
      </Flex>
    </header>
  );
}
