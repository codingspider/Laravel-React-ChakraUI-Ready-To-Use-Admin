import React, { useState } from 'react';
import {
    Box, Flex, Text, Heading, Icon, Button, VStack, HStack,
    useColorModeValue, Tooltip
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, ShoppingCart, TrendingUp, Settings,
    ChevronsLeft, ChevronRight
} from 'lucide-react';
import { SUPERADMIN_DASHBOARD_PATH } from '../../routes/superAdminRoutes';

const navItems = [
    { path: SUPERADMIN_DASHBOARD_PATH, icon: LayoutDashboard, label: 'Dashboard' },
    {
        icon: Users, label: 'Management',
        children: [
            { path: '/users', label: 'All Users' },
            { path: '/roles', label: 'Roles & Permissions' },
            { path: '/teams', label: 'Teams' }
        ]
    },
    {
        icon: ShoppingCart, label: 'E-Commerce',
        children: [
            { path: '/products', label: 'Products' },
            { path: '/orders', label: 'Orders' },
            { path: '/inventory', label: 'Inventory' }
        ]
    },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function SidebarContent({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
    const [openMenus, setOpenMenus] = useState({});
    const location = useLocation();

    const bg = useColorModeValue('white', 'gray.800');
    const shadow = useColorModeValue('soft', 'softDark');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const checkActive = (path) => location.pathname === path;

    const toggleMenu = (label) => {
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const renderNavItem = (item, isMobile = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMenus[item.label];
        const isActive = checkActive(item.path);

        // Collapsed Desktop View
        if (!isMobile && isCollapsed) {
            if (hasChildren) {
                return (
                    <Tooltip key={item.label} label={item.label} placement="right" hasArrow>
                        <Flex align="center" justify="center" px="0" py="3" borderRadius="lg" cursor="pointer" color="gray.500" _hover={{ bg: useColorModeValue('gray.100', 'gray.700'), color: 'gray.700' }} transition="0.2s" _dark={{ _hover: { color: 'white' } }}>
                            <Icon as={item.icon} boxSize={5} flexShrink={0} />
                        </Flex>
                    </Tooltip>
                );
            }
            return (
                <Tooltip key={item.label} label={item.label} placement="right" hasArrow>
                    <ChakraLink as={ReactRouterLink} to={item.path} _hover={{ textDecoration: 'none' }}>
                        <Flex align="center" justify="center" px="0" py="3" borderRadius="lg" bg={isActive ? 'brand.50' : 'transparent'} color={isActive ? 'brand.600' : 'gray.500'} _hover={{ bg: isActive ? 'brand.50' : useColorModeValue('gray.100', 'gray.700'), color: isActive ? 'brand.600' : 'gray.700' }} transition="0.2s" _dark={{ _hover: { color: 'white' } }}>
                            <Icon as={item.icon} boxSize={5} flexShrink={0} />
                        </Flex>
                    </ChakraLink>
                </Tooltip>
            );
        }

        // Expanded / Mobile View
        if (hasChildren) {
            return (
                <Box key={item.label} w="100%">
                    <Flex
                        align="center" px="4" py="3" w="100%" borderRadius="lg" cursor="pointer"
                        color="gray.500"
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700'), color: 'gray.700' }}
                        transition="0.2s" fontWeight="500" fontSize="sm"
                        onClick={() => toggleMenu(item.label)}
                        justifyContent="space-between"
                        _dark={{ _hover: { color: 'white' } }}
                    >
                        <HStack spacing="3">
                            <Icon as={item.icon} boxSize={5} flexShrink={0} />
                            <Text>{item.label}</Text>
                        </HStack>
                        <Icon as={ChevronRight} boxSize={4} transition="transform 0.2s ease" transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"} />
                    </Flex>

                    {isOpen && (
                        <VStack spacing="1" pl="12" pt="1" align="stretch">
                            {item.children.map((child) => {
                                const isChildActive = checkActive(child.path);
                                return (
                                    <ChakraLink key={child.path} as={ReactRouterLink} to={child.path} onClick={() => isMobile && setIsMobileOpen(false)} _hover={{ textDecoration: 'none' }}>
                                        <Flex
                                            align="center" px="4" py="2.5" borderRadius="lg" cursor="pointer"
                                            bg={isChildActive ? 'brand.50' : 'transparent'}
                                            color={isChildActive ? 'brand.600' : 'gray.500'}
                                            _hover={{ bg: isChildActive ? 'brand.50' : useColorModeValue('gray.100', 'gray.700'), color: isChildActive ? 'brand.600' : 'gray.700' }}
                                            transition="0.2s" fontSize="sm" fontWeight="normal"
                                            _dark={{ _hover: { color: 'white' } }}
                                        >
                                            <Text>{child.label}</Text>
                                        </Flex>
                                    </ChakraLink>
                                );
                            })}
                        </VStack>
                    )}
                </Box>
            );
        }

        return (
            <Box key={item.label} w="100%">
                <ChakraLink as={ReactRouterLink} to={item.path} onClick={() => isMobile && setIsMobileOpen(false)} _hover={{ textDecoration: 'none' }}>
                    <Flex
                        align="center" px="4" py="3" w="100%" borderRadius="lg" cursor="pointer"
                        bg={isActive ? 'brand.50' : 'transparent'}
                        color={isActive ? 'brand.600' : 'gray.500'}
                        _hover={{ bg: isActive ? 'brand.50' : useColorModeValue('gray.100', 'gray.700'), color: isActive ? 'brand.600' : 'gray.700' }}
                        transition="0.2s" fontWeight="500" fontSize="sm"
                        _dark={{ _hover: { color: 'white' } }}
                    >
                        <HStack spacing="3">
                            <Icon as={item.icon} boxSize={5} flexShrink={0} />
                            <Text>{item.label}</Text>
                        </HStack>
                    </Flex>
                </ChakraLink>
            </Box>
        );
    };

    return (
        <>
            {/* SIDEBAR - Desktop */}
            <Box
                display={{ base: 'none', lg: 'flex' }}
                flexDirection="column"
                w={isCollapsed ? '80px' : '260px'} transition="width 0.3s ease"
                position="fixed" top="0" left="0" h="full" zIndex="10"
                bg={bg} borderRight="1px" borderColor={borderColor}
                boxShadow={shadow}
            >
                <Flex p="4" justify="space-between" align="center" borderBottom="1px" borderColor={borderColor}>
                    {!isCollapsed && <Heading size="md" bgGradient="linear(to-r, brand.600, brand.400)" bgClip="text" fontWeight="800">Acme Inc</Heading>}
                    <Button variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)} p="2" borderRadius="lg">
                        <Icon as={ChevronsLeft} boxSize={5} transform={isCollapsed ? 'rotate(180deg)' : 'none'} transition="0.3s" />
                    </Button>
                </Flex>
                <VStack spacing="1" p="4" flex="1" align="stretch" overflowY="auto" overflowX="hidden">
                    {navItems.map(item => renderNavItem(item, false))}
                </VStack>
            </Box>

            {/* SIDEBAR - Mobile Overlay */}
            {isMobileOpen && (
                <Box position="fixed" top="0" left="0" w="100%" h="100%" bg="blackAlpha.600" zIndex="9998" onClick={() => setIsMobileOpen(false)} transition="opacity 0.3s" />
            )}

            {/* SIDEBAR - Mobile Panel */}
            <Box
                position="fixed" top="0" left="0" w="280px" h="100%" bg={bg} zIndex="9999"
                boxShadow="2xl" display={{ base: "block", lg: "none" }}
                transform={isMobileOpen ? "translateX(0)" : "translateX(-100%)"}
                transition="transform 0.3s ease" onClick={(e) => e.stopPropagation()} overflowY="auto"
            >
                <Flex p="4" justify="space-between" align="center" borderBottom="1px" borderColor={borderColor}>
                    <Heading size="md" bgGradient="linear(to-r, brand.600, brand.400)" bgClip="text" fontWeight="800">Acme Inc</Heading>
                    <Button variant="ghost" onClick={() => setIsMobileOpen(false)} p="2" borderRadius="lg">
                        <Icon as={ChevronsLeft} boxSize={5} />
                    </Button>
                </Flex>
                <VStack spacing="1" p="4" align="stretch">
                    {navItems.map(item => renderNavItem(item, true))}
                </VStack>
            </Box>
        </>
    );
}