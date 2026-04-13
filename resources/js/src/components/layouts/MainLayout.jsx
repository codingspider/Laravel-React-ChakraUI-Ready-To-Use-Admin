import React, { useState } from "react";
import {
    Box,
    Drawer,
    DrawerContent,
    useDisclosure,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";

import TopNav from "./TopNav";
import SidebarContent from "./SidebarContent";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [collapsed, setCollapsed] = useState(false);

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>

            {/* ================= DESKTOP SIDEBAR ================= */}
            {!isMobile && (
                <SidebarContent
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            )}

            {/* ================= MOBILE DRAWER ================= */}
            {isMobile && (
                <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
                    <DrawerContent maxW="225px">
                        <SidebarContent
                            onClose={onClose}
                            collapsed={false}
                        />
                    </DrawerContent>
                </Drawer>
            )}

            {/* ================= TOP NAV ================= */}
            <TopNav
                onOpen={onOpen}
                collapsed={collapsed}
            />

            {/* ================= CONTENT ================= */}
            <Box
                ml={
                    isMobile
                        ? 0
                        : collapsed
                            ? "80px"
                            : "238px"
                }
                p={6}
                transition="0.3s"
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;