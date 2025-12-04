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
import { DELETE_ADDON, LIST_ADDON } from "../../../routes/apiRoutes";
import { ADDON_ADD_PATH, ADDON_EDIT_PATH, ADMIN_DASHBOARD_PATH } from "../../../routes/adminRoutes";
import { useCurrencyFormatter } from './../../../useCurrencyFormatter';

export default function AddonList() {
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
            const res = await api.get(LIST_ADDON, {
                params: {
                    page: pageIndex + 1,
                    per_page: pageSize,
                    search: globalFilter || "",
                },
            });

            const ingredients = res.data?.data?.data || [];
            const total = res.data?.data?.total || ingredients.length;

            // Update table
            setData(ingredients);
            setPageCount(Math.ceil(total / pageSize));
        } catch (err) {
            console.error("fetchAddons error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const app_name = localStorage.getItem('app_name');
        document.title = `${app_name} | Addon List`;
        fetchAddons();
    }, [pageIndex, globalFilter]);

    const deleteAddon = async (id) => {
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
                await api.delete(DELETE_ADDON(id));
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
        { header: t('price'), accessorFn: (row) => formatAmount(row.price)},
        { header: t('branches'), accessorFn: (row) => (row.branch.name)},
        { header: t('is_active'), accessorFn: (row) => row.is_active ? 'Active' : ''},
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
                                navigate(ADDON_EDIT_PATH(row.original.id), {
                                    state: { addon: row.original }
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
                            onClick={() => deleteAddon(row.original.id)}
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
                                to={ADDON_ADD_PATH}
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
                            addURL={ADDON_ADD_PATH}
                        />
                    </CardBody>
                </Card>
            </SimpleGrid>
        </>
    );
}
