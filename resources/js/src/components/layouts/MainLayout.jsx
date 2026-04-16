import React, { useState } from 'react';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import TopNav from './TopNav';
import Dashboard from '../dashboard/Dashboard';
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const sidebarW = isCollapsed ? '80px' : '260px';

    return (
        <Flex h="100vh" overflow="hidden">
            {/* Sidebar */}
            <SidebarContent 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />

            {/* Main Area */}
            <Box flex="1" ml={{ base: 0, lg: sidebarW }} transition="margin-left 0.3s ease" overflowY="auto">
                {/* Top Navigation */}
                <TopNav onMobileMenuOpen={() => setIsMobileOpen(true)} />
                
                {/* Dashboard Main Content */}
                <Box p={5}>
                <Outlet> </Outlet>
                </Box>
            </Box>
        </Flex>
    );
}