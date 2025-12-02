import React, {useEffect, useState} from "react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text, Button, ButtonGroup, Box, HStack, useDisclosure, useToast } from '@chakra-ui/react';
import { t } from "i18next";
import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import api from './../../../axios';
import { DELETE_VAT, LIST_VAT } from './../../../routes/apiRoutes';
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";

const VatList = ({ onOpenCreate, onOpenEdit, vats, onSuccess }) => {
    const toast = useToast(); 

    const deleteLocation = async (id) => {
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
                await api.delete(DELETE_VAT(id));
                onSuccess();
                toast({
                    position: "bottom-right",
                    title: "Data deleted successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

            } catch (error) {
                toast({
                    position: "bottom-right",
                    title: "Error deleting data",
                    description: error.response?.data?.message || "Something went wrong.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                mt={5}
            >
            {vats.length > 0 ? (
            vats.map((item, index) => {
                // Parse use_for safely
                let useFor = [];
                try {
                useFor = JSON.parse(item.use_for || "[]");
                } catch (e) {}

                const formattedUseFor = useFor.map(v => v.charAt(0).toUpperCase() + v.slice(1));

                return (
                <Card key={index} mb={4}>
                    <CardHeader>
                    <Heading size="md">
                        {item.vat_amount}% {t('vat')}
                    </Heading>
                    </CardHeader>

                    <CardBody>
                    {/* Use For */}
                    <HStack spacing={2}>
                        <CheckCircleIcon color="teal.500" />
                        <Text>{formattedUseFor.join(", ")}</Text>
                    </HStack>

                    {/* Tax Included */}
                    <HStack spacing={2} mt={2}>
                        {item.item_tax_include === 1 ? (
                        <>
                            <CheckCircleIcon color="teal.500" />
                            <Text>Tax Included</Text>
                        </>
                        ) : (
                        <>
                            <FcCancel />
                            <Text>Tax Not Included</Text>
                        </>
                        )}
                    </HStack>

                    {/* Branch */}
                    <HStack spacing={2} mt={2}>
                        <CheckCircleIcon color="teal.500" />
                        <Text>{item.branch?.name || "-"}</Text>
                    </HStack>
                    </CardBody>

                    <CardFooter>
                    <ButtonGroup gap="2">
                        <Button 
                        onClick={() => onOpenEdit(item)}
                        colorScheme="teal">
                        <EditIcon />
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteLocation(item.id)}>
                        <DeleteIcon />
                        </Button>
                    </ButtonGroup>
                    </CardFooter>
                </Card>
                );
            })
            ) : (
            <Text>{t('no_data')}</Text>
            )}


            </SimpleGrid>
            <Button mt={3} colorScheme='teal'variant="outline" size='sm' onClick={onOpenCreate}>{t('add_vat')}</Button>  
        </>
    );
};

export default VatList;
