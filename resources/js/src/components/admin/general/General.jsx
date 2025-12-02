import React, {useEffect, useState} from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,
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
    useDisclosure
 } from '@chakra-ui/react';

 import {
    MdPercent,
    MdReceiptLong,
    MdSettings,
    MdAttachMoney,
    MdNotificationsActive,
} from "react-icons/md";

import { Link as ReactRouterLink } from "react-router-dom";
import { ADMIN_DASHBOARD_PATH, BRANCH_LIST_PATH } from "../../../routes/adminRoutes";
import { useTranslation } from "react-i18next";
import VatList from "../vat/VatList";
import VatCreate from "../modal/VatCreate";
import VatEdit from "../modal/VatEdit";
import api from "../../../axios";
import { GET_INVOICE_SETTING, GET_NOTIFICATION_SETTING, LIST_VAT } from "../../../routes/apiRoutes";
import Setting from "./Setting";
import NotificationSettings from "./NotificationSettings";
import InvoiceSetting from "./InvoiceSetting";
import { useForm, Controller } from "react-hook-form";

const General = () => {
    const { t } = useTranslation();
    const [selectedVat, setSelectedVat] = useState(null);
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [vats, setVats] = useState([]);
    const [invoiceSetting, setInvoiceSetting] = useState(null);
    const [existingSetting, setExistingSetting] = useState([]);
    const [isSubmitting, seIsSubmitting] = useState(false); 
    const { register, handleSubmit, control, watch, reset, setValue } = useForm();

    const getVats = async () => {
        try {
            const res = await api.get(LIST_VAT);
            setVats(res.data.data);
        } catch (error) {
            console.error("Failed to fetch VATs:", error);
        }
    };
    
    
    const getSettings = async () => {
        try {
            const res = await api.get(GET_NOTIFICATION_SETTING);
            setExistingSetting(res.data.data);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
    };
    
    const getInvoiceSettings = async () => {
        try {
            const res = await api.get(GET_INVOICE_SETTING);
            setInvoiceSetting(res.data.data);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
    };

    const openEditModal = (vat) => {
        setSelectedVat(vat);
        onEditOpen();
    };

    useEffect(() => {
        getVats();
        getSettings();
        getInvoiceSettings();
    }, []);

    return (
        <>
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
                                to={BRANCH_LIST_PATH}
                            >
                                {t("list")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </CardBody>
            </Card>
            <Box>
                <Card shadow="md">
                    <CardHeader>
                        <Flex mb={4} justifyContent="space-between">
                            <Heading size="md">
                                {t("system_settings")}
                            </Heading>
                        </Flex>
                    </CardHeader>

                    <CardBody>
                        <Tabs variant="enclosed" isFitted size="md" overflowX="auto">
                            <TabList
                                display="flex"
                                flexWrap={{ base: "nowrap", md: "wrap" }}
                                overflowX={{ base: "auto", md: "visible" }}
                                sx={{
                                "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
                                }}
                            >
                                <Tab whiteSpace="nowrap">
                                <Box as={MdPercent} mr={2} />
                                {t("vat")}
                                </Tab>

                                <Tab whiteSpace="nowrap">
                                <Box as={MdReceiptLong} mr={2} />
                                {t("invoice_setting")}
                                </Tab>

                                <Tab whiteSpace="nowrap">
                                <Box as={MdSettings} mr={2} />
                                {t("general")}
                                </Tab>

                                <Tab whiteSpace="nowrap">
                                <Box as={MdAttachMoney} mr={2} />
                                {t("currency")}
                                </Tab>

                                <Tab whiteSpace="nowrap">
                                <Box as={MdNotificationsActive} mr={2} />
                                {t("notification")}
                                </Tab>
                            </TabList>
                            <TabIndicator
                                mt="-1.5px"
                                height="2px"
                                bg="teal.500"
                                borderRadius="1px"
                            />
                            <TabPanels>
                                <TabPanel>
                                    <VatList vats={vats} onOpenCreate={onCreateOpen} onOpenEdit={openEditModal} onSuccess={getVats}></VatList>
                                </TabPanel>
                                <TabPanel>
                                    <InvoiceSetting invoiceSetting={invoiceSetting}></InvoiceSetting>
                                </TabPanel>
                                <TabPanel>
                                    <Setting></Setting>
                                </TabPanel>
                                <TabPanel>
                                    <p>Four!</p>
                                </TabPanel>
                                <TabPanel>
                                    <NotificationSettings existingSetting={existingSetting}></NotificationSettings>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </CardBody>
                    {/* Modal Component */}
                    <VatCreate 
                        isOpen={isCreateOpen} 
                        onClose={onCreateClose} 
                        onSuccess={getVats} 
                    />
                    {/* Edit Modal */}
                    <VatEdit 
                        isOpen={isEditOpen} 
                        onClose={onEditClose} 
                        vat={selectedVat} 
                        onSuccess={getVats} 
                    />

                </Card>
            </Box>
            
        </>
    );
};

export default General;
