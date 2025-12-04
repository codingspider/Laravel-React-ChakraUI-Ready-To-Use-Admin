import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    Box,
    Checkbox,
    Flex
} from "@chakra-ui/react";
import { t } from "i18next";
import { useForm } from "react-hook-form";

export default function VariationModal({
    variationModal,
    onSubmit,
    variationData,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            variation_id: "",
        },
    });

    const submitVariation = (data) => {
        const selected = variationData.find((v) => v.id == data.variation_id);

        onSubmit({
            variation_id: selected.id,
            variation_name: selected.name
        });

        reset();
        variationModal.onClose();
    };

    return (
        <Modal
            isOpen={variationModal.isOpen}
            onClose={variationModal.onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("add_variation")}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>{t("variations")}</FormLabel>
                        <Select
                            {...register("variation_id")}
                            placeholder="Select"
                        >
                            {variationData.map((variation) => (
                                <option key={variation.id} value={variation.id}>
                                    {variation.name}
                                </option>
                            ))}
                        </Select>

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={variationModal.onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={handleSubmit(submitVariation)}
                    >
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
