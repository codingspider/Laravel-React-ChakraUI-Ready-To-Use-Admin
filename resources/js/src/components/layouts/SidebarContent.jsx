import React, { useState } from "react";
import {
    FcHome,
    FcSettings,
    FcShop,
    FcList,
    FcOk,
    FcMoneyTransfer,
    FcServices,
    FcCurrencyExchange,
    FcBarChart,
    FcSupport,
    FcAdvance,
    FcShipped,
    FcReadingEbook,
    FcAddDatabase,
    FcMindMap,
    FcManager,
    FcConferenceCall,
    FcSalesPerformance,
    FcWorkflow,
} from "react-icons/fc";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Icon,
    CloseButton,
    Collapse,
    useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BUSINESS_ADD_PATH, BUSINESS_EDIT_PATH, BUSINESS_LIST_PATH, PLAN_LIST_PATH, SUPERADMIN_DASHBOARD_PATH, USER_LIST_PATH } from "../../routes/superAdminRoutes";
import { ADMIN_DASHBOARD_PATH, BRANCH_LIST_PATH, GENERAL_PAGE_PATH } from "../../routes/adminRoutes";


const SidebarContent = ({ onClose, ...rest }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState({
        expense: false,
        services: false,
        payments: false,
        reports: false,
        tools: false,
    });
    const location = useLocation();

    const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

    const sidebarBg = useColorModeValue("white", "gray.900");
    const activeBg = useColorModeValue("teal.500", "teal.700");
    const activeColor = "white";
    const hoverBg = useColorModeValue("teal.400", "teal.600");
    const subBg = useColorModeValue("gray.50", "gray.800");
    const role = localStorage.getItem('role');

    const isActive = (path) => location.pathname === path;

    return (
        <Box
            bg={sidebarBg}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="100vh"
            overflowY="auto"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton
                    size="sm"
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>

            {role === 'superadmin' && (
                <>
                    <NavLink
                    to={SUPERADMIN_DASHBOARD_PATH}
                    icon={FcHome}
                    activeBg={activeBg}
                    activeColor={activeColor}
                    hoverBg={hoverBg}
                    active={isActive(SUPERADMIN_DASHBOARD_PATH)}
                    label={t("dashboard")}
                />
                <NavLink
                    to={PLAN_LIST_PATH}
                    icon={FcMoneyTransfer}
                    activeBg={activeBg}
                    activeColor={activeColor}
                    hoverBg={hoverBg}
                    active={isActive(PLAN_LIST_PATH)}
                    label={t("subscription_plan")}
                />
                <NavLink
                    to={BUSINESS_LIST_PATH}
                    icon={FcShop}
                    activeBg={activeBg}
                    activeColor={activeColor}
                    hoverBg={hoverBg}
                    active={isActive(BUSINESS_LIST_PATH)}
                    label={t("business")}
                />
                </>
            )}
            
            {role === 'admin' && (
                <>
                    <NavLink
                        to={ADMIN_DASHBOARD_PATH}
                        icon={FcHome}
                        activeBg={activeBg}
                        activeColor={activeColor}
                        hoverBg={hoverBg}
                        active={isActive(ADMIN_DASHBOARD_PATH)}
                        label={t("dashboard")}
                    />
                    {/* ----- Dropdown: user management ----- */}
                    <DropdownHeader
                        label={t("settings")}
                        icon={FcServices}
                        isOpen={ open.settings }
                        onToggle={() => toggle("settings")}
                        hoverBg={hoverBg}
                    />
                    <Collapse
                        in={
                            open.settings 
                        }
                        animateOpacity
                    >
                        <Box ml="8" mt="1" borderRadius="md">
                            <NavLink
                                to={BRANCH_LIST_PATH}
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive(BRANCH_LIST_PATH)}
                                label={t("branches")}
                                small
                            />
                            <NavLink
                                to={GENERAL_PAGE_PATH}
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive(GENERAL_PAGE_PATH)}
                                label={t("general")}
                                small
                            />
                            <NavLink
                                to="/super/admin/expense/create"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/expense/create")}
                                label={t("payments")}
                                small
                            />
                            <NavLink
                                to="/super/admin/expense/create"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/expense/create")}
                                label={t("access")}
                                small
                            />
                        </Box>
                    </Collapse>
                    
                    {/* items menus */}
                    <DropdownHeader
                        label={t("items")}
                        icon={FcList}
                        isOpen={ open.items }
                        onToggle={() => toggle("items")}
                        hoverBg={hoverBg}
                    />
                    <Collapse
                        in={
                            open.items 
                        }
                        animateOpacity
                    >
                        <Box ml="8" mt="1" borderRadius="md">
                            <NavLink
                                to={USER_LIST_PATH}
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive(USER_LIST_PATH)}
                                label={t("categories")}
                                small
                            />
                            <NavLink
                                to="/super/admin/expense"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/expense")}
                                label={t("items")}
                                small
                            />
                            <NavLink
                                to="/super/admin/expense/create"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/expense/create")}
                                label={t("addons")}
                                small
                            />
                            <NavLink
                                to="/super/admin/expense/create"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/expense/create")}
                                label={t("variations")}
                                small
                            />
                        </Box>
                    </Collapse>


                    {/* ----- Dropdown: Reports ----- */}
                    <DropdownHeader
                        label={t("reports")}
                        icon={FcBarChart}
                        isOpen={
                            open.reports ||
                            location.pathname.startsWith("/super/admin/reports")
                        }
                        onToggle={() => toggle("reports")}
                        hoverBg={hoverBg}
                    />
                    <Collapse
                        in={
                            open.reports ||
                            location.pathname.startsWith("/super/admin/reports")
                        }
                        animateOpacity
                    >
                        <Box ml="8" mt="1" borderRadius="md">
                            <NavLink
                                to="/super/admin/reports/sales"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/reports/sales")}
                                label={t("sales_report")}
                                small
                            />
                            <NavLink
                                to="/super/admin/reports/sales"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/reports/sales")}
                                label={t("sales_summery")}
                                small
                            />
                            <NavLink
                                to="/super/admin/reports/sales"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/reports/sales")}
                                label={t("order_history")}
                                small
                            />
                            <NavLink
                                to="/super/admin/reports/expense"
                                icon={FcWorkflow}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/reports/expense")}
                                label={t("expense_report")}
                                small
                            />
                        </Box>
                    </Collapse>


                    {/* ----- Dropdown: pickup order ----- */}
                    <DropdownHeader
                        label={t("pick_up")}
                        icon={FcReadingEbook}
                        isOpen={
                            open.pickup ||
                            location.pathname.startsWith("/super/admin/pickup/request")
                        }
                        onToggle={() => toggle("pickup")}
                        hoverBg={hoverBg}
                    />
                    <Collapse
                        in={
                            open.pickup ||
                            location.pathname.startsWith("/super/admin/pickup/request")
                        }
                        animateOpacity
                    >
                        <Box ml="8" mt="1" borderRadius="md">
                            <NavLink
                                to="/super/admin/tools/import"
                                icon={null}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/tools/import")}
                                label={t("pickup_request")}
                                small
                            />
                            <NavLink
                                to="/super/admin/tools/logs"
                                icon={null}
                                activeBg={activeBg}
                                activeColor={activeColor}
                                hoverBg={hoverBg}
                                active={isActive("/super/admin/tools/logs")}
                                label="System Logs"
                                small
                            />
                        </Box>
                    </Collapse>


                    <NavLink
                        to="/super/admin/backup"
                        icon={FcAddDatabase}
                        activeBg={activeBg}
                        activeColor={activeColor}
                        hoverBg={hoverBg}
                        active={isActive("/super/admin/backup")}
                        label={t("backup")}
                    />
                    <NavLink
                        to="/super/admin/login/history"
                        icon={FcMindMap}
                        activeBg={activeBg}
                        activeColor={activeColor}
                        hoverBg={hoverBg}
                        active={isActive("/super/admin/login/history")}
                        label={t("login_history")}
                    />
                </>
            )}
        </Box>
    );
};

export default SidebarContent;

/* ---------- Helpers without .map() ---------- */

const NavLink = ({
    to,
    icon,
    label,
    active,
    activeBg,
    activeColor,
    hoverBg,
    small,
}) => (
    <Box
        mt={2}
        as={RouterLink}
        to={to}
        display="flex"
        alignItems="center"
        p={small ? "2" : "2"}
        pl={small ? "1" : "2"}
        mx="4"
        borderRadius="lg"
        fontSize={small ? "sm" : "md"}
        fontWeight="medium"
        bg={active ? activeBg : "transparent"}
        color={active ? activeColor : "inherit"}
        _hover={{ bg: hoverBg, color: "white" }}
    >
        {icon && <Icon boxSize={5} as={icon} mr="2" />}
        {label}
    </Box>
);

const DropdownHeader = ({ label, icon, isOpen, onToggle, hoverBg }) => (
    <Box
        mt={2}
        display="flex"
        alignItems="center"
        p="2"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        fontWeight="medium"
        _hover={{ bg: hoverBg, color: "white" }}
        onClick={onToggle}
    >
        <Icon boxSize={5} as={icon} mr="2" />
        {label}
    </Box>
);
