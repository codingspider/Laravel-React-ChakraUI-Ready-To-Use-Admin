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
    Divider,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    HStack,
    useToast,
    Flex,
    VStack,
} from "@chakra-ui/react";

import { BsFillTrash3Fill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useNavigate, Link as ReactRouterLink, useLocation } from "react-router-dom";

import {
    ADMIN_DASHBOARD_PATH,
    VARIATION_LIST_PATH
} from "../../../routes/adminRoutes";

import {
    GET_ALL_BRANCHES,
    STORE_VARIATION,
    UPDATE_VARIATION
} from "../../../routes/apiRoutes";

import api from "../../../axios";


const VariationEdit = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const location = useLocation();
    const variation = location.state?.variation;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            branch_id: "",
            lines: [
                { name: "", price: "" }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lines",
    });

    const [branches, setBranches] = useState([]);

    // 🔹 Fetch branches
    const getBranches = async () => {
        const res = await api.get(GET_ALL_BRANCHES);
        setBranches(res.data.data || []);
    };

    useEffect(() => {
        const app_name = localStorage.getItem("app_name");
        document.title = `${app_name} | Variation Create`;
        getBranches();
    }, []);

    useEffect(() => {
      if (variation && branches.length > 0) {
        reset({
          name: variation.name,
          branch_id: String(variation.branch_id),
        });

        variation.variation_items.forEach((item, index) => {
          setValue(`lines.${index}.price`, item.price);
          setValue(`lines.${index}.name`, item.name);
        });
      }
    }, [variation, branches]);

    // 🔹 Submit form
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const res = await api.put(UPDATE_VARIATION(variation.id), data);
            toast({
                position: "bottom-right",
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            reset();
            navigate(VARIATION_LIST_PATH);

        } catch (err) {
            const errorResponse = err?.response?.data;
            const errorMessage =
                errorResponse?.errors
                    ? Object.values(errorResponse.errors).flat().join(" ")
                    : errorResponse?.message || "Something went wrong";

            toast({
                position: "bottom-right",
                title: "Error",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <Card mb={5}>
                <CardBody>
                    <Breadcrumb fontSize={{ base: "sm", md: "md" }}>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={ReactRouterLink} to={ADMIN_DASHBOARD_PATH}>
                                {t("dashboard")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink as={ReactRouterLink} to={VARIATION_LIST_PATH}>
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
                                to={VARIATION_LIST_PATH}
                                display={{ base: "none", md: "inline-flex" }}
                                px={4}
                                py={2}
                            >
                                {t("list")}
                            </Button>
                        </Flex>
                    </CardHeader>

                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Main Fields */}
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel>{t("name")}</FormLabel>
                                    <Input
                                        type="text"
                                        {...register("name", { required: true })}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>{t("branches")}</FormLabel>
                                    <Select placeholder="Select" {...register("branch_id")}>
                                      {branches.map(branch => (
                                        <option key={branch.id} value={String(branch.id)}>
                                          {branch.name}
                                        </option>
                                      ))}
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            {/* Dynamic Rows */}
                            <VStack spacing={4} align="stretch" mt={6}>
                                {variation.variation_items.map((item, index) => (
                                    <Box key={item.id} p={4} borderWidth={1} borderRadius="md">
                                        <HStack spacing={4}>

                                            <FormControl>
                                                <FormLabel>{t("name")}</FormLabel>
                                                <Input
                                                    type="text"
                                                    
                                                    {...register(`lines.${index}.name`, {
                                                        required: true
                                                    })}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel>{t("price")}</FormLabel>
                                                <Input
                                                    
                                                    type="number"
                                                    min={1}
                                                    {...register(`lines.${index}.price`, {
                                                        required: true
                                                    })}
                                                />
                                            </FormControl>

                                            {fields.length > 1 && (
                                                <Button
                                                    mt={6}
                                                    colorScheme="red"
                                                    onClick={() => remove(index)}
                                                >
                                                    <BsFillTrash3Fill />
                                                </Button>
                                            )}
                                        </HStack>
                                    </Box>
                                ))}

                                <Button
                                    colorScheme="blue"
                                    onClick={() => append({ name: "", price: "" })}
                                >
                                    {t("add_row")}
                                </Button>

                                <Divider />
                            </VStack>

                            {/* Submit buttons */}
                            <HStack spacing={4} mt={6}>
                                <Button
                                    type="button"
                                    as={ReactRouterLink}
                                    to={VARIATION_LIST_PATH}
                                    colorScheme="orange"
                                >
                                    {t("cancel")}
                                </Button>

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    loadingText="Saving..."
                                    colorScheme="teal"
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

export default VariationEdit;
