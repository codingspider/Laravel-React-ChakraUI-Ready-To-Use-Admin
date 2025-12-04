import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    Heading,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Select,
    InputGroup,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    HStack,
    useToast,
    Flex,
    InputRightElement,
    Switch
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import api from "../../../axios";
import { GET_ALL_BRANCHES, STORE_ADDON } from "../../../routes/apiRoutes";
import { ADDON_LIST_PATH, ADMIN_DASHBOARD_PATH } from "../../../routes/adminRoutes";
import { Controller, useForm } from "react-hook-form"; 

const AddonCreate = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [branches, setBranches] = useState([]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            const res = await api.post(STORE_ADDON, data);
            reset();

            toast({
                position: "bottom-right",
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate(`${ADDON_LIST_PATH}`);
        } catch (err) {
            const errorResponse = err?.response?.data;
            if (errorResponse?.errors) {
                const errorMessage = Object.values(errorResponse.errors)
                    .flat()
                    .join(" ");
                toast({
                    position: "bottom-right",
                    title: "Error",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else if (errorResponse?.message) {
                toast({
                    position: "bottom-right",
                    title: "Error",
                    description: errorResponse.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const getBranches = async () => {
        const res = await api.get(GET_ALL_BRANCHES);
        setBranches(res.data.data);
    }

    useEffect(() => {
        const app_name = localStorage.getItem("app_name");
        document.title = `${app_name} | Addon Create`;
        getBranches();
    }, []);

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
                                to={ADDON_LIST_PATH}
                            >
                                {t("list")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </CardBody>
            </Card>

            <Box>
                <Card shadow="md" borderRadius="2xl">
                    <CardHeader>
                        <Flex mb={4} justifyContent="space-between">
                            <Heading size="md">{t("add")}</Heading>
                            <Button
                                colorScheme="teal"
                                as={ReactRouterLink}
                                to={ADDON_LIST_PATH}
                                display={{ base: "none", md: "inline-flex" }}
                                px={4}
                                py={2}
                                whiteSpace="normal"
                                textAlign="center"
                            >
                                {t("list")}
                            </Button>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            {/* Plan Info */}
                            <SimpleGrid
                                columns={{ base: 1, md: 4 }}
                                spacing={6}
                            >
                                <FormControl isRequired>
                                    <FormLabel>{t("branches")}</FormLabel>
                                    <Select
                                        {...register("branch_id")}
                                        placeholder="Select"
                                    >
                                        {branches.map((branch) => (
                                            <option
                                                key={branch.id}
                                                value={branch.id}
                                            >
                                                {branch.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                
                                <FormControl isRequired>
                                    <FormLabel>{t("name")}</FormLabel>
                                    <Input
                                        {...register("name", {
                                            required: true,
                                        })}
                                        placeholder={t("name")}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>{t("price")}</FormLabel>
                                    <Input
                                        {...register("price", {
                                            required: true,
                                        })}
                                        placeholder={t("price")}
                                    />
                                </FormControl>

                                <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">{t('is_active')}</FormLabel>
                                <Controller
                                    name="is_active"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            colorScheme="teal"
                                            isChecked={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                </FormControl> 


                            </SimpleGrid>

                            <HStack spacing={4} mt={6}>
                                <Button
                                    type="button"
                                    as={ReactRouterLink}
                                    to={ADDON_LIST_PATH}
                                    colorScheme="orange"
                                    size="md"
                                >
                                    {t("cancel")}
                                </Button>

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    loadingText="Saving Data..."
                                    colorScheme="teal"
                                    size="md"
                                >
                                    {t("save")}
                                </Button>
                            </HStack>

                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    );
};

export default AddonCreate;
