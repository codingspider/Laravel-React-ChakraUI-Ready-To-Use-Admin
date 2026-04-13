import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Flex,
    IconButton,
    Avatar,
    HStack,
    VStack,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    Select,
    useColorMode,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiMenu, FiChevronDown } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { LanguageContext } from "../../LanguageProvider";
import { useTranslation } from "react-i18next";

const TopNav = ({ onOpen }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { lang, changeLanguage } = useContext(LanguageContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", role: "" });

    useEffect(() => {
        setUser({
            name: localStorage.getItem("name") || "",
            role: localStorage.getItem("role") || "",
        });
    }, []);

    const handleLogout = async () => {
        await logoutUser(navigate);
    };

    return (
        <Flex
            ml={{ base: 0, md: "238px" }}
            px={4}
            height="60px"
            alignItems="center"
            justifyContent="space-between"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            position="sticky"
            top="0"
            zIndex="1000"
        >
            {/* MOBILE MENU BUTTON */}
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                icon={<FiMenu />}
                variant="outline"
                aria-label="Open Menu"
            />

            {/* TITLE */}
            <Text fontSize="lg" fontWeight="bold">
                Dashboard
            </Text>

            {/* RIGHT SIDE */}
            <HStack spacing={4}>

                {/* DARK MODE */}
                <IconButton
                    aria-label="Toggle color mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                />

                {/* LANGUAGE */}
                <Select
                    value={lang}
                    onChange={(e) => changeLanguage(e.target.value)}
                    w="120px"
                    display={{ base: "none", md: "block" }}
                >
                    <option value="en">English</option>
                    <option value="bn">বাংলা</option>
                </Select>

                {/* USER MENU */}
                <Menu>
                    <MenuButton>
                        <HStack>
                            <Avatar size="sm" name={user.name} />

                            <VStack
                                display={{ base: "none", md: "flex" }}
                                spacing="0"
                                align="flex-start"
                            >
                                <Text fontSize="sm">{user.name}</Text>
                            </VStack>

                            <FiChevronDown />
                        </HStack>
                    </MenuButton>

                    <MenuList>
                        <MenuItem onClick={handleLogout}>
                            {t("logout")}
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
};

export default TopNav;