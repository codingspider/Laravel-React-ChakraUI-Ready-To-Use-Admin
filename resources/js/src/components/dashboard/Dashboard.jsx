import React, { useState } from 'react';
import {
    Box, Flex, Grid, Text, Heading, Icon, Avatar, Badge,
    Button, Table, Thead, Tbody, Tr, Th, Td,
    HStack, VStack, Divider, Select, useColorModeValue
} from '@chakra-ui/react';
import {
    TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreHorizontal,
    UserPlus, CreditCard, Package,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const statsData = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: TrendingUp },
    { title: 'Subscriptions', value: '+2,350', change: '+15.5%', trend: 'up', icon: Users },
    { title: 'Sales', value: '+12,234', change: '-4.5%', trend: 'down', icon: ShoppingCart },
    { title: 'Active Now', value: '573', change: '+2.1%', trend: 'up', icon: TrendingUp },
];

const lineChartData = [
    { name: 'Jan', revenue: 4000, profit: 2400 }, { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 5000, profit: 3800 }, { name: 'Apr', revenue: 4500, profit: 3908 },
    { name: 'May', revenue: 6000, profit: 4800 }, { name: 'Jun', revenue: 5500, profit: 3800 },
];

const barChartData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 }, { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 }, { name: 'Sun', sales: 3490 },
];

const pieChartData = [{ name: 'Desktop', value: 400 }, { name: 'Mobile', value: 300 }, { name: 'Tablet', value: 200 }];
const COLORS = ['#0D9488', '#F59E0B', '#8B5CF6'];

const tableData = [
    { id: '#3210', customer: 'Olivia Martin', email: 'olivia@email.com', status: 'Completed', date: '2023-10-01', amount: '$1,999.00' },
    { id: '#3211', customer: 'Jackson Lee', email: 'jackson@email.com', status: 'Pending', date: '2023-10-02', amount: '$39.00' },
    { id: '#3212', customer: 'Isabella Nguyen', email: 'isabella@email.com', status: 'Completed', date: '2023-10-03', amount: '$299.00' },
    { id: '#3213', customer: 'William Kim', email: 'will@email.com', status: 'Failed', date: '2023-10-04', amount: '$99.00' },
    { id: '#3214', customer: 'Sofia Davis', email: 'sofia@email.com', status: 'Completed', date: '2023-10-05', amount: '$39.00' },
];

const recentActivity = [
    { icon: UserPlus, text: 'New user registered', time: '2 mins ago', color: 'blue.500' },
    { icon: CreditCard, text: 'Payment received from John', time: '1 hour ago', color: 'green.500' },
    { icon: Package, text: 'Order #1234 shipped successfully', time: '3 hours ago', color: 'purple.500' },
    { icon: Users, text: 'Team member updated project', time: 'Yesterday', color: 'orange.500' },
];

// --- INTERNAL COMPONENTS ---
const StatCard = ({ title, value, change, trend, icon }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const shadow = useColorModeValue('soft', 'softDark');
    return (
        <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} transition="all 0.2s" _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}>
            <Flex justify="space-between" align="flex-start">
                <Box>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium" mb="1">{title}</Text>
                    <Heading size="lg" fontWeight="bold">{value}</Heading>
                </Box>
                <Flex bg={useColorModeValue('brand.50', 'brand.900')} p="3" borderRadius="xl">
                    <Icon as={icon} boxSize={6} color="brand.600" />
                </Flex>
            </Flex>
            <Flex align="center" mt="4" gap="1">
                <Icon as={trend === 'up' ? ArrowUpRight : ArrowDownRight} boxSize={4} color={trend === 'up' ? 'green.500' : 'red.500'} />
                <Text fontSize="sm" fontWeight="600" color={trend === 'up' ? 'green.500' : 'red.500'}>{change}</Text>
                <Text fontSize="xs" color="gray.500" ml="1">from last month</Text>
            </Flex>
        </Box>
    );
};

