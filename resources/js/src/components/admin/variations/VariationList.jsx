import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    SimpleGrid,
    Td,
    Box,
    useToast,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { Link as ReactRouterLink } from "react-router-dom";
import api from "../../../axios";
import TanStackTable from "../../../TanStackTable";
import { useCurrencyFormatter } from '../../../useCurrencyFormatter';
import { DELETE_VARIATION, LIST_VARIATION } from "../../../routes/apiRoutes";
import { ADMIN_DASHBOARD_PATH, VARIATION_ADD_PATH, VARIATION_EDIT_PATH } from "../../../routes/adminRoutes";

export default function VariationList() {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const { formatAmount, currency } = useCurrencyFormatter(); 

    // Fetch data whenever page or search changes
    const fetchAddons = async () => {
        try {
            setIsLoading(true);
            // Browser online: request server data with pagination & filter
            const res = await api.get(LIST_VARIATION, {
                params: {
                    page: pageIndex + 1,
                    per_page: pageSize,
                    search: globalFilter || "",
                },
            });

            const variations = res.data?.data?.data || [];
            const total = res.data?.data?.total || variations.length;

            // Update table
            setData(variations);
            setPageCount(Math.ceil(total / pageSize));
        } catch (err) {
            console.error("fetchAddons error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const app_name = localStorage.getItem('app_name');
        document.title = `${app_name} | Variation List`;
        fetchAddons();
    }, [pageIndex, globalFilter]);

    const deleteVariation = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Data will be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        });

        if (result.isConfirmed) {
            try {
                await api.delete(DELETE_VARIATION(id));
                toast({
                    position: "bottom-right",
                    title: "Data deleted successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                fetchAddons();
            } catch (error) {
                console.log(error);
                toast({
                    position: "bottom-right",
                    title: "Error deleting data",
                    description:
                        error.response?.data?.message ||
                        "Something went wrong.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const columns = [
        { header: t("sl"), cell: ({ row }) => row.index + 1},
        { header: t('name'), accessorKey: "name"},
        {
        header: t('items'),
        accessorKey: "variation_items",
            cell: ({ row }) => {
                const items = row.original.variation_items;
                return (
                    <Box>
                        {Array.isArray(items) ? items.map((i) => <Box
                        key={i.id}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        shadow="sm"
                        bg="white"
                        _dark={{ bg: "gray.700" }}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        minW="20px"
                        mb={2}
                    >
                    <Box fontWeight="semibold" fontSize="sm">
                        {i.name}
                    </Box>
                    <Box fontSize="xs" color="gray.500">
                        {formatAmount(i.price)}
                    </Box>
                </Box>
                ) : <Box>{items?.name}</Box>}
                    </Box>
                );
            }
        },
        { header: t('branches'), accessorFn: (row) => row.branch ? row.branch.name : ''},
        {
            header: "Actions",
            cell: ({ row }) => (
                <>
                    <Box display="flex" gap={2}>
                        <ChakraLink
                            border="1px solid black"
                            padding={2}
                            borderRadius="md"
                            onClick={() =>
                                navigate(VARIATION_EDIT_PATH(row.original.id), {
                                    state: { variation: row.original }
                                })
                            }
                        >
                            <EditIcon />
                        </ChakraLink>

                        <ChakraLink
                            border="1px solid black"
                            padding={2}
                            borderRadius="md"
                            cursor="pointer"
                            onClick={() => deleteVariation(row.original.id)}
                        >
                            <DeleteIcon color="red.500" />
                        </ChakraLink>
                    </Box>
                </>
            ), enableColumnFilter: false,
        },
    ];

    return (
        <>
            {/* Breadcrumb */}
            <Card mb={5}>
                <CardBody>
                    <Breadcrumb fontSize={{ base: "sm", md: "md" }}>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to={ADMIN_DASHBOARD_PATH}
                            >
                                {t("dashboard")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to={VARIATION_ADD_PATH}
                            >
                                {t("add")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, md: 1 }} mt={5}>
                <Card>
                    <CardBody>
                        <TanStackTable
                            columns={columns}
                            data={data}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            setPageIndex={setPageIndex}
                            pageCount={pageCount}
                            isLoading={isLoading}
                            addURL={VARIATION_ADD_PATH}
                        />
                    </CardBody>
                </Card>
            </SimpleGrid>
        </>
    );
}
