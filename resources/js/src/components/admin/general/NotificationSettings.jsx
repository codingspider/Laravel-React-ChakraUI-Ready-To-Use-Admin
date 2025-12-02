import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select as ChakraSelect,
    SimpleGrid,
    Stack,
    Switch,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import api from "../../../axios"; // your axios instance
import { CREATE_NOTIFICATION_SETTING } from "../../../routes/apiRoutes";
import { t } from "i18next";

const NotificationSettings = ({ existingSetting }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, control, watch, reset, setValue } = useForm(
        {
            defaultValues: {
                type: "email",
                provider: "smtp",
                settings: {
                    email: {},
                    sms: {},
                },
                is_active: true,
            },
        }
    );

    const watchType = watch("type");

    // Prefill form on mount or when existingSetting changes
    useEffect(() => {
        if (existingSetting) {
            reset({
                type: existingSetting.email ? "email" : "sms",
                provider: existingSetting.email ? "smtp" : "twilio",
                settings: {
                    email: existingSetting.email || {},
                    sms: existingSetting.sms || {},
                },
                is_active: existingSetting.is_active ?? true,
            });
        }
    }, [existingSetting, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        const payload = {
            type: data.type,
            provider: data.provider,
            settings:
                data.type === "email" ? data.settings.email : data.settings.sms,
            is_active: data.is_active,
        };

        try {
            const res = await api.post(CREATE_NOTIFICATION_SETTING, payload);
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
            setLoading(false);
        }
    };

    return (
        <Box mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Type Selector */}
                    <FormControl isRequired>
                        <FormLabel>{t("type")}</FormLabel>
                        <ChakraSelect {...register("type")}>
                            <option value="email">{t("email")}</option>
                            <option value="sms">{t("sms")}</option>
                        </ChakraSelect>
                    </FormControl>

                    {/* Provider Selector */}
                    <FormControl isRequired>
                        <FormLabel>{t("provider")}</FormLabel>
                        <ChakraSelect {...register("provider")}>
                            {watchType === "email" ? (
                                <option value="smtp">{t("smtp")}</option>
                            ) : (
                                <>
                                    <option value="twilio">
                                        {t("twilio")}
                                    </option>
                                    <option value="nexmo">{t("nexmo")}</option>
                                </>
                            )}
                        </ChakraSelect>
                    </FormControl>

                    {/* Email Settings */}
                    {watchType === "email" && (
                        <>
                            <FormControl isRequired>
                                <FormLabel>{t("host")}</FormLabel>
                                <Input {...register("settings.email.host")} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>{t("port")}</FormLabel>
                                <Input
                                    type="number"
                                    {...register("settings.email.port")}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>{t("username")}</FormLabel>
                                <Input
                                    {...register("settings.email.username")}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>{t("password")}</FormLabel>
                                <Input
                                    type="password"
                                    {...register("settings.email.password")}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>{t("encryption")}</FormLabel>
                                <ChakraSelect
                                    {...register("settings.email.encryption")}
                                >
                                    <option value="tls">TLS</option>
                                    <option value="ssl">SSL</option>
                                </ChakraSelect>
                            </FormControl>

                            <FormControl>
                                <FormLabel>{t("from_email")}</FormLabel>
                                <Input
                                    {...register("settings.email.from_email")}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>{t("from_name")}</FormLabel>
                                <Input
                                    {...register("settings.email.from_name")}
                                />
                            </FormControl>
                        </>
                    )}

                    {/* SMS Settings */}
                    {watchType === "sms" && (
                        <>
                            <FormControl isRequired>
                                <FormLabel>SID / Key</FormLabel>
                                <Input {...register("settings.sms.sid")} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Token / Secret</FormLabel>
                                <Input {...register("settings.sms.token")} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>From Number</FormLabel>
                                <Input {...register("settings.sms.from")} />
                            </FormControl>
                        </>
                    )}

                    {/* Active Switch */}
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="is_active" mb="0">
                            Active
                        </FormLabel>
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    id="is_active"
                                    isChecked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormControl>
                </SimpleGrid>

                <Stack direction="row" justify="flex-end" mt={8}>
                    <Button
                        isLoading={loading}
                        type="submit"
                        loadingText="Saving Data..."
                        colorScheme="teal"
                    >
                        {t("save")}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default NotificationSettings;
