import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Flex,
  IconButton,
  Tag,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import VariationModal from "./VariationModal";
import AddonModal from "./AddonModal";
import { useEffect, useState } from "react";
import api from "../../../axios";
import { GET_BRANCH_ADDONS, GET_BRANCH_VARIATIONS, STORE_ITEM } from "../../../routes/apiRoutes";
import { useCurrencyFormatter } from "../../../useCurrencyFormatter";
import { useBranches } from "../../../hooks/useBranches";
import { useVariations } from "../../../hooks/useVariations";

export default function ItemCreate() {
  const { t } = useTranslation();
  const [addonData, setAddonData] = useState([]); 
  const [variationData, setVariationData] = useState([]); 
  const { formatAmount, currency } = useCurrencyFormatter(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      sequence_index: "",
      sku: "",
      subtitle: "",
      description: "",
      main_image: null,
      additional_images: null,

      variations: [],
      addons: []
    }
  });

  // Field arrays
  const { fields: variationFields, append: variationAppend, remove: variationRemove } = useFieldArray({ control, name: "variations" });
  const { fields: addonFields, append: addonAppend, remove: addonRemove } = useFieldArray({ control, name: "addons" });

  // Modal controls
  const variationModal = useDisclosure();
  const addonModal = useDisclosure();
  const [isLoading, setIsLoading] = useState(true); 
  const toast = useToast(); 
  const { branches } = useBranches();

  const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name ?? "");
            formData.append("order_number", data.order_number ?? "");
            if (data.image?.length) {
                formData.append("image", data.image[0]);
            }

            const res = await api.post(STORE_ITEM, formData);
            reset();

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

  const fetchAddons = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(GET_BRANCH_ADDONS);
            setAddonData(res.data.data);
        } catch (err) {
            console.error("fetchAddons error:", err);
        } finally {
            setIsLoading(false);
        }
  };

  const fetchVariations = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(GET_BRANCH_VARIATIONS);
            setVariationData(res.data.data);
        } catch (err) {
            console.error("fetchAddons error:", err);
        } finally {
            setIsLoading(false);
        }
  };

  useEffect(() => {
      const app_name = localStorage.getItem('app_name');
      document.title = `${app_name} | Item Create`;
  }, []); 

  useEffect(() => {
      fetchAddons();
      fetchVariations();
  }, []); 

  return (
    <Box mx="auto">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* MAIN DETAILS */}
      <Card mb={6}>
        <CardHeader fontWeight="bold">{t("main_details")}</CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            
            <FormControl isRequired>
              <FormLabel>{t("branch")}</FormLabel>
              <Select {...register("branch")} placeholder={t("select_branch")}>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("title")}</FormLabel>
              <Input {...register("title")} placeholder={t("enter_title")} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("category")}</FormLabel>
              <Select {...register("category")} placeholder={t("select_category")}>
                <option value="pizza">{t("pizza")}</option>
                <option value="burger">{t("burger")}</option>
              </Select>
            </FormControl>


            <FormControl isRequired>
              <FormLabel>{t("sequence_index")}</FormLabel>
              <Input {...register("sequence_index")} placeholder="01" />
            </FormControl>

            <FormControl>
              <FormLabel>{t("sku")}</FormLabel>
              <Input {...register("sku")} placeholder={t("enter_sku")} />
            </FormControl>

            <FormControl>
              <FormLabel>{t("subtitle")}</FormLabel>
              <Input {...register("subtitle")} placeholder={t("enter_subtitle")} />
            </FormControl>

            <FormControl>
              <FormLabel>{t("description")}</FormLabel>
              <Textarea {...register("description")} placeholder={t("enter_description")} />
            </FormControl>

          </SimpleGrid>

          {/* Availability */}
          <Box mt={4}>
            <FormLabel>{t("item_available_for")}</FormLabel>
            <Flex gap={4}>
              <Checkbox defaultChecked>{t("dine_in")}</Checkbox>
              <Checkbox defaultChecked>{t("pickup")}</Checkbox>
              <Checkbox defaultChecked>{t("delivery")}</Checkbox>
            </Flex>

            <Box mt={4}>
              <Checkbox defaultChecked>{t("online_orders")}</Checkbox>
              <Checkbox ml={5} defaultChecked>{t("pos_orders")}</Checkbox>
            </Box>

            <Box mt={4}>
              <Checkbox>{t("featured_item")}</Checkbox>
            </Box>

          </Box>
        </CardBody>
      </Card>

      {/* IMAGES */}
      <Card mb={6}>
        <CardHeader fontWeight="bold">{t("images")}</CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl>
              <FormLabel>{t("main_image")}</FormLabel>
              <Input type="file" {...register("main_image")} />
            </FormControl>

            <FormControl>
              <FormLabel>{t("additional_images")}</FormLabel>
              <Input type="file" multiple {...register("additional_images")} />
            </FormControl>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* VARIATIONS */}
      <Card mb={6}>
        <CardHeader fontWeight="bold">{t("variations")}</CardHeader>
        <CardBody>
          
          <Flex gap={4} flexWrap="wrap">
            {variationFields.map((v, index) => {
              // Get parent variation from variationData
              const parentVariation = variationData.find(
                (variation) => variation.id === v.variation_id
              );

              return (
                <Box key={v.id} minW="200px" flex="1" maxW="300px">
                  <Flex
                    p={3}
                    border="1px solid #eee"
                    rounded="md"
                    direction="column"
                    gap={2}
                  >
                    {/* Parent variation name with delete button */}
                    <Flex justify="space-between" align="center">
                      <Box fontWeight="bold">{parentVariation?.name}</Box>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => variationRemove(index)}
                      />
                    </Flex>

                    {/* List all items of this variation from variationData */}
                    {parentVariation?.variation_items?.map((item) => (
                      <Flex key={item.id} justify="space-between">
                        <Box>{item.name}</Box>
                        <Tag>{formatAmount(item.price)}</Tag>
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              );
            })}
          </Flex>


          <Button mt={4} leftIcon={<AddIcon />} colorScheme="teal" onClick={variationModal.onOpen}>
            {t("add_variation")}
          </Button>

        </CardBody>
      </Card>

      {/* ADDONS */}
      <Card mb={6}>
        <CardHeader fontWeight="bold">{t("addons")}</CardHeader>
        <CardBody>

          <Flex gap={4} flexWrap="wrap">
            {addonFields.map((a, index) => {
              // Get parent addon from addonData
              const parentAddon = addonData.find(
                (addon) => addon.id === a.addon_id
              );

              return (
                <Box key={a.id} minW="200px" flex="1" maxW="300px">
                  <Flex
                    p={3}
                    border="1px solid #eee"
                    rounded="md"
                    direction="column"
                    gap={2}
                  >
                    {/* Parent addon name with delete button */}
                    <Flex justify="space-between" align="center">
                      <Box fontWeight="bold">{parentAddon?.name}</Box>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => addonRemove(index)}
                      />
                    </Flex>

                    {/* Addon price */}
                    <Tag>{formatAmount(parentAddon?.price)}</Tag>
                  </Flex>
                </Box>
              );
            })}
          </Flex>



          <Button mt={4} leftIcon={<AddIcon />} colorScheme="teal" onClick={addonModal.onOpen}>
            {t("add_addon")}
          </Button>

        </CardBody>
      </Card>

      <VariationModal
        variationData={variationData}
        variationModal={variationModal}
        onSubmit={(data) => variationAppend(data)}
      />

      <AddonModal
        addonData={addonData}
        addonModal={addonModal}
        onSubmit={(data) => addonAppend(data)}
      />
      {/* ACTION BUTTONS */}
      <Flex justify="flex-end" gap={3}>
        <Button variant="outline">{t("create_go_back")}</Button>
        <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Saving Data..."
            colorScheme="teal"
            size="md"
        >
            {t("create_item")}
        </Button>
      </Flex>
      </form>
    </Box>
  );
}
