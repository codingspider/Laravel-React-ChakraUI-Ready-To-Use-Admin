import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    SimpleGrid
    
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../../axios";
import { GET_CURRENCIES, GET_OWNER_BUSINESS, GET_TIMEZONES, UPDATE_BUSINESS } from "../../../routes/apiRoutes";
import Select from "react-select";
import { Controller } from "react-hook-form";

const Setting = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [time_zones, setTimeZone] = useState([]);
    const [currencies, setCurrency] = useState([]);
    const [business, setBusiness] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("name", data.name ?? "");
        formData.append("phone", data.phone ?? "");
        formData.append("landmark", data.landmark ?? "");
        formData.append("city", data.city ?? "");
        formData.append("zip", data.zip ?? "");
        formData.append("map_api_key", data.map_api_key ?? "");
        formData.append("center_lat_lon", data.center_lat_lon ?? "");

        // React-Select values must be STRING
        formData.append("timezone_id", String(data.timezone_id ?? ""));
        formData.append("currency_id", String(data.currency_id ?? ""));

        // Files
        if (data.app_logo?.length) {
            formData.append("logo", data.app_logo[0]);
        }

        if (data.fav_icon?.length) {
            formData.append("favicon", data.fav_icon[0]);
        }

        // For Laravel PUT request
        formData.append("_method", "PUT");

        try {
            const res = await api.post(
                UPDATE_BUSINESS(business.id),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast({
                position: "bottom-right",
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (err) {
            const errorResponse = err?.response?.data;
            const errorMessage = errorResponse?.errors
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

        } finally {
            setIsSubmitting(false);
        }
    };



    const getTimeZone = async () => {
        const res = await api.get(GET_TIMEZONES);
        const timezones = res.data.data;

        const formatted = timezones.map(timezone => ({
          value: timezone.id,
          label: timezone.key,
        }));

        setTimeZone(formatted);
    };
    
    const getCurrency = async () => {
        const res = await api.get(GET_CURRENCIES);
        const currency = res.data.data;
        const formatted = currency.map(currency => ({
          value: currency.id,
          label: currency.key,
        }));
        setCurrency(formatted);
    };

    const getBusiness =  async () => {
        const res = await api.get(GET_OWNER_BUSINESS);
        const business = res.data.data;
        setBusiness(business);
        reset({
            name: business.name,
            phone: business.contact_number,
            landmark: business.landmark,
            city: business.city,
            zip: business.zip,
            map_api_key: business.map_api_key,
            center_lat_lon: business.center_lat_lon,
        });
        setValue("currency_id",  business.currency_id);
        setValue("timezone_id",  business.timezone_id,);
    };


    useEffect(() => {
        const app_name = localStorage.getItem("app_name") || "App";
        document.title = `${app_name} | Setting`;

        getTimeZone();
        getCurrency();
        getBusiness();
    }, []);

    
    return (
        <>
            <Box mt={5} mx="auto" p={6} borderWidth={1} borderRadius="lg">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>{t("application_name")}</FormLabel>
                            <Input
                                type="text"
                                {...register("name", { required: true })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t("phone_number")}</FormLabel>
                            <Input
                                type="text"
                                {...register("phone", { required: true })}
                            />
                        </FormControl>


                        <FormControl isRequired>
                            <FormLabel>{t("address")}</FormLabel>
                            <Input
                                type="text"
                                {...register("landmark", { required: true })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t("city")}</FormLabel>
                            <Input
                                type="text"
                                {...register("city", { required: true })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t("zip")}</FormLabel>
                            <Input
                                type="text"
                                {...register("zip", { required: true })}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t("map_api_key")}</FormLabel>
                            <Input
                                type="text"
                                {...register("map_api_key", { required: true })}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t("center_lat_long")}</FormLabel>
                            <Input
                                type="text"
                                {...register("center_lat_lon", { required: true })}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t("timezone")}</FormLabel>

                            <Controller
                                name="timezone_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={time_zones}
                                        value={time_zones.find(option => option.value === field.value) || null}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select"
                                        isSearchable
                                        isClearable
                                    />
                                )}
                            />
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
                        <FormControl>
                            <FormLabel>{t("app_logo")}</FormLabel>
                            <Input type="file" {...register("app_logo")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>{t("fav_icon")}</FormLabel>
                            <Input type="file" {...register("fav_icon")} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t("currency")}</FormLabel>

                            <Controller
                                name="currency_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={currencies}
                                        value={currencies.find(option => option.value === field.value) || null}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select"
                                        isSearchable
                                        isClearable
                                    />
                                )}
                            />
                        </FormControl>
                    </SimpleGrid>

                    <Stack direction="row" justify="flex-end" mt={8}>
                        <Button
                            isLoading={isSubmitting}
                            loadingText="Saving..."
                            type="submit"
                            colorScheme="teal"
                        >
                            {t("save")}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </>
    );
};

export default Setting;
