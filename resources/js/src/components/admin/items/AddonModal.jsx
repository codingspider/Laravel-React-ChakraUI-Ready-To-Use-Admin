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
  Select
} from "@chakra-ui/react";
import { t } from "i18next";
import { useForm } from "react-hook-form";

export default function AddonModal({ addonModal, onSubmit, addonData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addon_id: "",
    },
  });

  const submitAddon = (data) => {
    const selectedAddon = addonData.find(a => a.id === parseInt(data.addon_id));
    if (!selectedAddon) return;

    // Send full addon data to parent
    onSubmit({
      addon_id: selectedAddon.id
    });

    reset();
    addonModal.onClose();
  };

  return (
    <Modal isOpen={addonModal.isOpen} onClose={addonModal.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('add_add_on')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl isRequired mb={3}>
            <FormLabel>{t('addons')}</FormLabel>
            <Select
                {...register("addon_id")}
                placeholder="Select"
            >
                {addonData.map((addon) => (
                    <option key={addon.id} value={addon.id}>
                        {addon.name}
                    </option>
                ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={addonModal.onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit(submitAddon)}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
