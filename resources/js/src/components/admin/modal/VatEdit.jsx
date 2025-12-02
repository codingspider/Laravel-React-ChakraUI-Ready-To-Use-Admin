import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Select,
  Stack,
  useToast
} from '@chakra-ui/react';
import { t } from 'i18next';
import { useForm } from "react-hook-form"; 
import api from '../../../axios';
import { STORE_VAT, UPDATE_VAT } from '../../../routes/apiRoutes';

const VatEdit = ({ isOpen, onClose, vat, onSuccess }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [data, setData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const toast = useToast(); 

    const getBranchList = async () => {
       const res = await api.get('get/branches');
       setData(res.data.data);
    }
    useEffect(() => {
      getBranchList();
    }, [])

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await api.put(UPDATE_VAT(vat.id), data);
            reset();
            onClose();
            onSuccess();
            toast({
                position: "bottom-right",
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
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

    useEffect(() => {
      if (vat) {
        let parsedUseFor = [];

        try {
          parsedUseFor = JSON.parse(vat.use_for || "[]");
        } catch (e) {
          parsedUseFor = [];
        }

        reset({
          vat_amount: vat.vat_amount,
          item_tax_include: vat.item_tax_include === 1, // convert to true/false
          branch_id: vat.branch_id,
          use_for: parsedUseFor,   // use array here
        });
      }
    }, [vat, reset]);
    
  return (
    <>
    <Modal blockScrollOnMount={false} isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}> {/* Only one form, added submit handler */}
          <ModalHeader>{t('edit_vat')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>{t('vat_percent')}</FormLabel>
              <Input
                type='number'
                placeholder='Enter Vat/Tax Percent'
                {...register('vat_amount', { required: true })}
              />
            </FormControl>

            <FormControl mt={3}>
              <Checkbox colorScheme="teal" {...register('item_tax_include')} defaultChecked>
                {t('item_tax_include')}
              </Checkbox>
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>{t("use_in")}</FormLabel>
              <Select {...register("branch_id")}>
                {data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>{t("use_for")}</FormLabel>
              <Stack spacing={5} direction='row'>
                <Checkbox {...register('use_for')} colorScheme='teal' value="dine">
                  {t('dine')}
                </Checkbox>
                <Checkbox {...register('use_for')} colorScheme='teal' value="pickup">
                  {t('pickup')}
                </Checkbox>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type='submit' 
            isLoading={isSubmitting}
            loadingText="Saving Data..."
            colorScheme='teal'>
              {t('add')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>

    </>
  )
}

export default VatEdit