export default function Dashboard() {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [filterStatus, setFilterStatus] = useState('All');

    const bg = useColorModeValue('white', 'gray.800');
    const shadow = useColorModeValue('soft', 'softDark');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const tooltipBg = useColorModeValue('white', 'gray.800');

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const filteredTableData = tableData.filter(row => filterStatus === 'All' || row.status === filterStatus);

    return (
        <Box p={{ base: 4, md: 8 }} position="relative" zIndex="1" bg={useColorModeValue('gray.50', 'gray.900')} minH="calc(100vh - 73px)">

            <Flex justify="space-between" align="center" mb="8">
                <Box>
                    <Heading size="xl" fontWeight="bold">Dashboard</Heading>
                    <Text color="gray.500" fontSize="sm" mt="1">Welcome back! Here's an overview of your store.</Text>
                </Box>
                <Button variant="primary" leftIcon={<Icon as={TrendingUp} boxSize={4} />} display={{ base: 'none', md: 'flex' }}>Download Report</Button>
            </Flex>

            {/* STATS GRID */}
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap="6" mb="8">
                {statsData.map((stat, i) => <StatCard key={i} {...stat} />)}
            </Grid>

            {/* CHARTS ROW 1 */}
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap="6" mb="8">
                <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} border="1px" borderColor={borderColor}>
                    <Flex justify="space-between" align="center" mb="6">
                        <Box><Heading size="md" fontWeight="bold">Revenue Overview</Heading><Text fontSize="sm" color="gray.500">Monthly revenue and profit</Text></Box>
                        <Button variant="secondary" size="sm">View All</Button>
                    </Flex>
                    <Box h="300px">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue('#f0f0f0', '#2D3748')} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#0d9488' }} />
                                <Line type="monotone" dataKey="profit" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#8B5CF6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} border="1px" borderColor={borderColor}>
                    <Heading size="md" fontWeight="bold" mb="2">Traffic Sources</Heading>
                    <Text fontSize="sm" color="gray.500" mb="6">Where your visitors come from</Text>
                    <Box h="200px" mb="6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                    <VStack spacing="3" align="stretch">
                        {pieChartData.map((entry, index) => (
                            <Flex key={entry.name} justify="space-between" align="center">
                                <HStack><Box w="3" h="3" borderRadius="full" bg={COLORS[index]} /><Text fontSize="sm" fontWeight="medium">{entry.name}</Text></HStack>
                                <Text fontSize="sm" fontWeight="bold">{entry.value}</Text>
                            </Flex>
                        ))}
                    </VStack>
                </Box>
            </Grid>

            {/* CHARTS ROW 2 + ACTIVITY */}
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="6" mb="8">
                <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} border="1px" borderColor={borderColor}>
                    <Flex justify="space-between" align="center" mb="6">
                        <Box><Heading size="md" fontWeight="bold">Sales this week</Heading><Text fontSize="sm" color="gray.500">Daily breakdown</Text></Box>
                        <Button variant="ghost" p="2" borderRadius="lg"><Icon as={MoreHorizontal} boxSize={5} /></Button>
                    </Flex>
                    <Box h="250px">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData} barSize={32} borderRadius={[6, 6, 0, 0]}>
                                <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue('#f0f0f0', '#2D3748')} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '12px' }} cursor={{ fill: useColorModeValue('#f5f5f5', '#2a2a2a') }} />
                                <Bar dataKey="sales" fill="#0d9488" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} border="1px" borderColor={borderColor}>
                    <Flex justify="space-between" align="center" mb="6">
                        <Heading size="md" fontWeight="bold">Recent Activity</Heading>
                        <Button variant="secondary" size="sm">View All</Button>
                    </Flex>
                    <VStack spacing="0" align="stretch">
                        {recentActivity.map((item, index) => (
                            <React.Fragment key={index}>
                                <Flex gap="4" p="3" borderRadius="lg" _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }} transition="0.2s">
                                    <Flex bg={useColorModeValue(`${item.color}.10`, `${item.color}.20`)} p="2" borderRadius="lg" flexShrink={0}>
                                        <Icon as={item.icon} boxSize={4} color={item.color} />
                                    </Flex>
                                    <Box flex="1">
                                        <Text fontSize="sm" fontWeight="medium">{item.text}</Text>
                                        <Text fontSize="xs" color="gray.500" mt="0.5">{item.time}</Text>
                                    </Box>
                                </Flex>
                                {index < recentActivity.length - 1 && <Divider borderColor={borderColor} />}
                            </React.Fragment>
                        ))}
                    </VStack>
                </Box>
            </Grid>

            {/* DATA TABLE */}
            <Box bg={bg} p="6" borderRadius="xl" boxShadow={shadow} border="1px" borderColor={borderColor}>
                <Flex justify="space-between" align="center" mb="6" wrap="wrap" gap="4">
                    <Box><Heading size="md" fontWeight="bold">Recent Orders</Heading><Text fontSize="sm" color="gray.500">List of latest transactions</Text></Box>
                    <HStack>
                        <Select maxW="40" size="sm" borderRadius="lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} focusBorderColor="brand.500">
                            <option>All Status</option><option>Completed</option><option>Pending</option><option>Failed</option>
                        </Select>
                        <Button variant="danger" size="sm" leftIcon={<Icon as={ShoppingCart} boxSize={4} />}>Export</Button>
                    </HStack>
                </Flex>

                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {['id', 'customer', 'status', 'date', 'amount'].map((key) => (
                                    <Th key={key} textTransform="capitalize" onClick={() => requestSort(key)} cursor="pointer" _hover={{ color: 'brand.500' }} pb="4" fontSize="xs" fontWeight="600" color="gray.500" borderColor={borderColor}>
                                        {key} {sortConfig.key === key && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredTableData.map((row) => (
                                <Tr key={row.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }} transition="0.2s" cursor="pointer">
                                    <Td fontWeight="medium" fontSize="sm" borderColor={borderColor}>{row.id}</Td>
                                    <Td borderColor={borderColor}>
                                        <HStack><Avatar size="xs" name={row.customer} /><Box><Text fontSize="sm" fontWeight="medium">{row.customer}</Text><Text fontSize="xs" color="gray.500">{row.email}</Text></Box></HStack>
                                    </Td>
                                    <Td borderColor={borderColor}>
                                        <Badge variant="subtle" colorScheme={row.status === 'Completed' ? 'green' : row.status === 'Pending' ? 'yellow' : 'red'} borderRadius="full" px="2.5" py="0.5" fontSize="xs" fontWeight="600">{row.status}</Badge>
                                    </Td>
                                    <Td fontSize="sm" color="gray.500" borderColor={borderColor}>{row.date}</Td>
                                    <Td fontWeight="600" fontSize="sm" borderColor={borderColor}>{row.amount}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>

                <Flex justify="space-between" align="center" mt="6" pt="4" borderTop="1px" borderColor={borderColor}>
                    <Text fontSize="sm" color="gray.500">Showing 1 to 5 of 124 results</Text>
                    <HStack spacing="2">
                        <Button variant="secondary" size="sm" p="2"><Icon as={ChevronLeft} boxSize={4} /></Button>
                        <Button variant="secondary" size="sm" p="2"><Icon as={ChevronLeft} boxSize={4} /></Button>
                        <Button variant="primary" size="sm" minW="32px">1</Button>
                        <Button variant="secondary" size="sm" minW="32px">2</Button>
                        <Button variant="secondary" size="sm" minW="32px">3</Button>
                        <Button variant="secondary" size="sm" p="2"><Icon as={ChevronRight} boxSize={4} /></Button>
                        <Button variant="secondary" size="sm" p="2"><Icon as={ChevronRight} boxSize={4} /></Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}