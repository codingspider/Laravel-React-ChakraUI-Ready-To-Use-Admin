import React from "react";
import {
    Box,
    Flex,
    Text,
    Icon,
    Collapse,
    useColorModeValue,
    CloseButton,
    Tooltip,
} from "@chakra-ui/react";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { FcHome, FcSettings, FcList } from "react-icons/fc";
import Dashboard from './../superadmin/Dashboard';

const SidebarContent = ({ onClose, collapsed }) => {
    const location = useLocation();

    const sidebarBg = useColorModeValue("teal.800", "teal.900");
    const hoverBg = useColorModeValue("teal.400", "teal.600");
    const activeBg = useColorModeValue("teal.500", "teal.700");

    const isActive = (path) => location.pathname === path;

    return (
        <Box
            w={{ base: "220px", md: collapsed ? "80px" : "238px" }}
            bg={sidebarBg}
            h="100vh"
            position="fixed"
            color="white"
        >

            {/* HEADER */}
            <Flex align="center" justify="space-between" p={4}>
                {!collapsed && (
                    <Text fontSize="xl" fontWeight="bold">
                        MyApp
                    </Text>
                )}

                {onClose && (
                    <CloseButton
                        onClick={onClose}
                        display={{ base: "flex", md: "none" }}
                    />
                )}
            </Flex>

            {/* DASHBOARD */}
            <MenuItem
                icon={FcHome}
                label="Dashboard"
                to={Dashboard}
                active={isActive(Dashboard)}
                collapsed={collapsed}
                activeBg={activeBg}
                hoverBg={hoverBg}
                onClose={onClose}
            />

            {/* SETTINGS */}
            <Dropdown label="Settings" icon={FcSettings} hoverBg={hoverBg}>
                <MenuItem label="Branches" to="/branches" collapsed={collapsed} />
                <MenuItem label="General" to="/general" collapsed={collapsed} />
            </Dropdown>

            {/* ITEMS */}
            <Dropdown label="Items" icon={FcList} hoverBg={hoverBg}>
                <MenuItem label="Categories" to="/categories" collapsed={collapsed} />
                <MenuItem label="Products" to="/products" collapsed={collapsed} />
            </Dropdown>

        </Box>
    );
};

export default SidebarContent;

/* ================= MENU ITEM ================= */

const MenuItem = ({
    icon,
    label,
    to,
    active,
    collapsed,
    activeBg,
    hoverBg,
    onClose,
}) => {
    const content = (
        <Flex
            as={RouterLink}
            to={to}
            onClick={onClose}
            align="center"
            p={3}
            mx={2}
            borderRadius="lg"
            bg={active ? activeBg : "transparent"}
            color={active ? "white" : "inherit"}
            _hover={{ bg: hoverBg, color: "teal" }}
        >
            {icon && <Icon as={icon} boxSize={5} />}
            {!collapsed && <Text ml={3}>{label}</Text>}
        </Flex>
    );

    return collapsed ? (
        <Tooltip label={label}>{content}</Tooltip>
    ) : (
        content
    );
};

/* ================= DROPDOWN ================= */

const Dropdown = ({ label, icon, children, hoverBg }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box>
            <Flex
                align="center"
                p={3}
                mx={2}
                borderRadius="lg"
                cursor="pointer"
                _hover={{ bg: hoverBg, color: "white" }}
                onClick={() => setOpen(!open)}
            >
                <Icon as={icon} boxSize={5} />
                <Text ml={3} flex="1">
                    {label}
                </Text>
                <Icon as={open ? ChevronDownIcon : ChevronRightIcon} />
            </Flex>

            <Collapse in={open}>
                <Box ml={6}>{children}</Box>
            </Collapse>
        </Box>
    );
};